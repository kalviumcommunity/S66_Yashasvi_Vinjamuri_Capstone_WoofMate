const Testimonial = require("../models/testimonial.model");

const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const seedTestimonials = async (req, res) => {
    const mockTestimonials = req.body;
    try {
        await Testimonial.deleteMany();
        const testimonials = await Testimonial.insertMany(mockTestimonials);
        res.status(201).json({ message: "Testimonials seeded successfully", testimonials });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getTestimonials, seedTestimonials };
