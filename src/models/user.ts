import { Schema, ObjectId } from "mongoose";
import db from "../database";

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

export interface PublicUser {
  _id: string;
  name: string;
  email: string;
}

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
});

export const UserModel = db.model("User", UserSchema);
