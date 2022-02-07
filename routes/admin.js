const router = require("express").Router();
const multer = require("multer");

const ownerController = require("../controller/ownerController");
const customerController = require("../controller/customerController");
const hotelController = require("../controller/hotelController");

const storageConfig = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storageConfig });

// ! Admin can create and edit, delete Hotels. Add images for each hotel. Each hotel can have between 4 and 8 images.
router.get("/", (req, res) => {
  res.redirect("/hotels");
});
router.route("/hotels").get(hotelController.getAllHotels);
router
  .route("/add-hotel")
  .post(upload.array("photos", 20), hotelController.addOneHotel);
router.route("/hotel/:id").get(hotelController.getOneHotel);
router
  .route("/hotel/:id/update")
  .patch(upload.array("photos", 20), hotelController.updateOneHotel);
router.route("/hotel/:id/delete").delete(hotelController.deleteOneHotel);

// ! CRUD for customers registered on the site.
router.route("/customers").get(customerController.getAllCustomers);
router.route("/add-customer").post(customerController.addOneCustomer);
router.route("/customer/:id").get(customerController.getOneCustomer);
router
  .route("/customer/:id/update")
  .patch(customerController.updateOneCustomer);
router
  .route("/customer/:id/delete")
  .delete(customerController.deleteOneCustomer);

// ! CRUD for owners registered on the site.
router.route("/owners").get(ownerController.getAllOwners);
router.route("/add-owner").post(ownerController.addOneOwner);
router.route("/owner/:id").get(ownerController.getOneOwner);
router.route("/owner/:id/update").patch(ownerController.updateOneOwner);
router.route("/owner/:id/delete").delete(ownerController.deleteOneOwner);

module.exports = router;
