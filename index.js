const Resource = require('./resource');

Resource.Server.listen((arg) => {
  console.log(`server open`);
  console.log(`  protocol: ${arg.protocol}`);
  console.log(`  host: ${arg.host}`)
  console.log(`  port: ${arg.port}`);
});