import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserModel from './models/User.js';

const app = express();
app.use(cors());
app.use(express.json());

const port = 4000;
app.listen(port, () => {
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
})