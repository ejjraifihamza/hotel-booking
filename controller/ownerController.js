const Owner = require("../model/owner");
const bcrypt = require("bcryptjs");

const ownerSchemaValidation = require("../validation/ownerInputValidation");

exports.getAllOwners = async (req, res) => {
  try {
    const owner = await Owner.find({}).catch((err) => {
      console.error(err);
    });
    res.status(200).send(owner);
  } catch (error) {
    console.error(error);
  }
};

exports.addOneOwner = async (req, res) => {
  const { error } = ownerSchemaValidation.registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const owner = new Owner({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const result = await owner.save().catch((err) => {
      throw err;
    });
    res.send(result);
  } catch (error) {
    console.error(error);
  }
};

exports.getOneOwner = async (req, res) => {
  const id = req.params.id;
  try {
    const owner = await Owner.findById(id).catch((err) => {
      throw err;
    });
    res.status(200).send(owner);
  } catch (error) {
    console.log(error);
  }
};

exports.updateOneOwner = async (req, res) => {
  const ownerId = req.params.id;
  const { name, email } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const updatedOwner = await Owner.findByIdAndUpdate(ownerId, {
    name: name,
    email: email,
    password: hashedPassword,
  });
  if (!updatedOwner) return res.status(400).send("Owner does not updated!");
  res.status(200).send("Owner updated successfully!");
};

exports.deleteOneOwner = async (req, res) => {
  const id = req.params.id;
  try {
    const owner = await Owner.findByIdAndRemove(id).catch((err) => {
      console.error(err);
    });
    res.status(200).json("Your Owner has been removed successfully");
  } catch (error) {
    console.error(error);
  }
};
