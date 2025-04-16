import { RequestHandler } from "express";
import Jwt, { Secret } from "jsonwebtoken";
import { Sys_User } from "../type/interface";

const checkAuth: RequestHandler = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    let token: string | undefined =
      authorization && authorization.replace("Bearer", "").trim();
    if (!token) throw new Error("Token không hợp lệ");
    const verifyToken = Jwt.verify(
      token,
      process.env.SECRET_KEY as Secret
    ) as Sys_User;
    if (!verifyToken) throw new Error("Token đã hết hạn");
    next();
  } catch (err:any) {
    res.status(401).send({ message: err.message, data: null });
  }
};

export default checkAuth;
