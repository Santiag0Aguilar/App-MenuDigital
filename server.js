/* AQUI INICIALIZAMOS EL SERVIDOR */
import express from "express";
import UserRoutes from "./routes/usuario.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use("/usuarios", UserRoutes);

app.get("/", (req, res) => {
  res.send("App working");
});

app.listen(3000, () => {
  console.log(`Servidor corriendo en puerto ${3000}`);
});
