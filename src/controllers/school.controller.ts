import { RequestHandler } from "express";
import { SchoolApi } from "../model/school.model";
import { school_company } from "../type/interface";

export const getCompanyBySchoolId: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const data = await SchoolApi.getCompanyBySchoolId(id);
   res.status(200).json({
    message: "success",
    data,
  });
};

export const getListCompanySetBySchool: RequestHandler = async (_, res) => {
  const data = await SchoolApi.getListCompanySetBySchool();
   res.status(200).json({
    message: "success",
    data,
  });
};

export const addCompanyToSchool: RequestHandler = async (req, res) => {
  const data = await SchoolApi.addCompanyToSchool(req.body as school_company[]);
   res.status(200).json({
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
   res.status(200).json({
    message: "success",
    data,
  });
};

export const deleteCompanyBySchool: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const data = await SchoolApi.deleteCompanyToSchool(id as unknown as number);
   res.status(200).json({
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
   res.status(200).json({
    message: "success",
    data,
  });
};

export const danhSachByIsAuthBySchool: RequestHandler = async (req, res) => {
  const { schoolId } = req.params;
  const data = await SchoolApi.getByAuthSchool(schoolId);
   res.status(200).json({
    message: "success",
    data,
  });
};

