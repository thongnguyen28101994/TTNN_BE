export interface MonHoc {
  MonId: string;
  TenMon: string;
}

/**
 * boarding-meals
 */


export interface foodCompany {
  companyId: number;
  mo_hinh_id: string;
  ma_so_thue: string;
  ten_cong_ty: string;
  dia_chi: string;
  huyen_id: number;
  quyetdinh: string;
  mo_ta: string;
  ghi_chu: string;
  created_date: Date;
  tenHuyen?: string;
  ten_mo_hinh: string;
}

export interface food_company_temp extends foodCompany {
  is_da_duyet: boolean;
  ly_do: boolean;
  schoolId: string;
}

export interface school_company extends foodCompany {
  rowId: number;
  schoolId: string;
  congtyId: string;
  created_date: Date;
  tenHuyen: string;
  tenTruong: string;
  capTruong: string;
}

export interface meals {
  mon_an_id: number;
  buoi: string;
  ten_mon_an: string;
  ngay_het_han: Date;
  created_userId: number;
  imageName?: string;
  imageId?: string;
  schoolId: string;
  ngay: Date;
  imageFile?: string;
}

export interface dm_huyen {
  districtId: number;
  TenHuyen: string;
}

export interface dm_cap_truong {
  Id:number,
  TenDayDu: string,
}

export interface dm_truong {
  Id: number;
  MaTruong: string;
  CapTruongId: number;
  DistrictId: number;
}

export interface School {
  Id:number,
  ma_truong:string,
  SoNhaTenDuong:string,
  CapTruongId:number,
  TenTruong:string,
  Email:string,
  SDT:string,
  DistrictId:string,
  MaSoThue:string
}

export interface dm_diachiboiduong {
  Id: number;
  dia_chi: string;
}

export interface dm_thoigianhoc {
  Id: number;
  tieu_de: string,
  bat_dau:Date
  ket_thuc:Date,
}

export interface dm_hinhthucdangky {
  Id:number;
  loai:string;
}

export interface Sys_User extends School {
  UserId: number;
  FullName: string;
  RoleId: number;
  Password:string;
  UserName:string;
  SDT:string
}

export interface Sys_Role {
  Id: number;
  Name: string;
}

export interface khoa_hoc {
  Id: number;
  ten: string;
  ngay_khai_giang: Date;
  ngay_het_han_dk: Date;
  mo_ta: string;
  dia_chi_id:number;
  so_buoi_hoc: number;
  so_luong: number;
  hoc_phi: number;
  le_phi_thi: number;
  dia_chi: string;
  ma_khoa_hoc:string
}

export interface ma_khoa_hoc {
  Id: number,
  khoa_hoc_id:number,
  prefix_code:string,
  suffix_code:string,
  num_start_at:number,
  isActive:boolean,
  ngay_tao:Date
}

export interface hoc_vien {
  Id: number;
  ma_khoa_hoc: string;
  ma_dinh_danh: number;
  ho_ten: string;
  ngay_sinh: Date;
  noi_sinh: string;
  dien_thoai: string;
  hinh_thuc_dk_id: number;
  ma_truong: string;
  thoi_gian_hoc_id: number
  isGroup:string,
  trang_thai_thanh_toan:string,
  ngay_het_han_tt:Date,
  ten_truong:string
}


