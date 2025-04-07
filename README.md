# Kafka Node.js Avro Example

This Node.js application demonstrates how to produce Avro-encoded messages to a Kafka topic on Confluent Cloud. It takes user input from the terminal, serializes the data using an Avro schema registered with Confluent Schema Registry, and sends it to Kafka using KafkaJS.

✅ **Features**

- Interactive terminal input for sending Kafka messages.
- Automatic Avro schema registration with Confluent Schema Registry.
- Uses the `kafkajs` library for interacting with Kafka.
- Seamless integration with Confluent Cloud for Kafka and Schema Registry.

📦 **Prerequisites**

- **Node.js v16+:** Ensure you have a compatible Node.js environment installed.
- **Confluent Cloud Account:** You need an active Confluent Cloud account.
- **Kafka Topic:** A Kafka topic must be created in your Confluent Cloud cluster.
- **Schema Registry Credentials:** You'll need API keys for your Confluent Cloud Schema Registry.
- **Kafka Cluster Credentials:** You'll need API keys for your Confluent Cloud Kafka cluster.

🛠 **Setup**

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/Krishna-coder1/kafkajs-avro-demo.git
    cd kafka-node-avro-example
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**

    - Copy the example environment file:

      ```bash
      cp .env.example .env
      ```

    - Edit the `.env` file and provide your Confluent Cloud credentials:

      ```
      KAFKA_BROKER=<YOUR_CONFLUENT_KAFKA_BOOTSTRAP_SERVERS>
      KAFKA_CLIENT_ID=kafka-nodejs-avro-producer
      KAFKA_TOPIC=<YOUR_KAFKA_TOPIC_NAME>
      KAFKA_USERNAME=<YOUR_CONFLUENT_KAFKA_API_KEY>
      KAFKA_PASSWORD=<YOUR_CONFLUENT_KAFKA_API_SECRET>
      SCHEMA_REGISTRY_HOST=<YOUR_CONFLUENT_SCHEMA_REGISTRY_URL>
      SCHEMA_REGISTRY_USERNAME=<YOUR_CONFLUENT_SCHEMA_REGISTRY_API_KEY>
      SCHEMA_REGISTRY_PASSWORD=<YOUR_CONFLUENT_SCHEMA_REGISTRY_API_SECRET>
      ```

    - **Important:** Replace the `<YOUR_...>` placeholders with your actual Confluent Cloud values. You can find these in the Confluent Cloud UI.

🚀 **Run the Application**

```bash
npm start
```
