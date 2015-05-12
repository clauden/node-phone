SIM900 = require('./sim900');

device = new SIM900(function() { });
cmd = device.compose("do_dial", "zot 123 foo");
console.log(cmd);
