import { RequestHandler } from "express";
import { KhoaHocApi } from "../model/khoahoc.model";
import { khoa_hoc } from "../type/interface";

export const getListKhoaHoc:RequestHandler = async (req,res) =>{
    const data = await KhoaHocApi.getDmKhoaHoc();
     res.status(200).json({
        message:"success",
        data,
    })
}

export const getListKhoaHocBySchoolId:RequestHandler = async (req,res) =>{
  const {ma_truong}= req.params;
  const data = await KhoaHocApi.getDmKhoaHocBySchoolId(ma_truong);
   res.status(200).json({
      message:"success",
      data,
  })
}

export const addKhoaHocList: RequestHandler = async (req, res) => {
  const data = await KhoaHocApi.addKhoaHoc(req.body as khoa_hoc[]);
   res.status(200).json({
    message: "success",
    data,
  });
};
