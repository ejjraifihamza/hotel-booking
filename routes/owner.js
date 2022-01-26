const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.send("login page");
});

router.post("/login", (req, res) => {
  res.send("login form");
});

router.get("/register", (req, res) => {
  res.send("register page");
});

router.post("/register", (req, res) => {
  res.send("register form");
});

router.post("/logout", (req, res) => {
  res.send("logout form");
});

router.get("/profile", (req, res) => {
  res.send("profile page");
});

// hotel CRUD
router.get("/add-hotel", (req, res) => {
  res.send("add hotel page");
});

router.post("/add-hotel", (req, res) => {
  res.send("add hotel form");
});

router.get("/hotel/:id/", (req, res) => {
  res.send("view hotel page");
});

router.get("/hotel/:id/update", (req, res) => {
  res.send("update hotel page");
});

router.post("/hotel/:id/update", (req, res) => {
  res.send("update hotel form");
});

router.post("/hotel/:id/delete", (req, res) => {
  res.send("delete hotel");
});

module.exports = router;
