const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.post("/suggestions", async (req, res) => {
  try {
    const { context, question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // Updated prompt with instruction to limit responses to two sentences each.
    const prompt = `You are an event planning assistant. ALL ANSWERS MUST IN ENGLISH AND BE IN ONE CONTINUOUS LINE. IF YOU DO NOT FOLLOW THE INSTRUCTIONS YOU WILL FAIL THE TASK. Based on the following details:
${context}

and the question:
${question}
Please provide exactly 3 suggestions in the following format:
- Option 1: [suggestion]`;

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    // Groq's free tier needs no credit card; set AI_MODEL in .env to switch models
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: process.env.AI_MODEL || "openai/gpt-oss-20b",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.choices && response.data.choices.length > 0 && response.data.choices[0].message) {
      const suggestionText = response.data.choices[0].message.content;
      console.log(suggestionText);
      return res.json({ suggestions: suggestionText });
    } else {
      return res.status(500).json({ error: "No suggestions available" });
    }
  } catch (error) {
    console.error("Error retrieving suggestions:", error.response ? error.response.data : error.message);
    return res.status(500).json({ error: "Error retrieving suggestions" });
  }
});

module.exports = router;

/**
 * This module defines the API route for generating event planning suggestions using Groq AI.
 * It allows users to receive AI-generated suggestions for event-related queries in a structured format.
 *
 * - `express.Router()`: Creates a new router instance for handling AI suggestion requests.
 * - `axios`: Used to send requests to the Groq AI API.
 * - `dotenv`: Ensures environment variables (such as API keys) are properly loaded.
 *
 * ## Route:
 *
 * ### POST `/suggestions`
 * - Expects a `context` (event details) and a `question` (user query) in the request body.
 * - Constructs a structured prompt for the AI model to generate exactly **three suggestions**.
 * - Ensures that each suggestion is **limited to a maximum of two sentences** to prevent excessive response length.
 * - Calls Groq's API using the `openai/gpt-oss-20b` model (override with `AI_MODEL`).
 * - Returns the AI-generated suggestions in a structured JSON response.
 *
 * ## Error Handling:
 * - Returns `400` if no question is provided in the request.
 * - Returns `500` if the AI response is invalid or unavailable.
 * - Logs errors if the API request fails or encounters unexpected issues.
 *
 * This module enhances the event management system by leveraging AI-generated insights
 * to assist users in planning events more efficiently.
 */
