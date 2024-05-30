const { exec } = require('child_process');

exec('npm audit --json', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    process.exit(1);
  }

  const auditData = JSON.parse(stdout);
  const highVulnerabilities = auditData.metadata.vulnerabilities.high;
  const criticalVulnerabilities = auditData.metadata.vulnerabilities.critical;

  if (highVulnerabilities > 0 || criticalVulnerabilities > 0) {
    console.error('High or Critical vulnerabilities found!');
    process.exit(1);
  } else {
    console.log('No high or critical vulnerabilities found.');
  }
});
