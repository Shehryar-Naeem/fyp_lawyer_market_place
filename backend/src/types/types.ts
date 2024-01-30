import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";

type avatar = {
  public_id: string;
  url: string;
};
export interface IUser {
  // _id: string;
  name: string;
  email: string;
  password: string;
  avatar: avatar;
  
  role: "client" | "lawyer" | "admin";
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}
export interface ILawyer {
  user:ObjectId,
  designation: string;
  experience: number;
  education: string;
  phone: number;
  yourSelf: string;
  address: string;
  documents: avatar[];
  gender: "male" | "female";
  dob: Date;
  cnic:number;
  age: number;
}
export interface IClient {
  user:ObjectId, 
  phone: number;
  yourSelf: string;
  address: string;
  documents: avatar[];
  gender: "male" | "female";
  cnic:number;
  age: number;
}


export interface NewUserRequestBody {
  name: string;
  email: string;
  password: string;
  role?: "user" | "lawyer" | "admin";
}
export type ControllerFunc = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
