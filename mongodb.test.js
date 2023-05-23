const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(
      "mongodb+srv://test:DUdBmByvxw7jgdD2@test-db.cbvolae.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    db = await connection.db("test-db");
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should insert a doc into collection", async () => {
    const users = db.collection("users");
    const userId = uuidv4()
    const userName = `John_${userId}`

    const mockUser = { _id: userId, name:  userName};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: userId });
    expect(insertedUser).toEqual(mockUser);
  });
});
