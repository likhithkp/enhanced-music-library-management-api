const jwt = require("jsonwebtoken");
const { getUser } = require("../services/users/userServices");

const authenticateAdmin = async (req, res, next) => {
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
        if (decodedData) {
            const user = await getUser({email: decodedData?.email});
            if (user.role !== 'Admin') {
                return res.status(403).json({
                    "status": 403,
                    "data": null,
                    "message": "Forbidden Access/Operation not allowed.",
                    "error": null
                })
            }
        }
        next()
    } catch (error) {
        res.status(500).json({
            "status": 500,
            "message": `Error: ${error.message}`,
        })
        throw new Error(error)
    }
}

module.exports = authenticateAdmin;