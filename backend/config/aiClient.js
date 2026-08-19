const { OpenAI } = require("openai");

const grokApiKey = process.env.GROK_API_KEY;
const grokModel = process.env.GROK_MODEL || "grok-2-latest";

const grok = grokApiKey
  ? new OpenAI({
      apiKey: grokApiKey,
      baseURL: "https://api.x.ai/v1",
    })
  : null;

module.exports = { grok, grokModel };
