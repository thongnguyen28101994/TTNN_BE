import { EntitySchema } from "typeorm";
import { Hoc_Vien } from "../entities/hoc_vien";

export const hocvienEntity = new EntitySchema<Hoc_Vien>({
  name: "Hoc_Vien",
  tableName: "Hoc_Vien",
  columns: {
    Id: {
      type: "bigint",
      primary: true,
      generated: true,
    },
    ma_khoa_hoc: {
      type: "varchar",
      length: 50,
    },
    ma_dinh_danh: {
      type: "bigint",
    },
    ho_ten: {
      type: "nvarchar",
      length: 500,
    },
    gioi_tinh:{
       type: "nvarchar",
      length: 50,
    },
    ngay_sinh: {
      type: "date",
    },
    noi_sinh: {
      type: "nvarchar",
      length: 500,
    },
    dien_thoai: {
      type: "nvarchar",
      length: 50,
    },
    hinh_thuc_dk_id: {
      type: "int",
    },
    ma_truong: {
      type: "nvarchar",
      length: 500,
    },
    thoi_gian_hoc_id: {
      type: "bigint",
    },
    isGroup: {
      type: "nvarchar",
      length: 500,
    },
    trang_thai_thanh_toan: {
      type: "nvarchar",
      length: 50,
    },
    ngay_het_han_tt: {
      type: "datetime",
    },
    ma_hoc_vien: {
      type: "bigint",
    },
    tong_tien:{
      type:'float'
    }
  },
});
