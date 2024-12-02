import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import { connectToDb } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json()); //allows you to parse the body of the request

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.listen(PORT,() => {
  console.log(`server is running on ${PORT}`);
  connectToDb();
})
