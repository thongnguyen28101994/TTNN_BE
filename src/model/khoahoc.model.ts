import { DangKyThi_TTNN_dataSource } from "../data-source.js";
import { khoa_hoc } from "../type/interface";

export const KhoaHocApi = {
  getDmKhoaHoc: async (): Promise<khoa_hoc[]> => {
    const result = await DangKyThi_TTNN_dataSource.query(
      `SELECT  [Khoa_Hoc].[Id]
      ,[ten]
      ,[ngay_khai_giang]
      ,[ngay_het_han_dk]
      ,[mo_ta]
      ,[dia_chi_id]
      ,[so_ngay_hoc]
      ,[so_luong]
      ,[hoc_phi]
      ,[le_phi_thi]
      ,[ngay_thi]
      ,DM_DiaChiBoiDuong.dia_chi
      ,[ma_khoa_hoc]
  FROM [Khoa_Hoc]
  JOIN DM_DiaChiBoiDuong ON Khoa_Hoc.dia_chi_id=DM_DiaChiBoiDuong.Id
  JOIN Khoa_Hoc_Lich_Thi on Khoa_Hoc.Id=Khoa_Hoc_Lich_Thi.khoa_hoc_id`
    );
    return result;
  },
};
