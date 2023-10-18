const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;


// middleware

// BrandShop
// xdJIha7PaKA49Gn2



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://BrandShop:xdJIha7PaKA49Gn2@cluster0.or5ssuz.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const userCollection = client.db("brandDB").collection('user')

    app.post('/users',async(req,res) =>{
        const user = req.body;
        const result = await userCollection.insertOne(user)
        res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Crud is running...");
  });

  app.listen(port, () => {
    console.log(`Simple Crud is Running on port ${port}`);
  });