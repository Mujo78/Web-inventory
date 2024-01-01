const asyncHandler = require("express-async-handler");
const { verify } = require("jsonwebtoken");

exports.authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      var payload = await verify(token, process.env.SECRET);
      req.user = payload;

      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized!");
    }
  }

  if (!token) res.status(401).json();
});
