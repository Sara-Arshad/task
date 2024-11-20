const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connection/config");
const categoryRoutes = require("./routes/categoryRoutes");
const freelancerRoutes = require("./routes/freelancerRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(require("cors")());

connectDB();

app.use("/api/categories", categoryRoutes);
app.use("/api/freelancers", freelancerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
