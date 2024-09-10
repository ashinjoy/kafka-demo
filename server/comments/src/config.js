import mongoose from "mongoose";
export const dbConnect = async () => {
  try {
    const connection = await mongoose.connect("mongodb://localhost:27017/comment");
    if (connection) {
        console.log('Mongodb connected Successfully');
    }

  } catch (error) {
    console.error(error);
  }
};
