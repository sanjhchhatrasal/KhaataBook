const express = require("express");
const { hisaabCreate, hisaabCreatePost, showHisaab, editHisaab, updateHisaab, deleteHisaab, passcode, passcodeShow } = require("../controllers/hisaabController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = express.Router();

router.get("/", hisaabCreate);

router.post("/", isLoggedIn,  hisaabCreatePost);

router.get("/show/:id", isLoggedIn,  showHisaab);

router.get("/edit/:id", isLoggedIn,  editHisaab);

router.get("/passcode-show/:id", isLoggedIn, passcodeShow );

 router.post("/passcode/:id", isLoggedIn, passcode);

router.post("/update/:id", isLoggedIn, updateHisaab);

router.get("/delete/:id", isLoggedIn,  deleteHisaab)

module.exports = router;
