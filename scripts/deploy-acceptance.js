const { spawnSync } = require('child_process');
const fs = require('fs');

// Run the sst deploy command and capture its output
const deployOutput = spawnSync('sst', ['deploy', '--stage', 'acceptance'], { encoding: 'utf-8' });

// Extract the API URL from the command output
const apiUrlRegex = /BigTransitApi:\s+(.*)/;
const match = deployOutput.stdout.match(apiUrlRegex);
const apiUrl = match ? match[1] : null;

if (!apiUrl) {
  console.error('Failed to extract API URL from deployment output.');
  process.exit(1);
}

if (process.env.GITHUB_ACTIONS) {
  // Set the extracted API URL as an output for GitHub Actions
  console.log(`::set-output name=acceptance-api-url::${apiUrl}`);
} else {
  // Set the extracted API URL as an environment variable for local development
  fs.writeFileSync('.env', `ACCEPTANCE_API_URL=${apiUrl}`);
  console.log(`API URL for acceptance environment set to ${apiUrl}`);
}
