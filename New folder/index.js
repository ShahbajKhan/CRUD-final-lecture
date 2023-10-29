// import/require
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const meals = require("./meals.json");
const products = require("./productData.json");

// middleware
app.use(cors());

app.get("/my-first-api", (req, res) => {
  return res.send({
    status: true,
    message: "hey! this is our first server!",
  });
});
app.get("/meal-info", function (req, res) {
  res.send(meals);
});
// product api

app.get("/all-products", (req, res) => {
  return res.send({
    products: products,
  });
});

app.get("/single-product/:id",(req,res)=>{
  const productId= req.params.id;
  const result = products.find((product)=> product.id === parseInt(productId));
  res.send(result)

})
app.get("/single-product-by-title/:name",(req,res)=>{
  const productName = req.params.name;
  const result = products.find((product)=> product.title === productName);
  res.send(result)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
