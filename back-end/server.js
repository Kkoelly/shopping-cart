const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto"); //NOT IN TUTORIAL
const app = express();
const axios = require("axios");
const products = require("./products.js");
const baseURL = "http://localhost:3030";

products.forEach(async (product) => {
  const response = await axios.post(`${baseURL}/api/products`, product);
  if (response.status != 200)
    console.log(`Error adding ${product.name}, code ${response.status}`);
});

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Conrol-Allow-Metods", "POST, GET, DELETE");
  res.header(
    "Access-Conrol-Allow-Metods",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static("public"));

let items = [];

app.post("/api/products", (req, res) => {
  const randID = crypto.randomUUID();
  let item = {
    id: randID,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  };
  items.push(item);
  res.send(item);
});

app.get("/api/products", (req, res) => {
  res.send(items);
});

app.get("/api/products/:id", (req, res) => {
  let item = items.find((element) => element.id === req.params.id);
  res.send(item);
});

app.delete("/api/products/:id", (req, res) => {
  let id = req.params.id;
  items = items.filter((someItem) => someItem.id !== id);
  res.sendStatus(200);
});

//CART
let cartItems = [];

app.get("/api/cart", (req, res) => {
  res.send(cartItems);
});

app.post("/api/cart/:id", (req, res) => {
  let item = cartItems.find((element) => element.id === req.params.id);
  if (item !== undefined) {
    item.quantity++;
  } else {
    item = { id: req.params.id, quantity: 1 };
    cartItems.push(item);
  }
  res.send(item);
});

app.put("/api/cart/:id/:quantity", (req, res) => {
  let item = cartItems.find((element) => element.id === req.params.id);
  if (item === undefined) {
    res.send(404);
    return;
  } else if (parseInt(req.params.quantity) === 0) {
    cartItems = cartItems.filter((element) => element.id !== req.params.id);
  } else {
    item.quantity = parseInt(req.params.quantity);
  }
  res.send(item);
});

app.delete("/api/cart/:id", (req, res) => {
  let id = req.params.id;
  let item = cartItems.find((element) => element.id === req.params.id);
  if (item === undefined) {
    res.sendStatus(404);
    return;
  } else {
    cartItems = cartItems.filter((someItem) => someItem.id !== id);
  }
  res.sendStatus(200);
});

app.listen(3030, () => console.log("Server listening on port 3030!"));
