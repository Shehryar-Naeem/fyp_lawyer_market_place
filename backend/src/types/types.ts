import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import mongoose, { Document, ObjectId, Types } from "mongoose";

type avatar = {
  public_id: ObjectId;
  url: string;
};
export interface IRoles  {
  _id:  mongoose.Types.ObjectId;
  roleType: "client" | "lawyer" | "admin";
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  city?: string;
  postalCode?: number;
  avatar: avatar;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  yourSelf?: string;
  roles: IRoles[];
  gender: "male" | "female";
  dob?: Date;
  age?: number;
  getJWTToken: () => string;
  comparePassword: (password: string) => Promise<boolean>;
}
export interface ILawyer {
  user: ObjectId;
  designation: string;
  experience: number;
  education: string;
  phone: number;
  yourSelf: string;
  address: string;
  documents: avatar[];
  gender: "male" | "female";
  dob: Date;
  cnic: number;
  age: number;
}
export interface IClient {
  user: ObjectId;
  phone: number;
  yourSelf: string;
  address: string;
  documents: avatar[];
  gender: "male" | "female";
  cnic: number;
  age: number;
}
export interface IRole {
  roleName: "client" | "lawyer" | "admin";
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

export type CombinedType = Document<unknown, {}, IUser> &
  IUser & {
    _id: Types.ObjectId;
  };

export interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}
export interface IUpdateUser {
  _id?: string;
  name?: string;
  email?: string;
  role?: "client" | "lawyer" | "admin";
  avatar?: avatar;
}

export interface updateAuthenticatedRequest extends Request {
  user?: IUpdateUser | null;
}

export interface DecodedJwtPayload extends JwtPayload {
  id: string;
}
