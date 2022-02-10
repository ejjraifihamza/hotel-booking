const Reservation = require("../model/reservation");

const reservationValidation = require("../validation/reservationInput");

const createReservation = async (req, res) => {
  const { error } = reservationValidation.reservationValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { owner_id, room_id, payment_type, date_from, date_to } = req.body;
  const reservation = new Reservation({
    owner_id,
    room_id,
    payment_type,
    date_from,
    date_to,
  });
  try {
    if (payment_type !== "card" && payment_type !== "cash") {
      return res.send('"type" should be "card" or "cash"!');
    }
    await reservation.save();
    return res.status(200).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createReservation: createReservation,
};
