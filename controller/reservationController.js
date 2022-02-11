const Reservation = require("../model/reservation");
const Room = require("../model/room");

const reservationValidation = require("../validation/reservationInput");

const createReservation = async (req, res) => {
  const { error } = reservationValidation.reservationValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { reserver_id, room_id, payment_type, date_from, date_to } = req.body;
  const reservation = new Reservation({
    reserver_id,
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
    const room = await Room.findByIdAndUpdate(room_id, {
      status: "pas disponible",
    });
    if (!room) return res.status(500).send("Room status does not change!");
    return res.status(200).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteReservation = async (req, res) => {
  const reservationId = req.body.reservation_id;
  const roomId = req.body.room_id;
  try {
    const updateRoom = await Room.findByIdAndUpdate(roomId, {
      status: "disponible",
    });
    if (!updateRoom)
      return res.status(400).send("Room status does not change!");
    const deletedReservation = await Reservation.findByIdAndDelete(
      reservationId
    );
    if (!deletedReservation)
      return res.status(400).send("reservation does not deleted!");
    res.status(200).send("Reservation deleted successfully!");
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createReservation: createReservation,
  deleteReservation: deleteReservation,
};
