const { v4 } = require("uuid")
const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs")

const registerUser = async (event) => {

    const userData = JSON.parse(event.body) 
    const createdAt = new Date().toISOString();
    const newUserId = v4();
    var salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(userData.password, salt);
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const newUser = {
        id: newUserId,
        email: userData.email,
        password: hashedPassword,
        createdAt: createdAt,
        role: 'user'
    };
    await dynamodb.put({
        TableName: 'usersTable',
        Item: newUser
    }).promise()
    return {
        statusCode: 200,
        body: JSON.stringify(
        {
            message: "User Registered!",
            input: event,
        },
        null,
        2
        ),
    };
};

module.exports = {
  handler: registerUser
}