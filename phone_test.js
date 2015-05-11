x = require('./serial');

function work() {
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


i = new x(function () {
	i.write("AT\r");
	work();
});

