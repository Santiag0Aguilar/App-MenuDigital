import { getMe } from "../service/auth.service.js";

export const me = async (req, res) => {
  console.log("BODY:", req.body);

  try {
    const user = await getMe(req.user.id);
    if (!user) throw new Error("Usuario no encontrado");
    res.status(200).json({
      user,
    });

    return user;
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
