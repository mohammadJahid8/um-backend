const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(
  `mongodb+srv://user-management:XiZwM1Ib8Pw9IYT9@cluster0.355hk05.mongodb.net/user-management?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  }
);

async function run() {
  try {
    // await client.connect();

    const usersCollection = client.db("user-management").collection("users");

    console.log("connected to db");

    app.get("/users", async (req, res) => {
      try {
      //  get all users
        
      const result = await usersCollection.find({}).toArray();

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.get("/users/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const result = await usersCollection.findOne(query);

        if (result) {
          res.send(result);
        } else {
          res.status(404).send("Product not found");
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.post("/user", async (req, res) => {
      try {
        const result = await usersCollection.insertOne(req.body);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });
    app.delete("/user/:id", async (req, res) => {
      try {
        const { id } = req.params;
        console.log(id)
        const query = { _id: new ObjectId(id) };
        await usersCollection.deleteOne(query);
        res.send("Deleted");
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Running");
});
app.listen(port, () => {
  console.log("PC Builder server listening to port", port);
});
