/* VALIDAR QUE LA CONTRA SEA CORRECTA y ACORDE AL CORREO SANITIZAR CAMPOS */
import jwt from "jsonwebtoken";
import bycrpt from "bcrypt";
import { userModel } from "./../model/user.model.js";

const logearUsuario = async (body) => {
  const { email, password } = body;
  console.log(typeof email);
  /* Revisamos en la consulta si el usuario existe, findbyemail retorna el usuario en object o null */
  const existingUser = await userModel.findByEmail(email);
  if (existingUser === null) {
    throw new Error("Usuario no registrado");
  }

  const isValid = await bycrpt.compare(password, existingUser.password);
  if (!isValid) {
    throw new Error("Credenciales invalidas");
  }

  /* Si se paso todas la validaciones  */

  return jwt.sign(
    {
      id: existingUser.id,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

export default logearUsuario;
