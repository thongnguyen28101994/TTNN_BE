import { KhoaHocApi } from "../model/khoahoc.model.js";
export const getListKhoaHoc = async (req, res) => {
    const data = await KhoaHocApi.getDmKhoaHoc();
    return res.status(200).json({
        message: "success",
        data,
    });
};
//# sourceMappingURL=khoahoc.controller.js.map