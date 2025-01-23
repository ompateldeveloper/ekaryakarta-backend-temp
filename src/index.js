// imports
import dotenv from "dotenv";
import express from "express";
import { mainRouter } from "./api/mainRouter.js";
import cookiParser from "cookie-parser";
import cors from "cors";
// variables
dotenv.config();
const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DBURL || "";
const SECRET = process.env.SECRET || "";

const app = express();
app.use(express.json());
app.use(cookiParser());
app.use(
    cors({
        // origin: "*",
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.get("/", (req, res) => {
    res.send("Welcome to Clean Express 🚅...");
});
app.use("/api", mainRouter);

// ------------------------------------------ admin panel----------------------

app.listen(PORT, () => {
    console.log("Server is Started on port " + PORT);
});
