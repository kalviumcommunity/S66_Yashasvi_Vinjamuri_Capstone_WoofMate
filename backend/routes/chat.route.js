const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Chat = require("../models/chat");
const setUser = require("../middleware/setUser");

router.use(setUser);

const requireUser = (req, res) => {
  if (!req.user?.id) {
    res.status(401).json({ error: "Authentication required" });
    return null;
  }
  return req.user.id;
};

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get chat by participants
router.post("/get", async (req, res) => {
  try {
    const userId = requireUser(req, res);
    const { userId2 } = req.body;

    if (!userId) return;
    if (!isValidId(userId2)) {
      return res.status(400).json({ error: "A valid chat participant is required" });
    }

    let chat = await Chat.findOne({
      participants: { $all: [userId, userId2] },
    }).populate("participants", "name email avatar");

    if (!chat) {
      chat = await Chat.create({ participants: [userId, userId2], messages: [] });
      await chat.populate("participants", "name email avatar");
    }

    return res.json(chat);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Save new message
router.post("/message", async (req, res) => {
  try {
    const senderId = requireUser(req, res);
    const { chatId, receiverId, text } = req.body;

    if (!senderId) return;
    if (!text?.trim()) {
      return res.status(400).json({ error: "Message text is required" });
    }

    let chat = null;
    if (isValidId(chatId)) {
      chat = await Chat.findOne({ _id: chatId, participants: senderId });
    }

    if (!chat && isValidId(receiverId)) {
      chat = await Chat.findOne({ participants: { $all: [senderId, receiverId] } });
    }

    if (!chat && isValidId(receiverId)) {
      chat = new Chat({ participants: [senderId, receiverId], messages: [] });
    }

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    chat.messages.push({ senderId, text: text.trim() });
    await chat.save();
    await chat.populate("participants", "name email avatar");
    return res.status(200).json(chat);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get all chats for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = requireUser(req, res);
    if (!userId) return;
    if (userId !== req.params.userId || !isValidId(userId)) {
      return res.status(403).json({ error: "You can only access your own chats" });
    }

    const chats = await Chat.find({ participants: userId })
      .populate("participants", "name email avatar")
      .sort({ updatedAt: -1 });
    return res.json(chats);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Seed chats
router.post("/seed", async (req, res) => {
  try {
    const mockChats = req.body;
    await Chat.deleteMany();
    const chats = await Chat.insertMany(mockChats);
    res.status(201).json({ message: "Chats seeded successfully", chats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
