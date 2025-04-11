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

export interface dm_truong {
  schoolId: string;
  ten_truong: string;
  pgdId: number;
  cap1: boolean;
  cap2: boolean;
}

export interface dm_diachiboiduong {
  Id: number;
  dia_chi: string;
}

export interface dm_hinhthucdangky {
  Id:number;
  loai:string;
}

export interface user {
  userId: number;
  fullName: string;
  roleId: number;
  donviId: string;
  roleMenu: string;
}

export interface dm_role {
  roleId: number;
  name: string;
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
}

export interface hoc_vien {
  Id: number;
  khoa_hoc_id: string;
  ma_dinh_danh: number;
  ho_ten: string;
  ngay_sinh: Date;
  noi_sinh: string;
  dien_thoai: string;
  hinh_thuc_dk_id: number;
  ten_truong: string;
}

export interface hoc_sinh {
  rowId: number;
  schoolId: string;
  nam_hoc_id: string;
  ma_dinh_danh: number;
  ho_ten: string;
  ngay_sinh: Date;
  lop: string;
  sdt_ph: string;
  email_ph: string;
  userName: string;
  password: string;
  isActive: boolean;
  created_date: Date;
}


