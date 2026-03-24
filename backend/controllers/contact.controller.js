const Contact = require("../models/contact.model");

const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await newContact.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createContact, getContacts };
