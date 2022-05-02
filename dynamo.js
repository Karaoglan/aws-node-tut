const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE_NAME = "mockapi";
const dynamoClient = new AWS.DynamoDB.DocumentClient();

const getCharacters = async () => {
    const params = {
        TableName: TABLE_NAME,
        ScanIndexForward: false,
    };

    const characters = await dynamoClient.scan(params).promise();
    console.log(characters);
    return characters;
};

const addOrUpdateChar = (character) => {
    const param = {
        TableName: TABLE_NAME,
        Item: character,
    };
    return dynamoClient.put(param).promise();
};

module.exports = {
    dynamoClient,
    getCharacters,
    addOrUpdateChar,
};
