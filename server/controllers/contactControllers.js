const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString()!==req.user.id)
    {
      res.status(403);
      throw new Error("User don't have permission to Read other user data")
    }
  res.status(200).json(contact);
});
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString()!==req.user.id)
  {
    res.status(403);
    throw new Error("User don't have permission to Edit other user data")
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateContact);
});
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const existingContact=await Contact.findOne(
    {
      user_id: req.user.id,
      $or: [{ email }, { phone }]
    }
  )
  if(existingContact)
  {
    res.status(400)
    throw new Error("Contact already exist")
  }
  const contact = await Contact.create({
    user_id:req.user.id,
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});
const deleteContact = asyncHandler(async (req, res) => {
  
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString()!==req.user.id)
    {
      res.status(403);
      throw new Error("User don't have permission to Delete other user data")
    }
  await Contact.deleteOne({_id:req.params.id});
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  updateContact,
  createContact,
  deleteContact,
};
