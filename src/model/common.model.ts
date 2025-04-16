import { DangKyThi_TTNN_dataSource } from "../data-source.js";
import {
  dm_cap_truong,
  dm_diachiboiduong,
  dm_hinhthucdangky,
  dm_huyen,
  dm_thoigianhoc,
  dm_truong,
} from "../type/interface.js";

export const CommonApi = {
  getDMDistrict: async (): Promise<dm_huyen[]> => {
    const result: dm_huyen[] = await DangKyThi_TTNN_dataSource.query(
      "Select Id as districtId,Type +' '+ Name as TenHuyen from District"
    );
    return result;
  },
  getCapTruong: async (): Promise<dm_cap_truong[]> => {
    const result: dm_cap_truong[] = await DangKyThi_TTNN_dataSource.query(
      "Select * from CapTruong"
    );
    return result;
  },
  getDmTruongByCapTruongAndQuanHuyen: async (
    capTruongId: number,
    huyenId: number
  ): Promise<dm_truong[]> => {
    const result: dm_truong[] = await DangKyThi_TTNN_dataSource.query(
      `select * from School where CapTruongId=@0 and DistrictId=@1`,
      [capTruongId, huyenId]
    );
    return result;
  },
  getDmTruong: async (pgdId: number): Promise<dm_truong[]> => {
    const result: dm_truong[] = await DangKyThi_TTNN_dataSource.query(
      `select dm_truong.*,dm_phuong_xa.ten_phuong_xa,dm_cap_truong.ten_day_du,dm_loai_hinh_truong.ten 
       from dm_truong 
       join dm_phuong_xa on dm_truong.phuong_xa_id=dm_phuong_xa.id
       join dm_cap_truong on dm_truong.cap_truong_id=dm_cap_truong.id
       join dm_loai_hinh_truong on dm_truong.loai_hinh=dm_loai_hinh_truong.id
       where pgdId=@0`,
      [pgdId]
    );
    return result;
  },
  getSchoolInfoBySchoolId: async (schoolId: string): Promise<dm_truong> => {
    const result = await DangKyThi_TTNN_dataSource.query(
      `select * from dm_truong where schoolId=@0`,
      [schoolId]
    );
    return result[0];
  },
  getDMThoiGianHoc: async (): Promise<dm_thoigianhoc[]> => {
    const result = await DangKyThi_TTNN_dataSource.query(
      `select * from DM_Thoi_Gian_Hoc`
    );
    return result.map((x: dm_thoigianhoc) => ({
      ...x,
      bat_dau: new Date(new Date(x.bat_dau).setHours(new Date(x.bat_dau).getHours()+8)),
      ket_thuc: new Date(new Date(x.ket_thuc).setHours(new Date(x.ket_thuc).getHours()+8)),
    }));
  },
  getDM_DiaChiBoiDuong: async (): Promise<dm_diachiboiduong> => {
    const result = await DangKyThi_TTNN_dataSource.query(
      `select * from DM_DiaChiBoiDuong`
    );
    return result;
  },
  getDm_HinhThucDangKy: async (): Promise<dm_hinhthucdangky> => {
    const result = await DangKyThi_TTNN_dataSource.query(
      `select * from DM_HinhThucDangKy`
    );
    return result;
  },
};
