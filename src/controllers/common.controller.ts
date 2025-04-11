/**
 * CommonAPI
 */

import { RequestHandler } from "express";
import { CommonApi } from "../model/common.model.js";

export const  GetDmHuyen:RequestHandler = async (req,res,next)=>{
    /**
     * Danh mục huyện
     */
    const data = await CommonApi.getDMDistrict();
        return res.status(200).json({
            message:"Success",
            data
        })
}

export const GetDm_DiaChiBoiDuong:RequestHandler = async (req,res,next)=>{
    /**
     * Danh mục Địa chỉ bồi dưỡng
     */
    const data = await CommonApi.getDM_DiaChiBoiDuong();
        return res.status(200).json({
            message:"Success",
            data
        })
    
}

export const  GetDmTruong:RequestHandler = async (req,res,next)=>{
    /**
     * Danh mục trường
     */
    const {pgdId}= req.params;
    const data = await CommonApi.getDmTruong(pgdId as unknown as number);
    return res.status(200).json({
        message:"Success",
        data
    })
}


export const  GetThongTinTruong:RequestHandler = async (req,res,next)=>{
    /**
     * Thông tin trường
     */
    const {schoolId}= req.params;
    const data = await CommonApi.getSchoolInfoBySchoolId(schoolId as unknown as string);
    return res.status(200).json({
        message:"Success",
        data
    })
}

export const  getDm_HinhThucDangKy:RequestHandler = async (req,res,next)=>{
    /**
     * Danh mục hình thức đăng ký
     */
    const data = await CommonApi.getDm_HinhThucDangKy();
        return res.status(200).json({
            message:"Success",
            data
        })
}






