const { GoogleGenerativeAI } = require("@google/generative-ai");
const AIConversation = require("../models/aiConversation.model");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are WoofMate AI, a canine specialist and expert in dog breeds, nutrition, behavior, and care. You provide friendly, professional, and accurate advice. Always prioritize the safety and well-being of dogs. If asked about something completely unrelated to dogs, politely bring the conversation back to pets."
});

const askBot = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user?.id;
        
        console.log(`[AskAI] Request received. Message: "${message}", UserID: ${userId || "GUEST"}`);

        if (!process.env.GEMINI_API_KEY) {
            console.error("AI Error: GEMINI_API_KEY is missing or not configured in .env");
            return res.status(400).json({ error: "Gemini API Key is not configured. Please add it to your backend/.env file." });
        }

        let formattedHistory = [];
        if (userId) {
            // 1. Fetch recent history (last 10 messages) for authenticated user
            const history = await AIConversation.find({ user: userId })
                .sort({ timestamp: -1 })
                .limit(10);
            
            formattedHistory = history.reverse().map(msg => ({
                role: msg.role === "assistant" ? "model" : "user",
                parts: [{ text: msg.content }]
            }));
        }

        // 2. Start Gemini Chat Session
        const chat = model.startChat({
            history: formattedHistory,
        });

        // 3. Send Message
        const result = await chat.sendMessage(message);
        const aiReply = result.response.text();

        // 4. Save to history ONLY if user is authenticated
        if (userId) {
            const userMsg = new AIConversation({
                user: userId,
                role: "user",
                content: message
            });
            await userMsg.save();

            const assistantMsg = new AIConversation({
                user: userId,
                role: "assistant",
                content: aiReply
            });
            await assistantMsg.save();
        }

        res.status(200).json({
            message: "AI response generated successfully",
            reply: aiReply
        });
    } catch (error) {
        console.error("Gemini AI Error:", error);
        res.status(500).json({ error: "Sorry, I'm having trouble connecting to my brain right now. " + error.message });
    }
};

const getHistory = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(200).json({ history: [] });
        }
        const history = await AIConversation.find({ user: userId }).sort({ timestamp: 1 });
        res.status(200).json({ history });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { askBot, getHistory };
