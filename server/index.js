import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserModel from './models/User.js';
import MessageModel from './models/Message.js';

import { Server } from 'socket.io';
import http from 'http';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let userCount = 0;
const room = "global";
io.on("connection", (socket) => {
  userCount++;
  io.emit("users", userCount);
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    userCount--;
    io.emit("users", userCount);
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.join(room);

  socket.on("send_message", (msg) => {
    socket.to(room).emit("receive_message", msg);
  });

  socket.on("delete_message", (_id) => {
    socket.to(room).emit("deleting_message", _id);
  })
});

const port = 4000;
server.listen(port, () => {
  console.log(`Server is online on port ${port}!`);
});

const conString = "mongodb+srv://admin:admin@cluster.ajjsw6z.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster";
mongoose.connect(conString);

// add user express route
app.post(`/addUser`, async (request, response) => {
  const user = new UserModel({
    username: request.body.username,
    password: request.body.password
  });
  console.log(user);
  await user.save();
  response.send("Account registred successfully");
});

// get user express route
app.get(`/getUser/:username`, async (request, response) => {
  const user = await UserModel.find({username: request.params.username});
  response.send({user});
});

// store message express route
app.post(`/storeMessage`, async (request, response) => {
  const msg = new MessageModel({
    username: request.body.username,
    text: request.body.text,
    date: request.body.date,
    edited: request.body.edited,
    lastEdited: request.body.lastEdited
  });
  console.log(msg);
  await msg.save();
  response.send("Message saved successfully");
});

// retreive msg express route
app.get(`/retreiveMessages`, async (request, response) => {
  const msgs = await MessageModel.find();
  response.send({msgs});
});

// delete msg express route
app.delete(`/deleteMessage/:_id`, async (request, response) => {
  await MessageModel.findOneAndDelete({_id: request.params._id});
  response.send("Message deleted successfully");
});