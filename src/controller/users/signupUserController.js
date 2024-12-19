const { signup, getAllUsers, getUser } = require("../../services/users/userServices");

const signupUserController = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Validate the required fields
        if (!email || !password) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request, Reason: Missing email or password",
                "error": null
            });
        }

        // Check if the user already exists with the provided email
        const user = await getUser({email: email});
        if (user) {
            return res.status(409).json({
                "status": 409,
                "data": null,
                "message": "Email already exists.",
                "error": null
            });
        }

        // Get all users and assign the role to the new user
        const users = await getAllUsers();
        const role = users.length === 0 ? "Admin" : "Viewer"; // Assign Admin if no users exist

        // Sign up the user
        const adminUser = await signup({ email, password, role });
        if (adminUser) {
            return res.status(201).json({
                "status": 201,
                "data": null,
                "message": "User created successfully.",
                "error": null
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error creating user/Signup", details: error?.message });
    }
};

module.exports = signupUserController;