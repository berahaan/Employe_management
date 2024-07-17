// server.js
import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import router from "./Routes.js";
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: "birhan_kabtamu",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/Interniship_task",
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
    },
  })
);

app.use(router);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
