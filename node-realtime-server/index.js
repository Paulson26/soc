let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);
// let socketIO = require('socket.io');
// var io = require('socket.io')(http);
const cors = require('cors');
const whitelist = ['http://localhost:4200'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}
const ios = require('socket.io');
const io = new ios.Server({
    allowEIO3: true,
    cors: {
        origin: true,
        credentials: true
    },
})
io.listen(3000, () => {
    console.log('[socket.io] listening on port 3000')
})
app.use(cors(corsOptions));


    io.on('connection', function (socket) {
      console.log('user connected');
      socket.on('new-message', function (data) {
        socket.join(data.userid)        
      });
    // socket.on('new-message', function (data) {
    //   io.to(data.reciver).emit('new-msg', {message: data.message, sender: data.sender, reciver: data.reciver});
    //   console.log("sender",data.sender);
      
    // });

    socket.on('new-message', (data) => {
       socket.broadcast.emit('new-msg', {message: data.message,reciver: data.reciver,sender:data.sender});
       });
       socket.on('send-notification', (data) => {
       socket.broadcast.emit('new-notification',{message: data.message,reciver: data.reciver,sender:data.sender});
       console.log(data)
       });
    socket.on("connect_error", (err) => {  console.log(`connect_error due to ${err.message}`);});
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});