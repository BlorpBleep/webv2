const { exec } = require('child_process');
require('dotenv').config({ path: '../.env' });  // Adjust the path to your .env file

const supabaseProjectId = 'oklyglwabkhjmbmxsdga';  // Replace with your actual project ID
const schemas = 'public';  // You can modify this to include additional schemas if needed

const command = `supabase gen types typescript --project-id ${supabaseProjectId} --schema ${schemas}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});
