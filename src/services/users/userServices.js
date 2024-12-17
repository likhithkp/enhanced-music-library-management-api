const { models } = require("../../../db");

async function signup(dataToInsert) {
    try {
        return await models.users.create(dataToInsert);
    } catch (error) {
        throw new Error("Error creating user", error.message);
    }
}

async function getAllUsers() {
    try {
        return await models.users.findAll();
    } catch (error) {
        throw new Error("Error fetching users", error.message);
    }
}

async function deleteUserById(data) {
    try {
        return await models.users.destroy({
            where: data
        });
    } catch (error) {
        throw new Error('Error while deleting user:', error.message);
    }
}

async function getUser(data) {
    try {
        return await models.users.findOne({
            where: data
        });
    } catch (error) {
        throw new Error("Error fetching user", error.message);
    }
}

module.exports = {
    signup,
    getAllUsers,
    getUser,
    deleteUserById
}