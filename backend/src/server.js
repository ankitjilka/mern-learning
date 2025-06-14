import express from "express";
import notesRoutes from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


const app = express();
const PORT = process.env.PORT

// middleware
app.use(express.json())
app.use(rateLimiter)
//explanation of middleware
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
