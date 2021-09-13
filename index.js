express = require('express')
app = express();
socket = require('socket.io');
var robot = require("robotjs");

server = app.listen(7000, () => {
  console.log('listening on *:7000');
});

app.use(express.static("public"));

//Socket
io = socket(server)
const velocity= 1.3;
 
io.on('connection', (socket) => {
    console.log(socket.id+ ' connected');

    socket.on('cursor', async (rx, ry) => {
        console.log(rx, ry);
        var mouse = robot.getMousePos();
        robot.dragMouse(mouse.x+(rx*velocity), mouse.y+(ry*velocity))
    })

    socket.on('click', async () => {
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