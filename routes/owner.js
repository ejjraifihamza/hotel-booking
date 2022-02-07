const router = require("express").Router();
const multer = require("multer");

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

  // ! Owner can create and edit, delete Hotels. Add images for each hotel. Each hotel can have between 4 and 8 images.
  router.route("/owner-hotels").get(hotelController.getAllHotels);
  router
    .route("/owner-add-hotel")
    .post(upload.array("photos", 20), hotelController.addOneHotel);
  router.route("/owner-hotel/:id").get(hotelController.getOneHotel);
  router
    .route("/owner-hotel/:id/update")
    .patch(upload.array("photos", 20), hotelController.updateOneHotel);
  router.route("/owner-hotel/:id/delete").delete(hotelController.deleteOneHotel);

  module.exports = router;