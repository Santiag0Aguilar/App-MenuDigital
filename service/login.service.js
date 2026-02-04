import jwt from "jsonwebtoken";
import bycrpt from "bcrypt";
import { userModel } from "./../model/user.model.js";

const logearUsuario = async (body, tx) => {
  const { email, password } = body;

  const existingUser = await userModel.findByEmail(email, tx);
  if (!existingUser) throw new Error("Usuario no registrado");

  const isValid = await bycrpt.compare(password, existingUser.password);
  if (!isValid) throw new Error("Credenciales invalidas");

  const token = jwt.sign(
    { id: existingUser.id, email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  return {
    token,
    user: {
      id: existingUser.id,
      email: existingUser.email,
      loyverseKeyHash: existingUser.loyverseKeyHash,
    },
  };
};

export default logearUsuario;
