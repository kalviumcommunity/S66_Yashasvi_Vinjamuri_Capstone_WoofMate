const AIConversation = require("../models/aiConversation.model");
const { grok, grokModel } = require("../config/aiClient");

const askBot = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user?.id;
        
        console.log(`[AskAI] Request received. Message: "${message}", UserID: ${userId || "GUEST"}`);

        if (!grok || !process.env.GROK_API_KEY) {
            console.error("AI Error: GROK_API_KEY is missing or not configured in .env");
            return res.status(400).json({ error: "Grok API key is not configured. Please add it to your backend/.env file." });
        }

        let formattedHistory = [];
        if (userId) {
            const history = await AIConversation.find({ user: userId })
                .sort({ timestamp: -1 })
                .limit(10);

            formattedHistory = history.reverse().map((msg) => ({
                role: msg.role,
                content: msg.content
            }));
        }

        const completion = await grok.chat.completions.create({
            model: grokModel,
            messages: [
                {
                    role: "system",
                    content: "You are WoofMate AI, a canine specialist and expert in dog breeds, nutrition, behavior, and care. You provide friendly, professional, and accurate advice. Always prioritize the safety and well-being of dogs. If asked about something completely unrelated to dogs, politely bring the conversation back to pets."
                },
                ...formattedHistory,
                { role: "user", content: message }
            ]
        });
        const aiReply = completion.choices[0]?.message?.content || "Sorry, I could not generate a response right now.";

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
        console.error("Grok AI Error:", error);
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
