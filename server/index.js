import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is online!");
})

const conString = "mongodb+srv://admin:admin@cluster.ajjsw6z.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster";
mongoose.connect(conString);