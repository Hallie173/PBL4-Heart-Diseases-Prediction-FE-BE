import dotenv from "dotenv";
dotenv.config();
import {
  createTableAccounts,
  createTableGroup_Role,
  createTableRoles,
  createTableGroups,
  createTableHealthRecord,
} from "./CreateTable.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let HOST = process.env.MONGODB_HOST;
    let PORT = process.env.MONGODB_PORT;
    let DB = process.env.MONGODB_DATABASE;
    const conn = await mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`);

    console.log(
      `MongoDB connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`
    );

    //create tables
    // createTableAccounts();
    // createTableGroups();
    // createTableRoles();
    // createTableGroup_Role();
    // createTableHealthRecord();
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDB;
