const express = require("express");
const router = express.Router();
const { getRoles, addRole } = require("../controllers/role-controller");

router.post("/", addRole);
router.get("/", getRoles);

module.exports = router;
