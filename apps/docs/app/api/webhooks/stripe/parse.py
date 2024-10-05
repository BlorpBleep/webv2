import os
import re
from pathlib import Path
from datetime import datetime

# Base directory for your project
BASE_DIR = Path("/Users/davidawatere/Documents/GitHub/webv2/apps/docs/app/api/webhooks/stripe")
OUTPUT_FILE = BASE_DIR / f"{datetime.now().strftime('%Y-%m-%d:%H-%M')}.md"

# Regex pattern to detect TypeScript import statements
IMPORT_PATTERN = re.compile(r"import .* from ['\"](@/utils/.*?|@/types/.*?|\.\/.*?|\.\.\/.*?)(\.ts)?['\"];")

# Set to track visited files and avoid duplication
visited_files = set()

def resolve_import_path(import_path, current_file_path):
    """
    Resolve the full path of the imported module relative to the current file.
    """
    print(f"Resolving import path: {import_path} from current file: {current_file_path}")
    if import_path.startswith('@/'):
        # Replace '@/utils' or '@/types' with the actual base directory path
        resolved_path = BASE_DIR.parent.parent / import_path[2:]
        print(f"Resolved path for @/: {resolved_path}")
        return resolved_path
    else:
        # Handle relative imports like ./ or ../
        resolved_path = (current_file_path.parent / import_path).resolve()
        print(f"Resolved path for relative import: {resolved_path}")
        return resolved_path

def collect_dependencies(file_path):
    """
    Recursively collect all dependencies from a TypeScript file.
    """
    print(f"Collecting dependencies for file: {file_path}")
    if file_path in visited_files or not file_path.exists():
        print(f"Skipping file: {file_path} (already visited or does not exist)")
        return

    visited_files.add(file_path)

    with open(file_path, 'r') as file:
        content = file.read()
        
        # Write the content to the output file
        with open(OUTPUT_FILE, 'a') as output:
            output.write(f"\n\n// File: {file_path.relative_to(BASE_DIR.parent.parent)}\n\n")
            output.write(content)
            print(f"Written content of {file_path} to output file.")

        # Find all import statements in the file
        imports = IMPORT_PATTERN.findall(content)
        print(f"Found imports in {file_path}: {imports}")
        for import_path, _ in imports:
            dependency_path = resolve_import_path(import_path, file_path)
            dependency_file = dependency_path.with_suffix('.ts')
            print(f"Collecting dependency: {dependency_file}")
            collect_dependencies(dependency_file)

def main():
    # Clear the output file if it already exists
    if OUTPUT_FILE.exists():
        OUTPUT_FILE.unlink()
        print(f"Cleared existing output file: {OUTPUT_FILE}")

    # Start with all .ts files in the handlers and utils directories
    handlers_dir = BASE_DIR / 'handlers'
    utils_dir = BASE_DIR / 'utils'

    for directory in [handlers_dir, utils_dir]:
        print(f"Scanning directory: {directory}")
        for ts_file in directory.glob('*.ts'):
            print(f"Processing TypeScript file: {ts_file}")
            collect_dependencies(ts_file)

if __name__ == "__main__":
    main()