var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/cu.usbserial-A703X390", {
			baudrate: 19200,
			parser: 	require("serialport").parsers.readline("\n") 
		}, 
		true		// false		// do not openImmediately
);

serialPort.on('open', function () {
	console.log('OPENED');
	serialPort.on('data', function(data) {
		console.log('RECEIVED ' + data.length + '> ' + data);
	});
	theCB();
});


function Serial(cb) {
	theCB = cb;

	console.log('Serial constructor');

  if (typeof(serialPort) == 'undefined')
		console.log("sp is undefined");
	else
		console.log("sp is " + serialPort);

}

// unneeded?
Serial.prototype.openit = function() {
	console.log('Opening...');
	var sp = serialPort;
	console.log("this: " + sp);

	sp.open(function (error) {
		console.log("in open, error: " + error);
		if (error) {
			console.log("failed to open: " + error);
		} else {
			console.log("opened");
			sp.on('data', function(data) {
				console.log('RECEIVED ' + data.length + '> ' + data);
			});
		}
	});
	console.log("returned from open");	
}

// unneeded?
Serial.prototype.waitOpen = function () {
	var intvl; 

	var checkOpen = function() {
		console.log("checking open...");
		if (serialPort.isOpen())
			clearInterval(intvl);
		else {
			console.log("waiting");
		}
	}

	intvl = setInterval(checkOpen, 500);
	console.log("waitOpen returning");
}


Serial.prototype.write = function (s) {
	var sp = serialPort;
	if (! serialPort.isOpen())
		throw new Error("Not Open");

  if (typeof(sp) == 'undefined') {
		console.log("sp is undefined 2");
		throw new Error();
	}

	sp.write(s, function () {
		sp.drain();
	});
}

module.exports = Serial;

