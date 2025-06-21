import express from "express";
import { config } from 'dotenv';
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import { dbConnection } from "./database/dbConnection.js";
import studentRouter from "./router/studentRouter.js";
import teacherRouter from "./router/teacherRouter.js";
import assignmentRouter from "./router/assignmentRouter.js";
import announcementRouter from "./router/announcementRouter.js";
import usersRouter from "./router/usersRouter.js"
import adminRegisterRouter from "./router/adminRegisterRouter.js"
import { errorHandler } from "./middlewares/errorHandler.js";

//dbConnection()

const CONNECTION_STRING = process.env.MONGO_URL ||
"mongodb+srv://yanbocheng6940:Jdxccz159357!@cluster0.nvvbyea.mongodb.net/SCHOOL_MANAGEMENT_SYSTEM?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_STRING);

const app = express();
config({ path: "./config/config.env" });

console.log('url:',process.env.FRONTEND_URL);

app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
        //origin:'http://localhost:5173',
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}));

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/students", studentRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/assignments", assignmentRouter);

app.use("/api/v1/announcements", announcementRouter);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/register", adminRegisterRouter);

app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
});

export default app;
