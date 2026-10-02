import { ChatbotModel } from "../models/ChatbotModel";

export const chatbotController = {
  async getSuggestions(contextText, question) {
    try {
      const suggestionsText = await ChatbotModel.getSuggestions(contextText, question);
      return aiSuggestionsToArray(suggestionsText);
    } catch (err) {
      console.error("Error retrieving suggestions from backend", err);
      return [];
    }
  },

  async saveEvent(eventData) {
    try {
      const message = await ChatbotModel.saveEventToDatabase(eventData);
      return message;
    } catch (error) {
      console.error("Error saving event:", error);
      return "Failed to save event. Please try again.";
    }
  },
};

// Helper function: works whether the AI puts each option on its own line or all on one line
export function aiSuggestionsToArray(text) {
  return text
    .split(/\s*-?\s*Option\s*\d+:\s*/i)
    .slice(1)
    .map((part) => part.trim().replace(/[,;]$/, "").trim())
    .filter(Boolean);
}
