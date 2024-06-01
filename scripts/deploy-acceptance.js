const { spawnSync } = require('child_process');
const fs = require('fs');

const deployOutput = spawnSync('sst', ['deploy', '--stage', 'acceptance'], { encoding: 'utf-8' });

const apiUrlRegex = /BigTransitApi:\s+(.*)/;
const match = deployOutput.stdout.match(apiUrlRegex);
const apiUrl = match ? match[1] : null;

if (!apiUrl) {
  console.error('Failed to extract API URL from deployment output.');
  process.exit(1);
}

if (process.env.GITHUB_ACTIONS) {
  console.log(`echo "ACCEPTANCE_API_URL=${apiUrl}" >> "$GITHUB_ENV"`);
  console.log(`API URL for acceptance environment set to ${apiUrl} in GitHub Actions environment`);
} else {
  fs.writeFileSync('.env', `ACCEPTANCE_API_URL=${apiUrl}`);
  console.log(`API URL for acceptance environment set to ${apiUrl}`);
}
