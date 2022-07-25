const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt} = require('express-jwt')
const socket = require('socket.io')
const createUserRoutes = require('./routes/createUserRoutes')
const userRoutes = require('./routes/userRoutes')
const messagesRoute = require('./routes/messagesRoute')
const createServerRoute = require('./routes/createServerRoute')
const {userJoin} = require('./utils/users');
app.use((cors()))
app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('DB Connection Succesfull')
    })
    .catch((err) => {
        console.log(err.message)
    })

app.use('/auth', createUserRoutes)
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/api', userRoutes)
app.use('/api', createServerRoute)
app.use('/api', messagesRoute)
const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`)
})

const io = socket(server, {
    cors: {
        origin:'http://localhost:3000',
        credentials: true,
    },
})

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("joinRoom", ({username, room}) => {
    
    const user = userJoin(socket.id, username, room)
    socket.join(user.room)
   
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        'has joined the chat'
      )


  });

  socket.on('send-server-msg', ({from,to, msg,username}) => {
    
    const message = [username, msg]
    socket.broadcast.to(to).emit('msg-recieve-server', message)
  })

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});