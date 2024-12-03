import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import whishlistRoutes from "./routes/whishlist.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import { connectToDb } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json()); //allows you to parse the body of the request

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/whishlist", whishlistRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT,() => {
  console.log(`server is running on ${PORT}`);
  connectToDb();
})
