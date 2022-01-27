const router = require("express").Router();

// Admin can create and edit, delete Hotels. Add images for each hotel. Each hotel can have between 4 and 8 images.
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
router.get("/customers", (req, res) => {
  res.send("customers page");
});

router.post("/add-customer", (req, res) => {
  res.send("add customer form");
});

router.get("/customer/:id", (req, res) => {
  res.send("view customer page");
});

router.patch("/customer/:id/update", (req, res) => {
  res.send("update customer page");
});

router.delete("/customer/:id/delete", (req, res) => {
  res.send("delete customer");
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
