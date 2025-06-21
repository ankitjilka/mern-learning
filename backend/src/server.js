import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT 

// middleware
app.use(express.json())
app.use(rateLimiter)
app.use(cors({
  origin: "http://localhost:5173",
}))
// explanation of middleware
// app.use((req, res, next) => {
//     console.log(`Request method is ${req.method} && REQUEST url is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
app.listen(PORT, () => {
    console.log("server started on port:", PORT);
  });
});
