const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cors = require("cors");
const connectDB = require("./connect.js");
const app = express();

console.log("Working");

app.use(morgan("tiny"));
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

dotenv.config({
  path: "./.env",
});

var ProductDb = require("./model.js");

console.log(process.env.DATABASE_URI);

connectDB();

app.get("/", (req, res) => {
  res.send("test");
});

app.listen(process.env.PORT, () => {
  console.log("server is running");
});

app.get("/products", (req, res) => {
  ProductDb.find()
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/products", (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  const product = new ProductDb({
    name: req.body.name,
    checked: req.body.checked ?? false,
  });

  product
    .save(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error while saving to db" });
    });
});
