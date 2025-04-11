import { SchoolApi } from "../model/school.model.js";
export const getCompanyBySchoolId = async (req, res) => {
    const { id } = req.params;
    const data = await SchoolApi.getCompanyBySchoolId(id);
    return res.status(200).json({
        message: "success",
        data,
    });
};
export const getListCompanySetBySchool = async (_, res) => {
    const data = await SchoolApi.getListCompanySetBySchool();
    return res.status(200).json({
        message: "success",
        data,
    });
};
export const addCompanyToSchool = async (req, res) => {
    const data = await SchoolApi.addCompanyToSchool(req.body);
    return res.status(200).json({
        message: "success",
        data,
    });
};
export const addAndUpdateFoodCompanyToSchool = async (req, res) => {
    const data = await SchoolApi.addAndUpdateCompanyToSchool(req.body);
    return res.status(200).json({
        message: "success",
        data,
    });
};
export const deleteCompanyBySchool = async (req, res) => {
    const { id } = req.params;
    const data = await SchoolApi.deleteCompanyToSchool(id);
    return res.status(200).json({
        message: "success",
        data,
    });
};
export const updateIsAuthBySchool = async (req, res) => {
    const { schoolId, isAuth } = req.params;
    const data = await SchoolApi.updateIsAuthSchool(schoolId, isAuth);
    return res.status(200).json({
        message: "success",
        data,
    });
};
export const danhSachByIsAuthBySchool = async (req, res) => {
    const { schoolId } = req.params;
    const data = await SchoolApi.getByAuthSchool(schoolId);
    return res.status(200).json({
        message: "success",
        data,
    });
};
//# sourceMappingURL=school.controller.js.map