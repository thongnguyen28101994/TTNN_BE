/**
 * CommonAPI
 */
import { CommonApi } from "../model/common.model.js";
export const GetDmHuyen = async (req, res, next) => {
    /**
     * Danh mục huyện
     */
    const data = await CommonApi.getDMDistrict();
    return res.status(200).json({
        message: "Success",
        data
    });
};
export const GetDm_DiaChiBoiDuong = async (req, res, next) => {
    /**
     * Danh mục Địa chỉ bồi dưỡng
     */
    const data = await CommonApi.getDM_DiaChiBoiDuong();
    return res.status(200).json({
        message: "Success",
        data
    });
};
export const GetDmTruong = async (req, res, next) => {
    /**
     * Danh mục trường
     */
    const { pgdId } = req.params;
    const data = await CommonApi.getDmTruong(pgdId);
    return res.status(200).json({
        message: "Success",
        data
    });
};
export const GetThongTinTruong = async (req, res, next) => {
    /**
     * Thông tin trường
     */
    const { schoolId } = req.params;
    const data = await CommonApi.getSchoolInfoBySchoolId(schoolId);
    return res.status(200).json({
        message: "Success",
        data
    });
};
export const getDm_HinhThucDangKy = async (req, res, next) => {
    /**
     * Danh mục hình thức đăng ký
     */
    const data = await CommonApi.getDm_HinhThucDangKy();
    return res.status(200).json({
        message: "Success",
        data
    });
};
//# sourceMappingURL=common.controller.js.map