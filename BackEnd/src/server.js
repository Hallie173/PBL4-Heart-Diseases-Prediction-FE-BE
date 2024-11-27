import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import configViewEngine from "./Config/viewEngine.js";
import configCORS from "./Middleware/CORS.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
//import webRouter from "./Routes/Web.js";
import connectDB from "./Models/ConnectDB.js";
import initApiRoutes from "./Routes/Api.js";

const app = express();
const port = process.env.PORT || 3001;

// config template engine
configViewEngine(app);

// config CORS
configCORS(app);

// config CORS
app.use(cookieParser());

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect DB
connectDB();

// init wed routes
initApiRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
