//path se encarga de trabajar con las rutas
const path = require('path');
const express = require('express');
const app = express();

//settings 
app.set('port', process.env.PORT || 30000);

// static files
// Llamamos de express la paqueteria static que nos va ayudar a enviar ensajer estaticos 
app.use(express.static(path.join(__dirname, 'public'))) ;


//start server 
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

//Socket requiere un servidor para que empiece a realizar el envio
//app es el encargado de tener todo el modulo del servidor
const socketIO = require('socket.io');
const io = socketIO(server);

//Websockets
io.on('connection', (socket) => {
    console.log('Nueva conexion', socket.id);

//Vamos a escuchar el evento
    socket.on('chat:message',(data) => {
    io.sockets.emit('chat:message', data);
});

//Broadcast se utiliza para que todos los usuarios puedan ver que estoy escribiendo, excepto yo
    socket.on('chata:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    })
});


//Muestra donde esta almacenado mi proyecto
//console.log(path.join(__dirname + 'public'));

//La carpeta public sera la encargada, en este caso, de tener todos los archivos de la parte de front 
