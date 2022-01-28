let fs = require("fs");
const path = require("path");
const router = require("express").Router();
const mongodb = require("mongodb");
const multer = require("multer");

const ObjectId = mongodb.ObjectId;

const Hotel = require("../model/hotel");
const Customer = require("../model/customer");
const Owner = require("../model/owner");

const storageConfig = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storageConfig });

// Admin can create and edit, delete Hotels. Add images for each hotel. Each hotel can have between 4 and 8 images.
router.get("/", (req, res) => {
  res.redirect("/hotels");
});

router.get("/hotels", async (req, res) => {
  const hotels = await Hotel.find();
  if (!hotels)
    return res.status(400).send("Sorry We Can Not Get Your Request!");
  res.status(200).send(hotels);
});

router.post("/add-hotel", upload.array("photos", 12), async (req, res) => {
  const uploadedImageFiles = req.files;
  let images = [];
  for (const uploadedImageFile of uploadedImageFiles) {
    images.push(uploadedImageFile.filename);
  }
  const { name, place, stars } = req.body;
  const insertHotel = new Hotel({
    name: name,
    place: place,
    stars: stars,
    imagesPath: images,
  });
  const hotel = await insertHotel.save();
  if (!hotel) return res.status(400).send("Sorry Hotel Does Not Added!");
  res.status(200).send("Hotel Added Successfully!");
});

router.get("/hotel/:id", async (req, res) => {
  const hotelId = req.params.id;
  const hotel = await Hotel.findById(hotelId);
  if (!hotel)
    return res.status(400).send("Sorry We Can Not Find Hotel With Given Id!");
  res.status(200).send(hotel);
});

router.patch(
  "/hotel/:id/update",
  upload.array("photos", 12),
  async (req, res) => {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel)
      return res.status(400).send("Sorry We Can Not Find Hotel With Given Id!");
    let hotelImages = hotel.imagesPath;
    console.log(hotelImages);
    for (const hotelImage of hotelImages) {
      fs.unlink(`../hotel-booking/images/${hotelImage}`, (err) => {
        if (err) throw err;
        console.log("Files Deleted!");
      });
    }
    const uploadedImageFiles = req.files;
    let images = [];
    for (const uploadedImageFile of uploadedImageFiles) {
      images.push(uploadedImageFile.filename);
    }
    const { name, place, stars } = req.body;
    const updateHotel = await Hotel.updateOne(
      { _id: hotelId },
      { name: name, place: place, stars: stars, imagesPath: images }
    );
    if (updateHotel) return res.status(200).send("Hotel Updated Successfully!");
    res.send("Ooops Something Goes Wrong!");
  }
);

router.delete("/hotel/:id/delete", async (req, res) => {
  const hotelId = req.params.id;
  const hotel = await Hotel.findById(hotelId);
  if (!hotel)
    return res.status(400).send("Sorry We Can Not Find Hotel With Given Id!");
  await Hotel.deleteOne({ _id: hotelId });
  res.status(200).send("delete hotel");
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
