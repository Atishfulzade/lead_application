const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Updated schema to use productCategory instead of product
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String, // Changed from Number to String to match typical phone number formats
  productCategory: String, // Changed from product to productCategory
});

const Lead = mongoose.model("Lead", leadSchema);

app.post("/leads", async (req, res) => {
  const lead = new Lead(req.body);
  try {
    await lead.save();
    res.status(201).send(lead);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put("/leads/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lead) {
      return res.status(404).send();
    }
    res.send(lead);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/leads/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).send();
    }
    res.send(lead);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/leads", async (req, res) => {
  const { name, email } = req.query;
  const query = {};
  if (name) query.name = new RegExp(name, "i");
  if (email) query.email = new RegExp(email, "i");

  try {
    const leads = await Lead.find(query);
    res.send(leads);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
