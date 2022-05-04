const express = require("express");
const { getCharacters } = require("./dynamo");
const { sendData } = require("./seed");
const app = express();

app.get("/", (req, res) => {
    res.send("hello");
});

app.get("/characters", async (req, res) => {
    try {
        const characters = await getCharacters();
        res.json(characters);
    } catch (error) {
        console.log("ERR chars");
        console.error(error);
        res.status(500).send("could not retrieve characters");
    }
});

app.get("/seed", async (req, res) => {
    try {
        await sendData();
        res.send("finished");
    } catch (error) {
        console.log("ERR chars");
        console.error(error);
        res.status(500).send("could not append characters");
    }
});

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
