const express = require("express");
const router = express.Router();
const { createContact, getContacts } = require("../controllers/contact.controller");
const authenticate = require("../middleware/authenticate");

router.post("/", createContact);
router.get("/", authenticate, getContacts);

module.exports = router;
