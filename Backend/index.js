require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3001;

console.log(`IS_LOADED: ${process.env.IS_LOADED || "No"}`);

// On Vercel the app is exported as a serverless function; locally we start a server
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;
