const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  description: { type: String },
  imgs: { type: [String] },
  location: { type: String },
  main_img: { type: String },
  name: { type: String },
  rating: { type: String },
  regoin: { type: String },
});

const Tour = mongoose.model("tour", tourSchema);

module.exports = Tour;
