const Users = require("../src/utils/users");


const testUsers = [
    {
        name: "Test 1",
        room: "browser",
        id: 1
    },
    {
        name: "Test 2",
        room: "browser",
        id: 2
    },
    {
        name: "Test 3",
        room: "browser",
        id: 3
    },
    {
        name: "Test 4",
        room: "app",
        id: 2
    },
    {
        name: "Test 5",
        room: "app",
        id: 3
    }
];

beforeEach(() => {
    Users.clearAll();
    testUsers.forEach(oneUser => {
        Users.addUser(oneUser);
    });
});

test("should clear users", () => {
    expect(Users.getAllUsers().length).not.toEqual(0);
    Users.clearAll();
    expect(Users.getAllUsers().length).toEqual(0);
});

test("should change to lowercase", () => {
    expect(Users.getUser(10)).toBeUndefined();
    const testUser = {
        name: "Delete 1",
        room: "browser",
        id: 10
    }
    Users.addUser(testUser);
    expect(Users.getUser(10).name).toEqual(testUser.name.toLowerCase());
});

test("Do not save use with same name and room", () => {
    const testUser = {
        name: "Test 4",
        room: "app",
        id: 10
    }
    expect(Users.addUser(testUser)).toBeUndefined();
});

test("Save user with same name but different room", () => {
    const testUser = {
        name: "Test 4",
        room: "browser",
        id: 10
    }
    expect(Users.addUser(testUser)).not.toBeUndefined();
})

test("Should add user", () => {
    expect(Users.getUser(10)).toBeUndefined();
    const testUser = {
        name: "Delete 1",
        room: "browser",
        id: 10
    }
    expect(Users.getUser(10)).not.toBeNull();
});

test("Should add user and delete", () => {
    const testUser = {
        name: "Delete 1",
        room: "browser",
        id: 10
    }
    Users.addUser(testUser);
    expect(Users.getUser(10)).not.toBeUndefined();
    Users.removeUser(10);
    expect(Users.getUser(10)).toBeUndefined();
});

test("Should remove existent user", () => {
    expect(Users.getUser(2)).not.toBeUndefined();
    Users.removeUser(2);
    expect(Users.getUser(2)).toBeUndefined();
})

test("Should get all room users", () => {
    expect(Users.getUsersInRoom("browser").length).toEqual(3);
    expect(Users.getUsersInRoom("app").length).toEqual(2);
})