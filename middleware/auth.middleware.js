import jwt from "jsonwebtoken";

const authMiddelware = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Por favor inicie sesion primero.",
    });
  }

  const token = authToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      slug: decoded.slug,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token no valido",
    });
  }
};

export default authMiddelware;
