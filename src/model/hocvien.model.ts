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
  /** Tra cứu thông tin học viên cá nhân */
  getHocVienByCCCD: async (
    ma_dinh_danh: string,
    ho_ten: string
  ): Promise<hoc_vien | null> => {
    const result = await DangKyThi_TTNN_dataSource.query(
      `select Hoc_Vien.*,DM_HinhThucDangKy.Loai,Khoa_Hoc.ten as TenKhoaHoc,Dm_Thoi_Gian_Hoc.buoi,Dm_Thoi_Gian_Hoc.tieu_de,DM_Thoi_Gian_Hoc.bat_dau,DM_Thoi_Gian_Hoc.ket_thuc,School.TenTruong as ten_truong from Hoc_Vien 
  join School on School.ma_truong=Hoc_Vien.ma_truong
  join DM_HinhThucDangKy on Hoc_Vien.hinh_thuc_dk_id=DM_HinhThucDangKy.Id
  join Khoa_Hoc_Lich_Thi on Hoc_Vien.ma_khoa_hoc=Khoa_Hoc_Lich_Thi.ma_khoa_hoc 
  join Khoa_Hoc on Khoa_Hoc_Lich_Thi.khoa_hoc_id=Khoa_Hoc.Id
  left join DM_Thoi_Gian_Hoc on DM_Thoi_Gian_Hoc.Id=Hoc_Vien.thoi_gian_hoc_id
   where ma_dinh_danh=@0 and ho_ten like @1`,
      [ma_dinh_danh, "%" + ho_ten + "%"]
    );
    return result[0];
  },

  /**Lấy thông tin Học Viên Tổ chức */
  getDSHocVienByUser: async (
    ma_truong: string,
    ma_khoa_hoc:string
  ): Promise<hoc_vien[] | null> => {
    const result = await DangKyThi_TTNN_dataSource.query(
      `select Hoc_Vien.*,DM_HinhThucDangKy.Loai,Dm_Thoi_Gian_Hoc.buoi,Dm_Thoi_Gian_Hoc.tieu_de,DM_Thoi_Gian_Hoc.bat_dau,DM_Thoi_Gian_Hoc.ket_thuc from Hoc_Vien 
join DM_HinhThucDangKy on Hoc_Vien.hinh_thuc_dk_id=DM_HinhThucDangKy.Id
join Khoa_Hoc_Lich_Thi on Hoc_Vien.ma_khoa_hoc=Khoa_Hoc_Lich_Thi.ma_khoa_hoc 
left join DM_Thoi_Gian_Hoc on DM_Thoi_Gian_Hoc.Id=Hoc_Vien.thoi_gian_hoc_id
where ma_truong like @0 and Hoc_Vien.ma_khoa_hoc like @1 and isGroup like N'Tổ chức'`,
      ["%"+ma_truong+"%","%"+ma_khoa_hoc+"%"]
    );
    return result;
  },
  addHocVien: async (params: hoc_vien[]) => {
    const json = JSON.stringify(params);
    const result = await DangKyThi_TTNN_dataSource.query(
      `insert into [Hoc_Vien](ma_khoa_hoc,ho_ten,ngay_sinh,noi_sinh,dien_thoai,ma_dinh_danh,ma_truong,hinh_thuc_dk_id,gioi_tinh,isGroup,thoi_gian_hoc_id) 
         select  ma_khoa_hoc,ho_ten,ngay_sinh,noi_sinh,dien_thoai,ma_dinh_danh,ma_truong,hinh_thuc_dk_id,gioi_tinh,isGroup,thoi_gian_hoc_id
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
           isGroup nvarchar(500),
           thoi_gian_hoc_id int
         )`,
      [json]
    );
    return result;
  },
};
