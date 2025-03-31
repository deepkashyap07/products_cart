import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.config.js";
import productRoutes from "./routes/product.routes.js"; // Assuming you have a Product model defined

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies and allows us to access req.body

// Routes
app.use("/api/products", productRoutes); // Use the product routes

const __dirname = path.resolve(); // Get the current directory name
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/dist"))); // Serve static files from the React frontend app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/dist/index.html")); // Serve index.html for all other routes
  });
}

// Start the server
app.listen(PORT, () => {
  connectDB(); // Connect to MongoDB
  console.log(`Server is running on http://localhost:${PORT}`);
});
