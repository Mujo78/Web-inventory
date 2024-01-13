const express = require("express");
const router = express.Router();
const {
  login,
  changePassword,
  resignation,
  getAllUsers,
} = require("../controllers/user-controller");
const validate = require("../middleware/validate");
const { loginUserValidator } = require("../validators/user-validator");
const { authMiddleware } = require("../middleware/auth-middleware");
const { adminCheck } = require("../middleware/admin-check");

router.get("/users", authMiddleware, getAllUsers);
router.post("/login", loginUserValidator, validate, login);
router.put("/change-password", authMiddleware, changePassword);
router.post("/resignation/:id", authMiddleware, resignation);

module.exports = router;
