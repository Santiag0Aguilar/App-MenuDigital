import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

import userRoutes from "./routes/usuario.routes.js";
import authRoutes from "./routes/auth.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import publicMenuRoutes from "./routes/publicMenu.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import { prisma } from "./lib/prisma.js";

const app = express();

/* Headers Security */
app.use(helmet());

/* En estas lineas agrego validacion del tamaño del json que se recibe, asi evitamos cadenas de textos o valores enormes que ocupen mucha memoria */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

/* Proteger la modificacion de parametros  */
app.use(hpp());

/* Aqui modificamos para que los usuarios no usen el proxy de render es decir que todos los usuarios aparezcan con sus IPS y no la del proxy de render, asi evitando
que si un usuario manda 100req en 15 minutos se bloqueen todos */
app.set("trust proxy", 1);

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:4173",
  "http://localhost:5173",
  "https://app-menudigital.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS bloqueado: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: "ok",
      db: "connected",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(500).json({
      status: "error",
      db: "disconnected",
      timestamp: new Date().toISOString(),
    });
  }
});

app.use("/api", publicLimiter, publicMenuRoutes);

app.use(globalLimiter);
app.use("/analytics", analyticsRoutes);
app.use("/usuarios", userRoutes);
app.use("/auth", authRoutes);
app.use("/menu", menuRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("App working");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});
