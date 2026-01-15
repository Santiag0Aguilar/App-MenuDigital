import registerUser from "./../service/auth.service.js";

const registro = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const porfile = (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
  });
};
export default registro;
