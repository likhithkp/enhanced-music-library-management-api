const { models } = require("../../../db");

async function signup(dataToInsert) {
    try {
        return await models.users.create(dataToInsert);
    } catch (error) {
        return {
            message: "Error while adding or signup.",
            error: error.message,
        };
    }
}

async function getAllUsers({ limit, offset }, role) {
    try {
        const whereClause = {};

        if (role) {
            whereClause.role = role;
        }

        const users = await models.users.findAll({
            where: whereClause,
            limit,
            offset,
            attributes: ["user_id", "email", "role", "created_at", "updated_at"],
        });

        return users;
    } catch (error) {
        return {
            message: "Error fetching users.",
            error: error.message,
        };
    }
}

async function deleteUserById(data) {
    try {
        return await models.users.destroy({
            where: data
        });
    } catch (error) {
        return {
            message: "Error while deleting user.",
            error: error.message,
        };
    }
}

async function getUser(data) {
    try {
        return await models.users.findOne({
            where: data
        });
    } catch (error) {
        return {
            message: "Error fetching user.",
            error: error.message,
        };
    }
}

async function updateUserPassword({ user_id, new_password }) {
    try {
        return await models.users.update(
            { password: new_password },
            { where: { user_id } });
    } catch (error) {
        return {
            message: "Error updating user.",
            error: error.message,
        };
    }
}

module.exports = {
    signup,
    getAllUsers,
    getUser,
    deleteUserById,
    updateUserPassword
}