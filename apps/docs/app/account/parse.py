import re
import os
import logging
from datetime import datetime

# Set up logging configuration
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# Define the path to the page.tsx file
PAGE_FILE_PATH = "/Users/davidawatere/Documents/GitHub/webv2/apps/docs/app/account/page.tsx"

# Define the correct base path for components
COMPONENTS_BASE_PATH = "/Users/davidawatere/Documents/GitHub/webv2/apps/docs/components"

# Generate output Markdown file name with the current date and time
output_file_name = datetime.now().strftime("%Y-%m-%d:%H-%M") + ".md"
OUTPUT_MD_FILE = os.path.join(os.path.dirname(__file__), output_file_name)

def parse_imports(file_path):
    # Create a set to store unique component imports
    component_imports = set()
    
    # Define the regex pattern to find import statements
    pattern = r"import\s+(?:{.*?}\s*,\s*)?(.*?)\s+from\s+['\"](.*?)['\"];?"
    
    logging.info(f"Reading file: {file_path}")

    # Read the page.tsx file
    try:
        with open(file_path, 'r') as file:
            content = file.read()
            
            # Find all import statements in the file
            matches = re.findall(pattern, content)
            logging.info(f"Found {len(matches)} import statements in the file.")

            # Filter for imports from the components folder
            for import_part, import_path in matches:
                if import_path:
                    logging.debug(f"Import statement found: {import_part} from {import_path}")
                    if import_path.startswith('@/components'):
                        # Convert to full path
                        relative_path = import_path.replace('@/components', '').lstrip('/')
                        full_path = os.path.join(COMPONENTS_BASE_PATH, relative_path + ".tsx")
                        component_imports.add(full_path)
                        logging.info(f"Added component import: {full_path}")

    except FileNotFoundError:
        logging.error(f"File not found: {file_path}")
        return component_imports
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return component_imports

    return component_imports

def concatenate_files(file_paths):
    content = []
    
    for file_path in file_paths:
        if os.path.exists(file_path):
            content.append(f"# {os.path.basename(file_path)}\n")
            with open(file_path, 'r') as file:
                content.append(file.read() + "\n\n")
        else:
            logging.warning(f"File not found for concatenation: {file_path}")

    return content

# Parse imports from page.tsx
imports = parse_imports(PAGE_FILE_PATH)

# Concatenate the contents of the identified component files
if imports:
    logging.info("Concatenating component files...")
    concatenated_content = concatenate_files(imports)
    
    # Add a summary at the top
    total_files = len(imports)
    summary = f"# Summary\n\nTotal component files: {total_files}\n\n"
    
    # Write the output to the Markdown file
    with open(OUTPUT_MD_FILE, 'w') as output_file:
        output_file.write(summary)
        output_file.write("".join(concatenated_content))
    
    logging.info(f"Output written to {OUTPUT_MD_FILE}")
else:
    logging.info("No component imports found. No output file created.")
