import { RequestHandler } from "express";
import { KhoaHocApi } from "../model/khoahoc.model";
import { khoa_hoc } from "../type/interface";
import {
  KhoaHocLichThiRepository,
  KhoaHocRepository,
} from "../repositories/khoahoc_Repository";
import { Khoa_hoc, Khoa_Hoc_Lich_Thi } from "../entities/khoa_hoc";
import { KhoaHoc_LichThiServices } from "../services/khoa_hoc.service";
import Joi from "joi";

export const getListKhoaHoc: RequestHandler = async (req, res) => {
  try {
    const data = await KhoaHocApi.getDmKhoaHoc();
    res.status(200).json({
      message: "success",
      data,
    });
  } catch (err) {
    throw err;
  }
};

export const getListKhoaHocBySchoolId: RequestHandler = async (req, res) => {
  const { ma_truong } = req.params;
  const data = await KhoaHocApi.getDmKhoaHocBySchoolId(ma_truong);
  res.status(200).json({
    message: "success",
    data,
  });
};

/**Admin */

export const getAllKhoaHoc: RequestHandler = async (req, res) => {
  try {
    const data = await KhoaHocRepository.GetList();
    res.status(200).json({
      message: "success",
      data,
    });
  } catch (err) {
    throw err;
  }
};

export const addKhoaHoc: RequestHandler = async (req, res) => {
  try {
    const data = await KhoaHocRepository.Add(req.body as Khoa_hoc);
    res.status(200).json({
      message: "success",
      data,
    });
  } catch (err) {
    throw err;
  }
};
export const updateKhoaHoc: RequestHandler = async (req, res) => {
  try {
    const data = await KhoaHocRepository.Update(
      req.body as unknown as Khoa_hoc
    );
    res.status(200).json({
      message: "success",
      data,
    });
  } catch (err) {
    throw err;
  }
};
const checkId = Joi.number().required().options({ abortEarly: false });

export const getAllLichThiByKhoaHoc: RequestHandler = async (req, res) => {
  try {
    const { Id } = req.params;
    await checkId.validateAsync(Id);
    const data = await KhoaHocLichThiRepository.GetList(
      Id as unknown as number
    );
    res.status(200).json({
      message: "success",
      data,
    });
  } catch (err) {
    throw err;
  }
};

export const addKhoaHocLichThi: RequestHandler = async (req, res) => {
  try {
    const data = await KhoaHoc_LichThiServices.Insert(
      req.body as Khoa_Hoc_Lich_Thi
    );
    res.status(200).json({
      message: "success",
      data,
    });
  } catch (err) {
    throw err;
  }
};
export const updateKhoaHocLichThi: RequestHandler = async (req, res) => {
  try {
    const data = await KhoaHocLichThiRepository.Update(
      req.body as unknown as Khoa_Hoc_Lich_Thi
    );
    res.status(200).json({
      message: "success",
      data,
    });
  } catch (err) {
    throw err;
  }
};
