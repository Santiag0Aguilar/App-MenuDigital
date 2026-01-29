import jwt from "jsonwebtoken";

const authMiddelware = (req, res, next) => {
  const authToken = req.headers.authorization;

  /* StartsWith es un metodo para strings de express que busca derminados caracteres y retorna true o false en este caso buscamos que se contenga un token */
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Por favor inicie sesion primero.",
    });
  }

  /* Split es otro metodo para strings de express donde en el ("") especificamos que queremos si es ("") es por letra/caracter si es (" ") por palabra 
    COmo en este caso se recibe algo como Bearer 8bb9a96e8cd5452daad805a6f79ece99
    Bearer = [0]
    8bb9a96e8cd5452daad805a6f79ece99 = [1]

    Recuerda que los strings son como un tipo de array
  */
  const token = authToken.split(" ")[1];

  try {
    // Decodificamos el token que se esta mandando en los headers de la peticion y verificamos con nuestro secret key, si es valido pasamos a interactuar con el controller
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token no valido",
    });
  }
};

export default authMiddelware;
