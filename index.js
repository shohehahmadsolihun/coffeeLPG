const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/config/db");
const route = require("./src/routes");

const cloudinaryConfig = require("./src/config/cloudinary");
const cors = require("cors");
// const products = require("./src/models/products");
// const promos = require("./src/models/promo");
// const Users = require("./src/models/users");
// const transactions = require("./src/models/transactions");

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
  })
);

db.authenticate()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cloudinaryConfig);
app.use(route);

app.use(express.static(__dirname));

// products
//   .sync()
//   .then(() => {
//     console.log(`transaction i synchorize`);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// promos
//   .sync()
//   .then(() => {
//     console.log(`transaction i synchorize`);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Users.sync()
//   .then(() => {
//     console.log(`transaction i synchorize`);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// transactions
//   .sync()
//   .then(() => {
//     console.log(`transaction i synchorize`);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my simple API");
});

app.listen(port, () => {
  console.log(`APP is running on PORT ${port}`);
});

const data = () => {
  data;
};

//mvc => moduls,views,controllers,models =>merepresentasikan struktur data yang ada didalam database kita.controllers => logika yang kita buat di dalam API kita.
