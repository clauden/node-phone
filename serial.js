var util = require('util');

var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/cu.usbserial-A703X390", {
  baudrate: 19200,
	parser: 	serialport.parsers.readline("\n")
	
});

serialPort.on("open", function () {
  console.log('OPENED');

  serialPort.on('data', function(data) {
    console.log('RECEIVED> ' + data);
		console.log("got " + data.length);
  });

	chain_to_work();
});

function write_wait(s) {
	serialPort.write(s, function () {
		serialPort.drain()
	});
}

function chain_to_work() {
	//write_wait("AT\r");
	write_wait("AT+CSQ\r");
}

function _chain_to_work() {
	serialPort.write("AT\r", function () {
		serialPort.drain()
	});
}

