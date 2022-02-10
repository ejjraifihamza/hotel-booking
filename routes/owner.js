const router = require("express").Router();
const multer = require("multer");

const hotelController = require("../controller/hotelController");
const roomController = require("../controller/room.controller");
const reservationController = require("../controller/reservationController");
const ownerController = require("../controller/ownerController");

const storageConfig = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storageConfig,
});

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

// ! Owner can create a room and update, delete it

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "rooms");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadRoom = multer({
  storage: storage,
});

router.route("/owner-rooms").get(roomController.getAll_rooms);
router.route("/owner-room/:id").get(roomController.getOne_room);
router
  .route("/owner-add-room")
  .post(uploadRoom.array("imagesRoom", 20), roomController.add_room);
router
  .route("/owner-room/:id/update")
  .patch(uploadRoom.array("imagesRoom", 20), roomController.update_room);
router.route("/owner-room/:id/delete").delete(roomController.removeOne_room);

// ! owner can make a reservation

router
  .route("/owner-reservation")
  .post(reservationController.createReservation);

// ! owner can modify his own profile

router.route("/owner/:id/profile").get(ownerController.getOneOwner);
router.route("/owner/:id/profile-update").post(ownerController.updateOneOwner);

module.exports = router;
