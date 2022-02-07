const Customer = require("../model/customer");
const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

const customerSchemaValidation = require("../validation/customerInputValidation");

exports.getAllCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
};

exports.addOneCustomer = async (req, res) => {
  const { error } = customerSchemaValidation.registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { name, email } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const customer = new Customer({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await customer.save();
    return res.status(200).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getOneCustomer = async (req, res) => {
  const id = req.params.id;
  const client = await Customer.findOne({ _id: id });
  if (!client) return res.send("not found");
  res.send(client);
};

exports.updateOneCustomer = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const { name, email } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newCustomer = {
    name: name,
    email: email,
    password: hashedPassword,
  };

  const client = await Customer.findOne({ _id: new ObjectId(id) });
  if (!client) return res.send("Client not found");
  const updateClient = await Customer.updateOne({ _id: id }, newCustomer);
  if (updateClient) return res.send("user updated successfully!");
  res.send("somthing goes wrong");
};

exports.deleteOneCustomer = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const client = await Customer.findOne({ _id: new ObjectId(id) });
  if (!client) return res.send("Client not found");
  const deleteClient = await Customer.deleteOne({ _id: id });
  if (deleteClient) return res.send("user deleted successfully!");
  res.send("somthing goes wrong");
};
