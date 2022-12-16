import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth"
import subRoutes from "./routes/subs"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

const app = express();
const origin = "http://localhost:3000"

app.use(cors({ origin, credentials: true }))
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser())
dotenv.config()

// app.get의 url로 접속하면 해당 블록의 코드를 실행합니다.
app.get("/", (_, res) => res.send("running"));

// router
app.use("/api/auth", authRoutes)
app.use("/api/subs", subRoutes)

app.use(express.static("public"));

let port = 4000;

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  AppDataSource.initialize()
    .then(async () => {
      console.log("database initialized");
    })
    .catch((error) => console.log(error));
});
