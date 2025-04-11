import { DangKyThi_TTNN_dataSource } from "../data-source.js";
export const HocVienApi = {
    getDSHocVien: async () => {
        const result = await DangKyThi_TTNN_dataSource.query(`select Hoc_Vien.*,DM_HinhThucDangKy.Loai,Khoa_Hoc.ten from Hoc_Vien 
join DM_HinhThucDangKy on Hoc_Vien.hinh_thuc_dk_id=DM_HinhThucDangKy.Id
join Khoa_Hoc on Hoc_Vien.khoa_hoc_id=Khoa_Hoc.Id`);
        return result;
    },
    addHocVien: async (params) => {
        const json = JSON.stringify(params);
        const result = await DangKyThi_TTNN_dataSource.query(`insert into [Hoc_Vien](khoa_hoc_id,ho_ten,ngay_sinh,noi_sinh,dien_thoai,ma_dinh_danh,ten_truong,hinh_thuc_dk_id) 
         select  khoa_hoc_id,ho_ten,ngay_sinh,noi_sinh,dien_thoai,ma_dinh_danh,ten_truong,hinh_thuc_dk_id
         from OPENJSON(@0) with (
           khoa_hoc_id bigint,
           ho_ten nvarchar(MAX),
           ngay_sinh date,
           noi_sinh nvarchar(500),
           dien_thoai nvarchar(50),
           ma_dinh_danh nvarchar(500),
           ten_truong nvarchar(500),
           hinh_thuc_dk_id int
         )`, [json]);
        return result;
    },
};
//# sourceMappingURL=hocvien.model.js.map