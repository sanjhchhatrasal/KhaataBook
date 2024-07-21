
const jwt = require("jsonwebtoken");

const tokenGenerator = (data) => {
    return jwt.sign(data, process.env.SECRET_JWT)
}
module.exports = tokenGenerator;