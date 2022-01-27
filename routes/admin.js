const router = require("express").Router();
const Owner = require("../model/owner")

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
router.get("/owners", async (req, res) => {
  try {
    const owner = await Owner.find({})
      .catch(err => {
        console.error(err);
      })
    res.status(200).send(owner)
  } catch (error) {
    console.error(error);
  }
  // res.send("owners page");
});

// 
router.post("/add-owner", async (req, res) => {
  const owner = new Owner({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    date: req.body.date
  })
  try {
    const result = await owner.save()
      .catch(err => {
        throw err
      })
    res.send(result)
  } catch (error) {
    console.error(error);
  }
  // res.send("add owner form");
});

// 
router.get("/owner/:id", async (req, res) => {
  const id = req.params.id
  try {
    const owner = await Owner.findById(id)
      .catch((err) => {
        throw err
      })
    res.status(200).send(owner)
  } catch (error) {
    console.log(error);
  }

});

// 
router.patch("/owner/:id/update", async (req, res) => {
  try {
    let owner = await Owner.findById(req.params.id)
    owner.name = req.body.name,
      owner.email = req.body.email,
      owner.password = req.body.password,
      owner.date = req.body.date

    await owner.save()

      .catch(err => {
        throw err
      })

    res.status(200).send(owner)
  } catch (error) {
    console.error(error);
  }

});

// 
router.delete("/owner/:id/delete", async (req, res) => {
  const id = req.params.id
  try {
    const owner = await Owner.findByIdAndRemove(id)
      .catch(err => {
        console.error(err);
      })
    res.status(200).json('Your Owner has been removed successfully')
  } catch (error) {
    console.error(error)
  }

});

module.exports = router;