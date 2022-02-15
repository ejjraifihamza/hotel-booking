const router = require("express").Router();
const reservationController = require("../controller/reservationController");
const customerController = require("../controller/customerController");
const roomController = require("../controller/room.controller");
const hotelController = require("../controller/hotelController");

router
  .route("/customer-reservation")
  .post(reservationController.createReservation);
router
  .route("/customer-reservation/delete")
  .delete(reservationController.deleteReservation);

// ! Customer can modify his own profile

router.route("/customer/:id/profile").get(customerController.getOneCustomer);
router
  .route("/customer/:id/profile-update")
  .post(customerController.updateOneCustomer);

// ! Customer can search for available rooms by date
router
  .route("/customer/rooms-status-date")
  .post(roomController.searchForAvailableRoomByDate);

// ! customer can get all hotels by status

router.route("/annonces").get(hotelController.getAllHotelsByStatus);

module.exports = router;
