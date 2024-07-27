let userModel = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/tokenGenerator");


module.exports.registerUserPage = async (req, res) => {
    res.render("register")
}

module.exports.registerUser = async (req, res) => {
  try{
    let {email, username, fullname, password} = req.body;

    let user = await userModel.findOne({email});
    if(user){
       return res.render("/login")
    }

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    user = await userModel.create({
        username,
        fullname,
        email,
        password: hash
    })
    let token = generateToken({email});
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge : 30 * 24 * 60 * 60 *1000
    })
    res.redirect("/profile")
  } catch (error){
    console.log(error);
    res.status(500).send("Server Error")
  }
}

module.exports.loginUserPage = async (req, res) => {
    res.render("login")
}

module.exports.loginUser = async (req, res) => {
   try{
    let {email, password} = req.body;
    let user = await userModel.findOne({email})
    if(!user){
        return res.redirect("/")
    }

   let securePassword =  bcrypt.compare(password, user.password);
   if(securePassword){
    let token = generateToken({email});
    res.cookie("token", token, {
        httpOnly: true,
        secure: true
    })
    res.redirect("/profile");
   } else{
    res.redirect("/login")
   }
   } catch (error){
    console.log(error);
    res.status(500).send("Server Error")
  }
}

module.exports.profile = async (req, res) => {

  try{
    let byDate = Number(req.query.bydate);
    let {startDate, endDate} = req.query;

    byDate = byDate ? byDate : 1;
    startDate = startDate ? startDate : new Date("1970-01-01");
    endDate = endDate ? endDate : new Date();

    let user = await userModel.findOne({email: req.user.email}).populate({
        path: "hisaab",
        match: { createdAt: { $gte: startDate, $lte: endDate }},
        options: { sort: { createdAt: byDate }}
    })
    res.render("profile", {user})
  } catch (error){
    console.log(error);
    res.status(500).send("Server Error")
  }
}

module.exports.logoutUser = async (req, res) => {
   try{
    res.cookie("token", "");
    res.redirect("/login");
   } catch (error){
    console.log(error);
    res.status(500).send("Server Error")
  }
}

