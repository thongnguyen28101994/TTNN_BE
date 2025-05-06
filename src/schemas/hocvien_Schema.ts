import { EntitySchema } from "typeorm";
import { hoc_vien } from "../type/interface";

export const hocvienEntity = new EntitySchema<hoc_vien>({
  name: "Hoc_Vien",
  tableName: "Hoc_Vien",
  columns: {
    Id: {
      type: "bigint",
      primary: true,
      generated: true,
    },
    ma_khoa_hoc: {
      type: "nvarchar",
      length: 500,
    },
    ma_dinh_danh: {
      type: "bigint",
    },
    ho_ten: {
      type: "nvarchar",
      length: 500,
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
      length: 500,
    },
    hinh_thuc_dk_id: {
      type: "int",
    },
    ma_truong: {
      type: "nvarchar",
      length: 500,
    },
    thoi_gian_hoc_id: {
      type: "int",
    },
    isGroup: {
      type: "nvarchar",
      length: 500,
    },
    trang_thai_thanh_toan: {
      type: "nvarchar",
      length: 500,
    },
    ngay_het_han_tt: {
      type: "date",
    },
    ten_truong: {
      type: "nvarchar",
      length: 500,
    },
    cap_hoc: {
      type: "nvarchar",
      length: 500,
    },
    quan_huyen: {
      type: "nvarchar",
      length: 500,
    },
    ma_hoc_vien: {
      type: "bigint",
    },
  },
});
