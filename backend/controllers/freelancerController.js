const Freelancer = require("../models/Freelancer");

exports.getFreelancers = async (req, res) => {
  try {
    const freelancers = await Freelancer.find();
    res.json(freelancers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch freelancers", error });
  }
};

exports.addFreelancer = async (req, res) => {
  try {
    const freelancer = new Freelancer(req.body);
    await freelancer.save();
    res.status(201).json(freelancer);
  } catch (error) {
    res.status(400).json({ message: "Failed to add freelancer", error });
  }
};
