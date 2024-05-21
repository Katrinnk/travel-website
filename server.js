const express = require("express");
const mongoose = require("mongoose");
const Tour = require("./tourSchema");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/tours", async (req, res) => {
  const { name, region } = req.query;
  let query = {};

  console.log("query", query);

  if (name) {
    query.name = new RegExp(name, "i");
  }

  if (region) {
    query.region = new RegExp(region, "i");
  }

  try {
    const tours = await Tour.find(query);
    if (!tours || tours.length === 0) {
      res.status(505).json({
        message: "this trip not find in database",
      });
    } else {
      res.status(200).json({
        message: "success",
        data: tours,
      });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/tours/all", async (req, res) => {
  try {
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
    "mongodb+srv://katerin69llobster:2bBqXIYWfgdf9Gt2@tourism.rp7etgr.mongodb.net/tourism"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .then(() => {
    app.listen(3000, () => {
      console.log(
        `Server is running on http://localhost:3000`
      );
    });
  })
  .catch((err) =>
    console.log("Error connecting to MongoDB:", err)
  );
