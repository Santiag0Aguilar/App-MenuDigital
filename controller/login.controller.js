import logearUsuario from "./../service/login.service.js";

const logear = async (req, res) => {
  try {
    const user = await logearUsuario(req.body);
    res.status(200).json({
      accessToken: user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export default logear;
