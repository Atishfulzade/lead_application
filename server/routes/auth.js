// Create a new lead
app.post("/leads", async (req, res) => {
  const lead = new Lead(req.body);
  try {
    await lead.save();
    res.status(201).send(lead);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update an existing lead
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

// Delete a lead
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

// Search for leads
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
