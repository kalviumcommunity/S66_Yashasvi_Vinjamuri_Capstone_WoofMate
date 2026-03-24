const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    key: { type: String, required: true },
    allowMultiple: { type: Boolean, default: false },
    dependsOn: {
        key: { type: String },
        value: { type: String }
    }
});

module.exports = mongoose.model("Question", questionSchema);
