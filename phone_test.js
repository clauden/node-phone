Serial = require('./serial');

function work() {

	// echo whatever is typed to serial port
	var readline = require('readline');
	var r = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: false
	});

	r.on('line', function(l) {
		console.log("got: " + l);
		i.write(l + "\r");
	});
		
}


i = new Serial(function openCallback() {
	i.write("AT\r");
	work();
});

