import express from "express";
import { KafkaService } from "./events/kafkaClient.js";
import { dbConnect } from "./config.js";
import { commentModel } from "./models/commentSchema.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/comments/:postId", async (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;
  // console.log(post);
  const createComments = await commentModel.create({
    comment: comment,
  });
  console.log("create-comments", createComments);
  const publishData = {
    postId,
    comment,
  };

  //publishing comment-created event with data to topic

  const kafka = new KafkaService();
  kafka.publishMessage("comment-created", {
    type: "comment-created",
    data: publishData,
  });

  res
    .status(200)
    .json({ sucess: "new post is Posted Sucesssfully", createComments });
});
const startServer = async () => {
  try {
    dbConnect();
    app.listen(3001, () =>
      console.log("Server started at http://localhost:3001")
    );
  } catch (error) {}
};
startServer();
