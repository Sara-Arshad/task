const mongoose = require("mongoose");

const freelancerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profilePicture: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  skills: [{ type: String, required: true }],
  location: { type: String, required: true },
  language: { type: String, required: true },
  hourlyRate: { type: String, required: true },
  jobSuccess: { type: Number, required: true },
  trending: { type: Boolean, required: false },
  category: { type: String, required: true },
  service: { type: String, required: true },
});

module.exports = mongoose.model("Freelancer", freelancerSchema);
