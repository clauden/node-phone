// parsing helpers for specific commands
var helpers = require('helpers')

// map operations to AT codes
var code_map = {

	get_battery: {cmd: 'AT+CBC', rx: /\+CBC: \d+,\d+,\d+/, descr: "is_powered, percent, volts"},

	get_rssi: {cmd: 'AT+CSQ', rx: /\+CSQ: \d+,\d/, descr: "dB code, ?", processor: helpers.parse_rssicode},
	
	do_dial: {cmd: 'ATD', param: /(\d+)/, rx: /OK/, descr: "param: number to be dialed (+CC or plain)"},

	do_hangup: {cmd: 'ATH0', rx: /OK/},
	
	do_pickup: {cmd: 'ATA', rx: /OK/}

}

function SIM900(cb) {
	theCB = cb;
}

SIM900.prototype.compose = function(cmdName, params) {
	console.log("operation(" + cmdName + ")");	
	if (!(cmdName in code_map))
		throw new Error("No operation \'" + cmdName + "\' known");

	info = code_map[cmdName];
	cmd = info.cmd;
	if (info.param) {
		m = params.match(info.param)
		console.log("matched " + m);
		cmd += m;
	}
	return cmd;
}

/**
function do_operation(opname, params) {
	console.log("do_operation(" + opname + ")");	
	if (!(opname in code_map))
		throw new Error("No operation \'" + opname + "\' known");
	
	console.log("do_operation sending: " + code_map[opname].cmd);
	serial.write(code_map[opname].cmd);
}
**/

module.exports = SIM900;
