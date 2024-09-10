import { action } from "./action.js";

export class CommentConsumer {
  constructor() {}

  async consume(type, data) {
    try {
        console.log(type,data);
      console.log("switch statement");
      switch (type) {
        case "comment-created":
         return await action(data);
        default:
          console.log("Invalid Topic !!!");
      }
    } catch (error) {
      console.error(error);
    }
  }
}
