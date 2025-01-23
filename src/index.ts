// imports
import dotenv from "dotenv";
import express from "express";
import { apiRouter } from "./api/apiRouter.js";
import cookiParser from "cookie-parser";
import cors from "cors";
import { prisma } from "./api/utils/prisma.js";
import { VerifyOrCreateSuperAdmin } from "./VerifyOrCreateSuperAdmin.js";
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
app.use("/api", apiRouter);

// ------------------------------------------ admin panel----------------------
// app.use("/admin", adminRouter);

// ------------------------------------------ db check----------------------
try {
    prisma.user.count();
    console.log("db connected ...");
} catch (error) {
    throw Error(error);
}

VerifyOrCreateSuperAdmin()

// ------------------------------------------ Server Start ----------------------
app.listen(PORT, () => {
    console.log("Server is Started on port " + PORT);
});

