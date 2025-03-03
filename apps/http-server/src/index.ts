import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Response,Request } from "express";

//routes/middleware imports
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/useRoutes";
import mapRoutes from "./routes/mapRoutes";
import spriteRoutes from './routes/spriteRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import authMiddleware from "./middlewares/authMiddleware";
import metaRoutes from "./routes/metaRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Authorization", "Content-type"],
  }),
);

//routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/messages", authMiddleware, messageRoutes);
app.use("/api/v1/maps", authMiddleware, mapRoutes);
app.use("/api/v1/sprites", authMiddleware, spriteRoutes);
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/visitedSpaces",authMiddleware,metaRoutes);
app.get("/test", (req:Request, res:Response) => {
  res.send("Test route");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
