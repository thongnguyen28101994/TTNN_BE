import { RequestHandler } from "express";
import { SchoolApi } from "../model/school.model.js";
import { school_company } from "../type/interface.js";

export const getCompanyBySchoolId: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const data = await SchoolApi.getCompanyBySchoolId(id);
  return res.status(200).json({
    message: "success",
    data,
  });
};

export const getListCompanySetBySchool: RequestHandler = async (_, res) => {
  const data = await SchoolApi.getListCompanySetBySchool();
  return res.status(200).json({
    message: "success",
    data,
  });
};

export const addCompanyToSchool: RequestHandler = async (req, res) => {
  const data = await SchoolApi.addCompanyToSchool(req.body as school_company[]);
  return res.status(200).json({
    message: "success",
    data,
  });
};

export const addAndUpdateFoodCompanyToSchool: RequestHandler = async (
  req,
  res
) => {
  const data = await SchoolApi.addAndUpdateCompanyToSchool(
    req.body as school_company[]
  );
  return res.status(200).json({
    message: "success",
    data,
  });
};

export const deleteCompanyBySchool: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const data = await SchoolApi.deleteCompanyToSchool(id as unknown as number);
  return res.status(200).json({
    message: "success",
    data,
  });
};

export const updateIsAuthBySchool: RequestHandler = async (req, res) => {
  const { schoolId, isAuth } = req.params;
  const data = await SchoolApi.updateIsAuthSchool(
    schoolId,
    isAuth as unknown as boolean
  );
  return res.status(200).json({
    message: "success",
    data,
  });
};

export const danhSachByIsAuthBySchool: RequestHandler = async (req, res) => {
  const { schoolId } = req.params;
  const data = await SchoolApi.getByAuthSchool(schoolId);
  return res.status(200).json({
    message: "success",
    data,
  });
};
