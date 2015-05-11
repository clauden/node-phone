var util = require('util');
var serialport = require("serialport");

var SerialPort = serialport.SerialPort;

var serialPort = new SerialPort("/dev/cu.usbserial-A703X390", {
  baudrate: 19200,
	parser: 	serialport.parsers.readline("\n")
	
});

serialPort.on("open", function () {
  console.log('OPENED');

  serialPort.on('data', function(data) {
    console.log('RECEIVED ' + data.length + '> ' + data);
  });

	// chain_to_work();
});

exports.write = function (s) {
	serialPort.write(s, function () {
		serialPort.drain()
	});
}

function chain_to_work() {
	//write_wait("AT\r");
	this.write("AT+CSQ\r");
}

function _chain_to_work() {
	serialPort.write("AT\r", function () {
		serialPort.drain()
	});
}

