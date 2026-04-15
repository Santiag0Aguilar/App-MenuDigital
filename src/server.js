const app = require("./app");
const logger = require("./shared/utils/logger");
const fs = require("fs");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API menuLink corriendo en puerto ${PORT}`);
});

// Manejo de errores no capturados
process.on("unhandledRejection", (reason) => {
  logger.error("UnhandledRejection:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  logger.error("UncaughtException:", err);
  process.exit(1);
});
