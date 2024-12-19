const logoutUser = (req, res) => {
    return res.status(200).json({
        "status": 200,
        "data": null,
        "message": "User logged out successfully.",
        "error": null
    });
}

module.exports = logoutUser;
