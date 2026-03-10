const RescueModel = require('../models/rescue.model');
const cloudinary = require('../config/cloudinary');

const reportRescue = async (req, res) => {
    try {
        const { location, description, image, reporter } = req.body;
        let dogImage = "";
        if (image) {
            const result = await cloudinary.uploader.upload(image, {
                folder: "rescue_images",
            });
            dogImage = result.secure_url;
        }

        const newReport = new RescueModel({ reporter, location, description, dogImage });
        await newReport.save();

        res.status(201).json({ message: "Rescue reported successfully", report: newReport });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getReports = async (req, res) => {
    try {
        const reports = await RescueModel.find().populate("reporter", "name email");
        res.status(200).json({ message: "Reports fetched successfully", reports });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateReportStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedReport = await RescueModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedReport) return res.status(404).json({ error: "Report not found" });
        res.status(200).json({ message: "Report status updated", report: updatedReport });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const seedRescues = async (req, res) => {
    try {
        const mockRescues = req.body;
        await RescueModel.deleteMany();
        const rescues = await RescueModel.insertMany(mockRescues);
        res.status(201).json({ message: "Rescues seeded successfully", rescues });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { reportRescue, getReports, updateReportStatus, seedRescues };
