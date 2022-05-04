const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS,
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

const addOrUpdateChar = async (character) => {
    debugger;
    const param = {
        TableName: TABLE_NAME,
        Item: character,
    };
    return await dynamoClient.put(param).promise();
};

module.exports = {
    dynamoClient,
    getCharacters,
    addOrUpdateChar,
};
