import { DangKyThi_TTNN_dataSource } from "../data-source.js";
import {
  dm_diachiboiduong,
  dm_hinhthucdangky,
  dm_huyen,
  dm_truong,
} from "../type/interface.js";

export const CommonApi = {
  getDMDistrict: async (): Promise<dm_huyen[]> => {
    const result: dm_huyen[] = await DangKyThi_TTNN_dataSource.query(
      "Select id as districtId,loai +' '+ ten_quan_huyen as TenHuyen from dm_quan_huyen"
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
  getSchoolInfoBySchoolId: async(schoolId:string): Promise<dm_truong>=>{
    const result = await DangKyThi_TTNN_dataSource.query(
      `select * from dm_truong where schoolId=@0`,
      [schoolId]
    );
    return result[0];
  },
  getDM_DiaChiBoiDuong: async () : Promise<dm_diachiboiduong> =>{
    const result = await DangKyThi_TTNN_dataSource.query(
      `select * from DM_DiaChiBoiDuong`
    );
    return result;
  },
  getDm_HinhThucDangKy: async() : Promise<dm_hinhthucdangky> =>{
    const result = await DangKyThi_TTNN_dataSource.query(
      `select * from DM_HinhThucDangKy`
    );
    return result;
  }
};
