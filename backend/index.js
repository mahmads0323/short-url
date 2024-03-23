const express = require("express");
const { urlencoded } = require("express");
const ConnectDataBase = require("./configs/dbConnect");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UrlRouter = require("./routes/url");
const UrlStatsRouter = require("./routes/urlStats");
const UserRouter = require("./routes/user");
const checkAuthentication = require("./middlewares/authentication");
const statsRouter = require("./routes/stats");
require("dotenv").config();

/** ---------- Express Initialization ------------- */
const App = express();
const PORT = process.env.PORT || 8000;
const connectionString = process.env.CONNECTION_STRING || "mongodb://localhost:27017/urlShortner";
const ORIGIN = process.env.CLIENT_URL || "http://localhost:5173";

/** ---------- Database Connection ---------------- */
ConnectDataBase(connectionString);

/** ---------- Middlewares ------------------------ */
App.use(urlencoded({ extended: false }));
App.use(express.json());
App.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
App.use(cookieParser());
// App.use(checkAuthentication("token"));

/** ---------- Routes ----------------------------- */
App.use("/url", UrlRouter);
App.use("/urlstats", UrlStatsRouter);
App.use("/user", UserRouter);
App.use("/stats", checkAuthentication("token"), statsRouter);

/** ---------- Server Listen ---------------------- */
App.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
