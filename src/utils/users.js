let users = [];

const safeName = (testName) => {
    if (testName == null || testName.trim().length === 0) {
        return false;
    }
    return testName.trim().toLowerCase();
}

const userExist = (username, room) => {
    return users.find(oneUser => oneUser.name === username && oneUser.room === room);
}

const addUser = (newUser) => {
    if (newUser == null || newUser.name == null || newUser.room == null) {
        return ;
    }
    newUser.name = safeName(newUser.name);
    newUser.room = safeName(newUser.room);
    if (userExist(newUser.name, newUser.room)) {
        return ;
    }
    users.push(newUser);
    return newUser;
}

const clearAll = () => {
    users = [];
}

const removeUser = (id) => {
    const userToDelete = getUser(id);
    if (userToDelete == null) {
        return ;
    }
    users = users.filter(oneUser => oneUser.id !== id);
    return userToDelete;
}

const getUser = (id) => {
    return users.find(oneUser => oneUser.id === id);
}

const getUsersInRoom = (room) => {
    return users.filter(oneUser => oneUser.room === room);
}

const getAllUsers = () => {
    return users;
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    clearAll,
    getAllUsers
}