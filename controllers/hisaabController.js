const hisaabModel = require("../models/hisaab");
const userModel = require("../models/user")


module.exports.hisaabCreate = async (req, res) => {
    res.render("create-hisaab")
}

module.exports.hisaabCreatePost = async (req, res) => {
    let {title, content, passcode} = req.body;

    let user = await userModel.findOne({email: req.user.email})

    const isEncrypted = req.body.isEncrypted == "on" ? true : false;
    const isEditable = req.body.isEditable == "on" ? true : false;
    const shareable = req.body.shareble == "on" ? true : false;

    let hisaab = await hisaabModel.create({
        title,
        content,
        userid: user._id,
        isEncrypted,
        isEditable,
        shareable,
        passcode
    })
    user.hisaab.push(hisaab._id);
    await user.save();
    console.log(hisaab)
    res.redirect("/profile")
}

module.exports.showHisaab = async (req, res) => {
    let user = await userModel.findOne({email: req.user.email})
    let hisaab = await hisaabModel.findOne({_id: req.params.id});

    if(!hisaab){
        return res.redirect("/profile")
    }

    if(hisaab.isEncrypted){
        return res.redirect(`/hisaab/passcode-show/${hisaab._id}`)
    }
    return res.render("show-hisaab", {user, hisaab})
}

module.exports.editHisaab = async (req, res) => {
    let user = await userModel.findOne({email: req.user.email})
    let hisaab = await hisaabModel.findOne({_id: req.params.id})
    res.render("edit-hisaab", {user, hisaab})
}

module.exports.passcodeShow = async (req, res) => {
    let user = await userModel.findOne({email: req.user.email})
    let hisaab = await hisaabModel.findOne({_id: req.params.id})

    res.render("passcode", {hisaab, user})
}

module.exports.passcode = async (req, res) => {
    let user = await userModel.findOne({email: req.user.email})
    let hisaab = await hisaabModel.findOne({_id: req.params.id})

    if(hisaab.passcode !== req.body.passcode ){
        return res.redirect("/profile")
    }

    return res.render("show-hisaab", {hisaab, user})
}




module.exports.updateHisaab = async (req, res) => {
    
    const isEncrypted = req.body.isEncrypted == "on" ? true : false;
    const isEditable = req.body.isEditable == "on" ? true : false;
    const shareable = req.body.shareble == "on" ? true : false;

    let {title, content, passcode} = req.body;
    let hisaab = await hisaabModel.findOneAndUpdate({_id: req.params.id}, {title, content, isEditable, isEncrypted, shareable, passcode}, {new: true});
    res.redirect("/profile")
}

module.exports.deleteHisaab = async(req, res) =>{
    let hisaab = await hisaabModel.findOneAndDelete({_id: req.params.id})
    res.redirect("/profile")
}