const router = require("express").Router();
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

const Hotel = require("../model/hotel");
const Customer = require("../model/customer");
const Owner = require("../model/owner");

// Admin can create and edit, delete Hotels. Add images for each hotel. Each hotel can have between 4 and 8 images.
router.get("/", (req, res) => {
  res.redirect("/hotels");
});

router.get("/hotels", (req, res) => {
  res.send("hotels page");
});

router.post("/add-hotel", (req, res) => {
  res.send("add hotel form");
});

router.get("/hotel/:id", (req, res) => {
  res.send("view hotel page");
});

router.patch("/hotel/:id/update", (req, res) => {
  res.send("update hotel page");
});

router.delete("/hotel/:id/delete", (req, res) => {
  res.send("delete hotel");
});

// CRUD for customers registered on the site.
router.get("/customers", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.post("/add-customer", async (req, res) => {
  const { name, email, password } = req.body;
  const client = new Customer({
    name: name,
    email: email,
    password: password,
  });
  try {
    await client.save();
    return res.status(200).send("client created suc");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/customer/:id", async (req, res) => {
  const id = req.params.id;
  const client = await Customer.findOne({ _id: new ObjectId(id) });
  if (!client) return res.send("not found");
  res.send(client);
});

router.patch("/customer/:id/update", async (req, res) => {
  const id = new ObjectId(req.params.id);
  const { name, email, password } = req.body;
  const newCustomer = {
    name: name,
    email: email,
    password: password,
  };

  const client = await Customer.findOne({ _id: new ObjectId(id) });
  if (!client) return res.send("Client not found");
  const updateClient = await Customer.updateOne({ _id: id }, newCustomer);
  if (updateClient) return res.send("user updated successfully!");
  res.send("somthing goes wrong");
});

router.delete("/customer/:id/delete", async (req, res) => {
  const id = new ObjectId(req.params.id);
  const client = await Customer.findOne({ _id: new ObjectId(id) });
  if (!client) return res.send("Client not found");
  const deleteClient = await Customer.deleteOne({ _id: id });
  if (deleteClient) return res.send("user deleted successfully!");
  res.send("somthing goes wrong");
});

// CRUD for owners registered on the site.
router.get("/owners", async (req, res) => {
  try {
    const owner = await Owner.find({}).catch((err) => {
      console.error(err);
    });
    res.status(200).send(owner);
  } catch (error) {
    console.error(error);
  }
});

router.post("/add-owner", async (req, res) => {
  const owner = new Owner({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    date: req.body.date,
  });
  try {
    const result = await owner.save().catch((err) => {
      throw err;
    });
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

router.get("/owner/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const owner = await Owner.findById(id).catch((err) => {
      throw err;
    });
    res.status(200).send(owner);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/owner/:id/update", async (req, res) => {
  const ownerId = req.params.id;
  const { name, email, password } = req.body;
  const updatedOwner = await Owner.findByIdAndUpdate(ownerId, {
    name: name,
    email: email,
    password: password,
  });
  if (!updatedOwner) return res.status(400).send("Owner does not updated!");
  res.status(200).send("Owner updated successfully!");
});

router.delete("/owner/:id/delete", async (req, res) => {
  const id = req.params.id;
  try {
    const owner = await Owner.findByIdAndRemove(id).catch((err) => {
      console.error(err);
    });
    res.status(200).json("Your Owner has been removed successfully");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
