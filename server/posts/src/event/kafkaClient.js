import { Kafka } from "kafkajs";
import { CommentConsumer } from "./commentConsumer.js";


export class KafkaService {
  constructor() {
    this.kafka = new Kafka({
      clientId: "kafka-client",
      brokers: ["localhost:9092"],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "post-svc" });
    this.commentConsumer = new CommentConsumer()
  }

  async publishMessage(topic, message) {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic: topic,
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }

  async consumeMessage(topic) {
    try {
      console.log('level-1');
      
      await this.consumer.connect();
      console.log('level-2');

      await this.consumer.subscribe({
        topic: topic,
        fromBeginning: true,
      });
      console.log('level-3');

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log("topic", topic);
          console.log("partition", partition);
          console.log("message", message?.value.toString());
          const msgData = JSON.parse(message?.value.toString())
          const {type,data}  = msgData
          console.log('msgDataaaa',msgData);
          console.log(type,data);
          await this.commentConsumer.consume(type,data)    


        }
      });
      console.log('level-4');
      
    } catch (error) {
      console.error(error);
    }
  }
}
