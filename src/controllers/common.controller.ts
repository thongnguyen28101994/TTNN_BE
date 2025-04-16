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

export const  GetDmCapTruong:RequestHandler = async (req,res,next)=>{
    /**
     * Danh mục cấp trường
     */
    const data = await CommonApi.getCapTruong();
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
    const {capTruongId,huyenId}= req.params;
    const data = await CommonApi.getDmTruongByCapTruongAndQuanHuyen(capTruongId as unknown as number,huyenId as unknown as number);
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

export const  getDMThoiGianHoc:RequestHandler = async (req,res,next)=>{
    /**
     * Danh mục thời gian học
     */
    const data = await CommonApi.getDMThoiGianHoc();
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






