const { getUser, signup, getAllUsers } = require("../../services/users/userServices");

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

        const user = await getUser({ email: email });
        if (user) {
            return res.status(409).json({
                "status": 409,
                "data": null,
                "message": null,
                "error": "Email already exists."
            })
        }

        const users = await getAllUsers({ limit: 100, offset: 0 });
        const existingAdmin = users && users?.find(user => user?.role === 'Admin');

        if (existingAdmin !== undefined && role === 'Admin') {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Bad Request, Admin already exists",
                error: null,
            });
        }

        const newUser = await signup({ email, password, role });
        if (!newUser.error) {
            return res.status(201).json({
                "status": 201,
                "data": null,
                "message": "User created successfully.",
                "error": null
            });
        } else {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error adding user", details: error?.message });
    }
}

module.exports = addUser;