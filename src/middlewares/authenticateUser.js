const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]
        if (!authHeader) {
            return res.status(401).json({
                "status": 401,
                "data": null,
                "message": "Unauthorized Access",
                "error": null
            })
        }

        const token = authHeader.split(' ')[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decodedData?.userId) {
            return res.status(403).json({
                "status": 403,
                "data": null,
                "message": "Forbidden Access/Operation not allowed.",
                "error": null
            })
        }

        req.user_id = decodedData?.userId;
        next()
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = authenticateUser;