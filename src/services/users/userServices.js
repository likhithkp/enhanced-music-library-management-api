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

async function getAllUsers() {
    try {
        return await models.users.findAll();
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