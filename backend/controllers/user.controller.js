const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

const getUser = async (req, res) => {
  try {
    const data = await userModel.find()
    if (!data) {
      return res.status(404).json({ error: "No user data available" })
    }
    res.status(200).json({ message: "Users data retrieved from database", data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getUserById = async (req, res) => {
  const {id} = req.params;
  try {
    const data = await userModel.findById(id)
    if (!data) {
      return res.status(404).json({ error: "No user with given ID exists" })
    }
    res.status(200).json({ message: "User data retrieved from database", data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const postUser = async (req, res) => {
  const { name, email, password, role } = req.body
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "name, email, password and role are required" })
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const new_user = new userModel({ name, email, password: hashedPassword, role })
    await new_user.save();
    res.status(201).json({ message: "New user created successfully", user: new_user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const putUser = async (req, res) => {
  const { id } = req.params
  const { name, email, password, role } = req.body
  try {
    let updatedData = { name, email, role }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      updatedData.password = hashedPassword;
    }
    const updated_user = await userModel.findByIdAndUpdate(id, updatedData, {new: true})
    if (!updated_user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.status(200).json({ message: "User updated successfully", updated_user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};


module.exports = {getUser, getUserById, postUser, putUser}
