# Remote-Server
This is the backend part of https://github.com/GabrieleGigante/Remote-Client

## Required Packages
socket.io
express
robotjs

## Main socket.io events
'cursor'(deltax, deltay): The onPanUpdate argument in the GestureDetector widget can be assigned to a callback with the drag details as an argument, I pass teh drag details to the server with this event and call on the robot from teh robojs package to move my cursor accordingly. 

'click': just calls on the robot to perform a left click event when emitted.

'volume'(argument): the argument can either be '+' or '-'. Once emitted it turns the volume up or down by a factor of 2.
