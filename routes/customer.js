const router = require("express").Router();
const reservationController = require("../controller/reservationController");
const customerController = require("../controller/customerController");

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

module.exports = router;
