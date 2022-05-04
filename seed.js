const axios = require("axios");
const { addOrUpdateChar } = require("./dynamo");

const characterNew = {
    id: "5",
    createdAt: "2021-05-01",
    name: "new name5",
};

const sendData = async () => {
    try {
        const { data: characters } = await axios.get(process.env.API);
        console.log(characters);
        const characterPromises = characters.map((character, i) => {
            addOrUpdateChar({ ...character, id: i + "" });
        });
        return await Promise.all(characterPromises);
    } catch (error) {
        console.log("ERR");
        console.error(error);
    }
};

module.exports = { sendData };
