import mongoose from 'mongoose';

const schema = mongoose.Schema({
  username: {type: String, required: true},
  date: {type: String, required: true},
  edited: {type: Boolean, required: true},
  lastEdited: {type: String, required: true},
  text: {type: String, required: true}
});

const MessageModel = mongoose.model("messages", schema);

export default MessageModel;