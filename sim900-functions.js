var serial = require('./serial')
var helpers = require('helpers')

// map operations to AT codes
code_map = {

	get_battery: {cmd: 'AT+CBC', rx: /\+CBC: \d+,\d+,\d+/, descr: "is_powered, percent, volts"},

	get_rssi: {cmd: 'AT+CSQ', rx: /\+CSQ: \d+,\d/, descr: "dB code, ?", processor: helpers.parse_rssicode},
	
	do_dial: {cmd: 'ATD', param: /\+*\d+/, rx: /OK/, descr: "param: number to be dialed (+CC or plain)"},

	do_hangup: {cmd: 'ATH0', rx: /OK/},
	
	do_pickup: {cmd: 'ATA', rx: /OK/}

}


function do_operation(opname, params) {
	console.log("do_operation(" + opname + ")");	
	if (!(opname in code_map))
		throw new Error("No operation \'" + opname + "\' known");

	console.log(code_map[opname].cmd);
	serial.write(code_map[opname].cmd);
}

//
// main begins
//
do_operation('get_rssi');
do_operation('foo');
