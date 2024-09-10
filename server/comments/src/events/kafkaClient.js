import { Kafka } from "kafkajs";

export class KafkaService {
  constructor() {
    this.kafka = new Kafka({
      clientId: "kafka-client",
      brokers: ["localhost:9092"],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "comment-srv" });
  }
  async publishMessage(topic, message) {
    try {
      console.log('level-1');
      await this.producer.connect();
      console.log('level-2');

      await this.producer.send({
        topic: topic,
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      }
    );
      console.log('level-3');
      console.log(message,topic,"===>");
      await this.producer.disconnect();
    } catch (error) {
      console.error(error);
    }
  }

  async consumeMessage(topic) {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({
        topic: topic,
        fromBeginning: true,
      });
      await this.consumer.run({
        eachMessage: async (topic, partition, message) => {
          console.log(topic);
          console.log(partition);
          console.log(message);

        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
