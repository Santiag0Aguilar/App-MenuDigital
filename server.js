import express from "express";
import userRoutes from "./routes/usuario.routes.js";
import authRoutes from "./routes/auth.routes.js";
import menuRoutes from "./routes/menu.routes.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use("/usuarios", userRoutes);
app.use("/auth", authRoutes);
app.use("/menu", menuRoutes);

app.get("/", (req, res) => {
  res.send("App working");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});
