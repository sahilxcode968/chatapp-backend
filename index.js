import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js"
import { app, server } from "./socket/socket.js"

const port=process.env.PORT || 3000


// CORS configuration for both development and production
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://chattapp-frontend.vercel.app",
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Origin",
        "X-Requested-With", 
        "Content-Type",
        "Accept",
        "Authorization",
        "Cache-Control",
    ]
}))

app.use(express.json({ limit: "10mb" }))
app.use(cookieParser())

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ 
        status: "OK", 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development"
    })
})

// Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/message", messageRouter)



server.listen(port,()=>{
    connectDb()
    console.log("server started")
})