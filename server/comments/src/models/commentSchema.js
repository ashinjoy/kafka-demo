import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  comment: String,
});
export const commentModel = mongoose.model('comment',commentSchema)