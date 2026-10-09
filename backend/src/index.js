import dotenv from "dotenv"
import express from "express"
import connectDB from "./config/database.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin:true, credential:true,
}));

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1);
})

// Import routes
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js"
import applyJobRoutes from "./routes/applyJobRouters.js"
app.use("/user", userRoutes);
app.use("/job",jobRoutes)
app.use("/application",applyJobRoutes)
app.get("/", (req, res) => {
    res.json({ message: "Hello, World!" });
});
