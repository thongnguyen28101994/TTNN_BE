import { DangKyThi_TTNN_dataSource } from "../data-source.js";
import { hoc_vien } from "../type/interface";

export const HocVienApi = {
  getDSHocVien: async (): Promise<hoc_vien[]> => {
    const result = await DangKyThi_TTNN_dataSource.query(
      `select Hoc_Vien.*,DM_HinhThucDangKy.Loai,Khoa_Hoc.ten from Hoc_Vien 
join DM_HinhThucDangKy on Hoc_Vien.hinh_thuc_dk_id=DM_HinhThucDangKy.Id
join Khoa_Hoc on Hoc_Vien.khoa_hoc_id=Khoa_Hoc.Id`
    );
    return result;
  },
  addHocVien: async (params: hoc_vien[]) => {
    const json = JSON.stringify(params);
    const result = await DangKyThi_TTNN_dataSource.query(
      `insert into [Hoc_Vien](ma_khoa_hoc,ho_ten,ngay_sinh,noi_sinh,dien_thoai,ma_dinh_danh,ma_truong,hinh_thuc_dk_id,gioi_tinh,isGroup) 
         select  ma_khoa_hoc,ho_ten,ngay_sinh,noi_sinh,dien_thoai,ma_dinh_danh,ma_truong,hinh_thuc_dk_id,gioi_tinh,isGroup
         from OPENJSON(@0) with (
           ma_khoa_hoc varchar(50),
           ho_ten nvarchar(MAX),
           ngay_sinh date,
           noi_sinh nvarchar(500),
           dien_thoai nvarchar(50),
           ma_dinh_danh nvarchar(500),
           ma_truong nvarchar(500),
           hinh_thuc_dk_id int,
           gioi_tinh nvarchar(500),
           isGroup nvarchar(500)
         )`,
      [json]
    );
    return result;
  },
};
