import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

const startServer = async () => {
  try {
    await connectDB(); // ✅ Properly awaited

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Routes
    app.get("/", (req, res) => {
      res.send("API is working");
    });
    app.use("/api/admin", adminRouter);
    app.use("/api/blog", blogRouter);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err.message);
    process.exit(1);
  }
};

startServer(); // ✅ async IIFE to run main code

export default app;
