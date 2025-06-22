import express from "express";
import { config } from 'dotenv';
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import studentRouter from "./router/studentRouter.js";
import teacherRouter from "./router/teacherRouter.js";
import assignmentRouter from "./router/assignmentRouter.js";
import announcementRouter from "./router/announcementRouter.js";
import usersRouter from "./router/usersRouter.js"
import adminRegisterRouter from "./router/adminRegisterRouter.js"
import { errorHandler } from "./middlewares/errorHandler.js";
import { Teacher } from "./models/teacherSchema.js";

const CONNECTION_STRING = process.env.MONGO_URL ||
    "mongodb+srv://yanbocheng6940:Jdxccz159357!@cluster0.nvvbyea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const app = express();
config({ path: "./config/config.env" });

app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
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
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

app.use(express.urlencoded({ extended: true }));

app.get('/test-conn', async (req, res) => {

    console.log('url:', process.env.FRONTEND_URL);
    console.log("Connected DB host:", mongoose.connection.host);
    console.log("Connected DB name:", mongoose.connection.name);

    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        res.json({
            connectedDb: mongoose.connection.name,
            collections: collections.map(c => c.name)
        });
    } catch (err) {
        res.status(500).json({ message: "Test connection failed", error: err.message });
    }
});
/*
app.get('/test-teachers', async (req, res) => {
    try {
        const teachers = await mongoose.connection.db.collection('teachers').find().toArray();
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ message: 'Query failed', error: err.message });
    }
});

app.get('/insert-test-teacher', async (req, res) => {
    try {
        const teacher = await Teacher.create({
            name: "Test Teacher",
            email: "test@example.com",
            subject: "Math",
            phone: "123456789"
        });
        res.json(teacher);
    } catch (err) {
        res.status(500).json({ message: 'Insert failed', error: err.message });
    }
});
*/
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
