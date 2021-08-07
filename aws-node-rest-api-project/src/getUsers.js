const AWS = require('aws-sdk');

const getUsers = async(event) =>{

    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    
    let fetchUsers;
    try{
        const results = await dynamoDB.scan({ TableName: "usersTable"}).promise()
        fetchUsers= results.I
    }catch(error){
        console.log(error)
    }
    return {
        statusCode: 200,
        body: JSON.stringify(getUsers)
    };
};

module.exports = {
    handler: getUsers
}