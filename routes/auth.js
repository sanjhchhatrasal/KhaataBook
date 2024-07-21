const express = require("express");
const { registerUser, loginUser, profile, registerUserPage, loginUserPage, logoutUser, hisaabCreate } = require("../controllers/authController");
const router = express.Router();
const {isLoggedIn} = require("../middlewares/isLoggedIn")

router.get("/", registerUserPage);
router.post("/register", registerUser);

router.get("/login", loginUserPage);
router.post("/login", loginUser);

router.get("/profile", isLoggedIn,  profile);

router.get("/logout", logoutUser);


module.exports = router;