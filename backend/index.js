import express from "express";

import eventRouter from "./routes/events.js"

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/events", eventRouter);

const server = app.listen(PORT, () => {
    console.log("App started on port " + PORT)
});

server.on("error", (error) => {
    console.log(error);
});
