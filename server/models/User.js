import mongoose from 'mongoose';

const schema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}
});

const UserModel = mongoose.model("users", schema);

export default UserModel;