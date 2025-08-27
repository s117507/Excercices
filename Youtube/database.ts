import { Collection, MongoClient, ObjectId, SortDirection } from "mongodb";
import dotenv from "dotenv"
import { User, Video } from "./interfaces";
dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
export const client = new MongoClient(MONGODB_URI);