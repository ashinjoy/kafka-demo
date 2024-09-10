import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  comments:[String]
});

export const postModel = mongoose.model("post", postSchema);
