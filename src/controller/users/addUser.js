const { getUser, signup } = require("../../services/users/userServices");

const addUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request, Reason:${Missing email, password or role}",
                "error": null
            })
        }

        const user = await getUser({email: email});
        if (user) {
            return res.status(409).json({
                "status": 409,
                "data": null,
                "message": null,
                "error": "Email already exists."
            })
        }

        const newUser = await signup({ email, password, role });
        if (newUser) {
            return res.status(201).json({
                "status": 201,
                "data": null,
                "message": "User created successfully.",
                "error": null
            })
        }
    }
    catch (error) {
        throw new Error(error)
    }
}

module.exports = addUser;