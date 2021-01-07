express = require('express')
app = express();
socket = require('socket.io');
var robot = require("robotjs");
var jf = require('jsonfile'); //jsonfile module
var fs = require('fs');
const { debug } = require('console');
const { json } = require('express');

server = app.listen(7000, () => {
  console.log('listening on *:7000');
});

app.use(express.static("public"));

//Socket
io = socket(server)
let clicked = 0;
 
io.on('connection', (socket) => {
    console.log(socket.id+ ' connected');

    socket.on('cursor', (rx, ry) => {
        console.log(rx, ry);
        var mouse = robot.getMousePos();
        robot.dragMouse(mouse.x+(rx*1.3), mouse.y+(ry*1.3))
        //console.log(mouse)
    })

    socket.on('click', () => {
        console.log("click");
        robot.mouseClick();
    })

    socket.on('volume', (arg) => {
        if (arg == '+') {
            console.log('volume +')
            robot.keyTap("audio_vol_up");
        }
        if (arg == '-') {
            console.log('volume -')
            robot.keyTap("audio_vol_down")
        }
    })

    socket.on('disconnect', () => {
        console.log(socket.id+" disconnected ")
    })
});