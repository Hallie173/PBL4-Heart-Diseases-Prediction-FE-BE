"use strict";
import dotenv from "dotenv";
dotenv.config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const basename = path.basename(__filename);
const db = {};

// Kết nối với MongoDB
let HOST = process.env.MONGODB_HOST;
let PORT = process.env.MONGODB_PORT;
let DB = process.env.MONGODB_DATABASE;

mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`);

const connection = mongoose.connection;

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

connection.once("open", () => {
  console.log("Connected to MongoDB successfully");
});

// Load tất cả các model từ thư mục hiện tại
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
  });

db.mongoose = mongoose;
db.connection = connection;

export default db;
