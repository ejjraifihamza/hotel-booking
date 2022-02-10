const Joi = require("@hapi/joi");

const addRoomValidation = (data) => {
  const schema = Joi.object({
    type: Joi.string().min(5).required(),
    price: Joi.number().required(),
    hotel_name: Joi.string().required(),
    description: Joi.string().min(20).required(),
  });
  return schema.validate(data);
};

const updateRoomValidation = (data) => {
  const schema = Joi.object({
    type: Joi.string().min(5).required(),
    price: Joi.number().required(),
    description: Joi.string().min(20).required(),
  });
  return schema.validate(data);
};

module.exports = {
  addRoomValidation: addRoomValidation,
  updateRoomValidation: updateRoomValidation,
};
