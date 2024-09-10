import express from "express";
import { KafkaService } from "./event/kafkaClient.js";
import { commentModel, postModel } from "./models/Schema/index.js";
import { dbConnect } from "./config.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/post", async (req, res) => {
  const { title, description } = req.body;
  const postCreated = await postModel.create({
    title,
    description,
  });
  console.log(postCreated);
  res
    .status(200)
    .json({ sucess: "new post is Posted Sucesssfully", id: postCreated._id });
});

// listening to events from comment service!!

const startServer = async () => {
  try {
    dbConnect();
    const kafka =new KafkaService()
    kafka.consumeMessage("comment-created");
    app.listen(3002, () =>
      console.log("Server started at http://localhost:3002")
    );
  } catch (error) {
    console.log(error);
  }
};
startServer();
