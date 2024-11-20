const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  service: { type: String, required: true },

  price: { type: String, required: true },
});

module.exports = mongoose.model("Category", categorySchema);
