const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("./public"))

const PORT = 3001;

const container = []

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/tacoshop', (req, res) => {
    res.json(container);
});

app.post("/tacoshop", (req, res) => {
    container.push(req.body)
    res.json(container);
});

app.delete("/tacoshop/:id", (req, res) => {
    console.log("*****",req.params.id);
    container.splice(req.params.id, 1);
    console.log("*****",container);

    res.json(container);
});


app.listen(PORT, () => {
    console.log(`Listening on ${PORT} ...`)
});
