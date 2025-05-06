
import DangKyThi_TTNN_dataSource from "../dbs/data_source";
import { khoa_hoc, ma_khoa_hoc } from "../type/interface";

export const KhoaHocApi = {
  /** Khoá học */
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
  addKhoaHoc: async (params: khoa_hoc[]) => {
    const json = JSON.stringify(params);
    const result = await DangKyThi_TTNN_dataSource.query(
      `insert into Khoa_Hoc(ten,mo_ta,dia_chi_id,hoc_phi,le_phi_thi,so_ngay_hoc,so_luong) 
       select ten,mo_ta,dia_chi_id,hoc_phi,le_phi_thi,so_ngay_hoc,so_luong
       from OPENJSON(@0) with (
         ten nvarchar(Max),
         mo_ta nvarchar(Max)
         hoc_phi float,
         le_phi_thi float,
         so_ngay_hoc int,
         so_luong int
       )`,
      [json]
    );
    return result;
  },

  getDmKhoaHocBySchoolId: async(ma_truong:string): Promise<khoa_hoc[]>=>{
    const result = await DangKyThi_TTNN_dataSource.query(
      `        select Id,ten,hoc_phi,le_phi_thi,so_ngay_hoc,ma_khoa_hoc,ngay_khai_giang,ngay_thi from (
    select Khoa_Hoc.*,temp.ma_khoa_hoc,temp.ngay_thi,temp.ngay_khai_giang from Khoa_Hoc join (
    select khoa_hoc_id,Khoa_Hoc_Lich_Thi.ma_khoa_hoc,Khoa_Hoc_Lich_Thi.ngay_khai_giang,ngay_thi from Khoa_Hoc_Lich_Thi join Hoc_Vien on Khoa_Hoc_Lich_Thi.ma_khoa_hoc=Hoc_Vien.ma_khoa_hoc
    where Hoc_Vien.ma_truong like @0 ) temp on Khoa_Hoc.Id=temp.khoa_hoc_id) temp2
    group by Id,ten,hoc_phi,le_phi_thi,so_ngay_hoc,temp2.ma_khoa_hoc,ngay_khai_giang,ngay_thi`,["%"+ma_truong+"%"]);
    return result;
  },

  /** Mã Khoá học */
    getDMMaKhoaHoc: async () : Promise<ma_khoa_hoc[]>=>{
      const result = await DangKyThi_TTNN_dataSource.query(`Select kh.*,mkh.Id as MKH_Id,mkh.prefix_code,mkh.suffix_code,mkh.num_start_at from DM_Ma_Khoa_Hoc as mkh 
join Khoa_Hoc kh on mkh.khoa_hoc_id=kh.Id where mkh.isActive=1`);
      return result
    },
    // chưa có api thêm, xoá sửa mã khoá học
};
