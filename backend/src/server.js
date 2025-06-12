import express from "express";
import notesRoutes from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT

connectDB();

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log("we just get a new request");
    next();
})

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
    console.log("server started on port:", PORT);
});

