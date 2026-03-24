const RescueModel = require('../models/rescue.model');
const cloudinary = require('../config/cloudinary');

const reportRescue = async (req, res) => {
    try {
        const { location, description, image } = req.body;
        
        if (!location || location.length < 5) {
            return res.status(400).json({ error: "Please provide a more specific location." });
        }
        if (!description || description.length < 10) {
            return res.status(400).json({ error: "Please provide a detailed description of the situation." });
        }

        let dogImage = "";
        if (image) {
            const result = await cloudinary.uploader.upload(image, {
                folder: "rescue_images",
            });
            dogImage = result.secure_url;
        }

        const newReport = new RescueModel({ 
            reporter: req.user ? req.user.id : "64e0f9b3e6d2b638f4d9c0a1", // Use authenticated user or fallback placeholder
            location, 
            description, 
            dogImage 
        });
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
