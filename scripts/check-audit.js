const { exec } = require('child_process');

exec('npm audit --json', (error, stdout, stderr) => {
  // npm audit exits with code 1 when vulnerabilities are found
  // We need to check the actual output, not just the exit code
  if (error && !stdout) {
    // Only fail if there's an actual error (no stdout)
    console.error(`exec error: ${error}`);
    process.exit(1);
  }

  let auditData;
  try {
    auditData = JSON.parse(stdout);
  } catch (parseError) {
    console.error('Failed to parse npm audit output:', parseError);
    process.exit(1);
  }

  const highVulnerabilities = auditData.metadata.vulnerabilities.high || 0;
  const criticalVulnerabilities = auditData.metadata.vulnerabilities.critical || 0;
  const moderateVulnerabilities = auditData.metadata.vulnerabilities.moderate || 0;
  const totalVulnerabilities = auditData.metadata.vulnerabilities.total || 0;

  console.log(`Audit summary: ${totalVulnerabilities} total vulnerabilities (Critical: ${criticalVulnerabilities}, High: ${highVulnerabilities}, Moderate: ${moderateVulnerabilities})`);

  if (highVulnerabilities > 0 || criticalVulnerabilities > 0) {
    console.error('High or Critical vulnerabilities found!');
    process.exit(1);
  } else {
    console.log('No high or critical vulnerabilities found. Build can proceed.');
  }
});
