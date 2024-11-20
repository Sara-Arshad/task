const express = require("express");
const {
  getFreelancers,
  addFreelancer,
} = require("../controllers/freelancerController");

const router = express.Router();

router.get("/all", getFreelancers);
router.post("/add", addFreelancer);

module.exports = router;
