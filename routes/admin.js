const router = require("express").Router();
const mongodb = require("mongodb");
const Client = require('../model/client');

const ObjectId = mongodb.ObjectId

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
   const customers = await Client.find()
   console.log(customers);
   res.send(customers)

});

router.post("/add-customer", async (req, res) => {
 const {name, email, password} = req.body;
 const client = new Client({
   name:name,
   email:email,
   password:password
 })
 try {
   await client.save();
   res.status(200).send("client created suc")
 }
 catch( error){
   res.status(400).send(error);
 }
});

router.get("/customer/:id", async (req, res) => {
  console.log(req.params.id)
  const id = req.params.id
  console.log(id)
  
  const client = await Client.findOne({_id: new ObjectId(id)})
  if(!client) return res.send('not found')
  res.send(client)
});

router.patch("/customer/:id/update", async (req, res) => {
  const id = new ObjectId(req.params.id)
  const {name, email, password} = req.body
  const newCustomer = {
    name: name,
    email: email,
    password: password
  }

  const client = await Client.findOne({_id: new ObjectId(id)})
  if(!client) return res.send('Client not found')
  const updateClient = await Client.updateOne({_id: id}, newCustomer)
  if(updateClient) res.send('user updated successfully!')
  res.send('somthing goes wrong')
});

router.delete("/customer/:id/delete", async (req, res) => {
  const id = new ObjectId(req.params.id)
  const client = await Client.findOne({_id: new ObjectId(id)})
  if(!client) return res.send('Client not found')
  const deleteClient = await Client.deleteOne({_id: id})
  if(updateClient) res.send('user deleted successfully!')
  res.send('somthing goes wrong')
});

// CRUD for owners registered on the site.
router.get("/owners", (req, res) => {
  res.send("owners page");
});

router.post("/add-owner", (req, res) => {
  res.send("add owner form");
});

router.get("/owner/:id", (req, res) => {
  res.send("view owner page");
});

router.patch("/owner/:id/update", (req, res) => {
  res.send("update owner page");
});

router.delete("/owner/:id/delete", (req, res) => {
  res.send("delete owner");
});

module.exports = router;
