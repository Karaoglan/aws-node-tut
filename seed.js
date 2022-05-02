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
        debugger;
        const characterPromises = characters.map((character, i) => {
            addOrUpdateChar({ ...character, id: i + "" });
        });
        await Promise.all(characterPromises);
    } catch (error) {
        console.log("ERR");
        console.error(error);
    }
};

module.exports = { sendData };
