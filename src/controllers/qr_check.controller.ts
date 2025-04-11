import { RequestHandler } from "express";
import { QrCheck_API } from "../model/qr_check.model.js";

export const getInfo_HS: RequestHandler = async (req, res) => {
  const { lop, sdt_ph, schoolId } = req.params;
  const encodeLop = decodeURIComponent(lop);
  const data = await QrCheck_API.getInfo(encodeLop, sdt_ph, schoolId);
  if (data) {
    return res.status(200).json({
      message: "success",
      data,
    });
  }
  if (!data) {
    return res.status(404).json({
      message: "Lớp hoặc số điện thoại không đúng",
      data,
    });
  }
};
