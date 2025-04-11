import { DangKyThi_TTNN_dataSource } from "../data-source.js";
export const KhoaHocApi = {
    getDmKhoaHoc: async () => {
        const result = await DangKyThi_TTNN_dataSource.query(`SELECT  [Khoa_Hoc].[Id]
      ,[ten]
      ,[ngay_khai_giang]
      ,[ngay_het_han_dk]
      ,[mo_ta]
      ,[dia_chi_id]
      ,[so_buoi_hoc]
      ,[so_luong]
      ,[hoc_phi]
      ,[le_phi_thi]
      ,DM_DiaChiBoiDuong.dia_chi
  FROM [Khoa_Hoc]
  JOIN DM_DiaChiBoiDuong ON Khoa_Hoc.dia_chi_id=DM_DiaChiBoiDuong.Id`);
        return result;
    },
};
//# sourceMappingURL=khoahoc.model.js.map