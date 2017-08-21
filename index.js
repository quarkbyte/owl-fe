var net = require('net');
var modbus = require("modbus-tcp");
var client = new modbus.Client();

var server = net.createServer();
server.on('connection', function(socket) {
    client.writer().pipe(socket);
    client.readHoldingRegisters(1, 0, 9, function (err, coils) {
        // coils = [ 1, 0, 1, 1 ] 
        console.log(coils)
    });
})

server.listen(20087);


var crc16 = require('modbus-crc16');
var buf = new Buffer([0x01,0x03,0x00,0x00,0x00,0x0a]);
var crc = crc16(buf); 
console.log('crc:', crc.toString(16));