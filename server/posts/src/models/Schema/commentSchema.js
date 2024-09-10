import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comments:String
})

export const commentModel = mongoose.model('comment',commentSchema)