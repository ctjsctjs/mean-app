const jwt = require("jsonwebtoken");
const JWT_TOKEN = "lean_mean_fighting_machine";

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, JWT_TOKEN);
        next();
    } catch (err) {
        res.status(401).json({
            message: "Authentication failed!!",
            reason: err
        });
    }
};