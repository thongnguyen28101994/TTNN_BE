import { RequestHandler } from "express";
import { KhoaHocApi } from "../model/khoahoc.model.js";
import { khoa_hoc } from "../type/interface.js";

export const getListKhoaHoc:RequestHandler = async (req,res) =>{
    const data = await KhoaHocApi.getDmKhoaHoc();
    return res.status(200).json({
        message:"success",
        data,
    })
}

export const addKhoaHocList: RequestHandler = async (req, res) => {
  const data = await KhoaHocApi.addKhoaHoc(req.body as khoa_hoc[]);
  return res.status(200).json({
    message: "success",
    data,
  });
};
