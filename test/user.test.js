const testDb = require('./testDb');
const userModel = require("../model/user");
const supertest = require("supertest");
const app = require("../server")


const userdata = {
    first_name: "testuser",
    last_name: "dummy",
    email: "testuser@mail.com",
    password: "password1"
}

describe('save-user', () => {
    let connection;
   

    beforeAll(async () => {
        connection = testDb.connectDB()
    });

    afterAll(async () => {
        await testDb.dropDB()
    })

    afterEach(async () => {
        await testDb.dropCollections()
    });

    it("should signup a user",  async () => {
        const response = await supertest(app)
        .post("api/signup")
        .send(userdata)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("user")
        expect(response.body.user).toHaveProperty("first_name", "testuser")
        expect(response.body.user).toHaveProperty("last_name", "dummy")
        expect(response.body.user).toHaveProperty("email", "testuser@mail.com")
        expect(Object.keys(response.body.user)).not.toContain("password")
        expect('Content-Type', /application\/json/)
    });
})