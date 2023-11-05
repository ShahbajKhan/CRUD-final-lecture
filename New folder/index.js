// // import/require
// const express = require("express");
// const app = express();
// const port = process.env.PORT || 5000;
// const cors = require("cors");
// const meals = require("./meals.json");
// const products = require("./productData.json");

// // middleware
// app.use(cors());

// app.get("/my-first-api", (req, res) => {
//   return res.send({
//     status: true,
//     message: "hey! this is our first server!",
//   });
// });
// app.get("/meal-info", function (req, res) {
//   res.send(meals);
// });
// // product api

// app.get("/all-products", (req, res) => {
//   return res.send({
//     products: products,
//   });
// });

// app.get("/single-product/:id",(req,res)=>{
//   const productId= req.params.id;
//   const result = products.find((product)=> product.id === parseInt(productId));
//   res.send(result)

// })
// app.get("/single-product-by-title/:name",(req,res)=>{
//   const productName = req.params.name;
//   const result = products.find((product)=> product.title === productName);
//   res.send(result)

// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// npm init -y
//  npm i express cors mongodb

const express = require("express");
const cors = require("cors");
require('dotenv').config()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q0qwx.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// middlewares
app.use(cors());
app.use(express.json());

async function run() {
  try {
    // DB collections
   const productCollection = client.db("autumn23").collection("products");

  //  all products api
   app.get("/all-products",async(req,res)=>{
    const products = await productCollection.find({}).toArray();
    res.send({products})
   })
  //  all products by brand api
   app.get("/all-products-by-brand/:brand",async(req,res)=>{
    const brand = req.params.brand
    const products = await productCollection.find({brand:brand}).toArray();
    res.send({products})
   })
  //  single product by id
   app.get("/single-product-by-id/:id",async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const product = await productCollection.findOne({_id:new ObjectId(id)});
    res.send({product})
   })
  } finally {
   
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Hello 3000!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
