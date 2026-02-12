import express from "express";
import userRoutes from "./routes/usuario.routes.js";
import authRoutes from "./routes/auth.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import publicMenuRoutes from "./routes/publicMenu.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/usuarios", userRoutes);
app.use("/auth", authRoutes);
app.use("/menu", menuRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/api", publicMenuRoutes);
app.use("/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("App working");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});
