const express = require("express");
const mongoose = require("mongoose");
const Tour = require("./tourSchema");
const path = require("path");

const app = express();

const port = 3000;

// const DB_HOST =
//   "mongodb+srv://katerin69llobster:2bBqXIYWfgdf9Gt2@tourism.rp7etgr.mongodb.net/";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Пошук страв за назвою або кухнею
// app.get("/dishes", async (req, res) => {
//   const { name, cuisine } = req.query;
//   let query = {};

//   if (name) {
//     query.name = new RegExp(name, "i");
//   }

//   if (cuisine) {
//     query.cuisine = new RegExp(cuisine, "i");
//   }

//   try {
//     // const dishes = await Dish.find(req.query);
//     // console.log("Dish", Dish);
//     console.log("req.query", req.query);
//     if (req.query === Dish.name) {
//       console.log("yes spivpadin");
//       res.json({
//         message: "success",
//         data: Dish.description,
//       });
//     } else {
//       console.log("no spivpadin");
//       res.json({
//         message: "no this item in db",
//       });
//     }
//     // res.json({
//     //   message: "success",
//     //   data: Dish.description,
//     // });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
// app.get("/tours", async (req, res) => {
//   const { name } = req.query;
//   let query = {};

//   if (name) {
//     query.name = new RegExp(name, "i");
//   }

//   try {
//     const tours = await Tour.find(query);
//     console.log("req.query", req.query);
//     res.json({
//       message: "success",
//       data: tours,
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

app.get("/tours/all", async (req, res) => {
  try {
    console.log("conect");
    const allTours = await Tour.find();
    console.log("allTours", allTours);
    res.status(200).json(allTours);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(
    "mongodb+srv://katerin69llobster:2bBqXIYWfgdf9Gt2@tourism.rp7etgr.mongodb.net/?retryWrites=true&w=majority&appName=tourism"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Server is running on http://localhost:${port}`
      );
    });
  })
  .catch((err) =>
    console.log("Error connecting to MongoDB:", err)
  );
