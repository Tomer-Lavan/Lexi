/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
const fs = require("fs");
const { execSync } = require("child_process");

const colors = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  red: "\x1b[31m",
};

const emojis = {
  success: "✅",
  warning: "⚠️",
  info: "ℹ️",
  error: "❌",
};

(async function setup() {
  console.log(
    colors.cyan,
    `${emojis.info} Starting setup process...`,
    colors.reset
  );

  const envContent = `
    REACT_APP_API_URL="http://localhost:5000"
    REACT_APP_FRONTEND_URL="http://localhost:3000"
  `.trim();

  fs.writeFileSync(".env", envContent);

  console.log(
    colors.green,
    `${emojis.success} .env file created successfully.`,
    colors.reset
  );

  console.log(
    colors.cyan,
    `${emojis.info} Installing dependencies...`,
    colors.reset
  );
  execSync("npm i", { stdio: "inherit" });

  console.log(colors.green, `${emojis.success} Setup complete!`, colors.reset);
})();
