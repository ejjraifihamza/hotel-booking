const Joi = require("@hapi/joi");

const reservationValidation = (data) => {
  const schema = Joi.object({
    reserver_id: Joi.required(),
    room_id: Joi.required(),
    payment_type: Joi.string().required(),
    date_from: Joi.string().required(),
    date_to: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  reservationValidation: reservationValidation,
};
