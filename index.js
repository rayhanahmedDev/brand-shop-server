const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;


// middleware

// BrandShop
// xdJIha7PaKA49Gn2



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const brandCollection = client.db("brandDB").collection('brand')
    const addCardCollection = client.db("brandDB").collection('addcard')

    // products
    app.get('/brand',async(req,res) =>{
      const result = await brandCollection.find().toArray()
      res.send(result)
    })

    app.get('/brand/:brand', async(req,res) =>{
      const brandNames = req.params.brand;
      const brands = await brandCollection.find().toArray()

      // const query = {brand:brandNames}
      // const result =await brandCollection.find(query).toArray()
      const result= await brands.filter( brand => brand.brand === brandNames)
      res.send(result)
    })

    // brand id form
    app.get('/brandadd/:id', async(req, res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await brandCollection.findOne(query)
      res.send(result)
    })

    // update brand product
    app.put('/brandup/:id',async(req,res) =>{
      const id = req.params.id
      const data = req.body
      const filter = {_id : new ObjectId(id)}
      const options = { upsert: true };
      const updateProduct = {
        $set : {
          name : data.name, 
          brand : data.brand, 
          computer : data.computer, 
          price : data.price, 
          rating : data.rating, 
          photo : data.photo
        }
      }
      const result = await brandCollection.updateOne(filter,updateProduct,options)
      res.send(result)
    })

    // 2nd post section
    app.post("/addcard", async (req, res) => {
      const user = req.body;
      const result = await addCardCollection.insertOne(user);
      res.send(result);
    });

    // main post section

    app.post('/users',async(req,res) =>{
        const user = req.body;
        const result = await userCollection.insertOne(user)
        res.send(result)
    })

    app.get('/users', async(req,res) =>{
      const result = await userCollection.find().toArray()
      res.send(result)
    })

    app.delete('/users/:id', async(req,res) =>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await userCollection.deleteOne(query)
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