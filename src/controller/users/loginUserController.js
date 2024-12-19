const { getUser } = require("../../services/users/userServices");
const jwt = require("jsonwebtoken");

const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request, Reason:${Missing email or password}",
                "error": null
            })
        }

        const user = await getUser({email: email});
        if (user && user?.password === password) {
            const token = jwt.sign({ email: user?.email, userId: user?.user_id }, process.env.JWT_SECRET_KEY)
            return res.status(200).json({
                "status": 200,
                "data": {
                    "token": token
                },
                "message": "Login successful.",
                "error": null
            })
        }

        if (!user) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "User not found.",
                "error": null
            })
        }
    } catch (error) {
        res.status(500).json({ error: "Error logging in", details: error?.message });
    }
}

module.exports = loginUserController;