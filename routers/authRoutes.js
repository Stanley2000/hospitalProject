const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/createStaff", authController.createStaff);

module.exports = router;
