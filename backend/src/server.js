import express from "express";
import notesRoutes from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT

connectDB();
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
    console.log("server started on port:", PORT);

});

