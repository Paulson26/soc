'use strict'

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinNotifications', (params, cb) => {
      socket.join(params.sender)
      cb()
    })

    socket.on('sendNotifications', (request) => {
      io.to(request.reciver).emit('recieveNotifications', request)
    })
  })
    console.log('user connected');
    socket.on('new-message', function (data) {
      socket.join(data.userid)        
    });
  socket.on('new-message', function (data) {
    io.to(data.reciver).emit('new-msg', {message: data.message, sender: data.sender, reciver: data.reciver});
    console.log("sender",data.sender);
    
  });

  socket.on('new-message', (data) => {
      console.log(data);
     socket.broadcast.emit('new-msg', {message: data.message,reciver: data.reciver,sender:data.sender});
     });
  socket.on("connect_error", (err) => {  console.log(`connect_error due to ${err.message}`);});
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
}