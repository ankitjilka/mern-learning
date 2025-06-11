const express = require("express");


const app = express();

app.get("/api/notes", (req,ankit) => {
    ankit.status(400).json({ message: "you got 500dsd notes" });
});

app.listen(5001, () => {
    console.log("server started on port: 5001");

});