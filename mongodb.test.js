const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

// MongoDB connection URI
const uri = "mongodb+srv://test:DUdBmByvxw7jgdD2@test-db.cbvolae.mongodb.net/";

// Jest test suite
describe("MongoDB Tests", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("test-db");
  });

  afterAll(async () => {
    await connection.close();
  });

  const userId = uuidv4();

  it("should insert a new user", async () => {
    const collection = db.collection("users");
    const newUser = {
      _id: userId,
      name: "John Doe",
      email: "john@example.com",
    };

    await collection.insertOne(newUser);

    const filter = { _id: userId };
    const insertedUser = await collection.findOne(filter);
    expect(insertedUser).toEqual(newUser);
  });

  it("should retrieve all users", async () => {
    const collection = db.collection("users");
    const users = await collection.find({}).toArray();
    expect(users).toHaveLength(2); // Assuming there are 2 users in the "users" collection
  });

  it("should update an existing user", async () => {
    const collection = db.collection("users");
    const filter = { _id: userId };
    const update = { $set: { email: "john.doe@example.com" } };
    const result = await collection.updateOne(filter, update);
    expect(result.modifiedCount).toBe(1);
  });

  it("should delete a user", async () => {
    const collection = db.collection("users");
    const filter = { _id: userId };
    const result = await collection.deleteOne(filter);
    expect(result.deletedCount).toBe(1);
  });
});
