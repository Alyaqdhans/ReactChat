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
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  // broadcast new user count
  socket.on("join", () => {
    userCount++;
    io.emit("users", userCount);
    socket.join(room);
  });

  // broadcast left user count
  socket.on("leave", () => {
    userCount--;
    io.emit("users", userCount);
    socket.leave(room);
  });

  // broadcasting new message to clients
  socket.on("send_message", (msg) => {
    io.to(room).emit("sending_message", msg);
  });

  // broadcasting deleted message to clients
  socket.on("delete_message", (_id) => {
    io.to(room).emit("deleting_message", _id);
  });

  // broadcasting edited message to clients
  socket.on("edit_message", (msgList) => {
    io.to(room).emit("editing_message", msgList);
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
  await user.save();
  console.log(user)
  response.send("Account registred successfully");
});

// get user express route
app.get(`/getUser/:username`, async (request, response) => {
  const user = await UserModel.find({username: request.params.username});
  response.send(user[0]);
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
  await msg.save();
  console.log(msg)
  // send it to get updated on clients
  response.send(msg);
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

// edit msg express route
app.put("/editMessage/:_id", async (request, response) => {
  const msg = await MessageModel.findOne({ _id: request.params._id });
  msg.text = String(request.body.text);
  msg.edited = Boolean(request.body.edited);
  msg.lastEdited = String(request.body.lastEdited);

  await msg.save();
  response.send("Message updated successfully");
});