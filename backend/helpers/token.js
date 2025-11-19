const jwt = require("jsonwebtoken");

module.exports = {
    verify: (token) => {
        return jwt.verify(token, process.env.JWT_SECRET);
    },
    generate: (data) => {
        return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '30d'})
    }
}