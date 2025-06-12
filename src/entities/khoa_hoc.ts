import { Dm_DiaChiBoiDuong } from "./danh_muc"

export interface Khoa_hoc {
    Id:number,
    ten:string,
    mo_ta:string,
    dia_chi_id:number,
    hoc_phi:number,
    le_phi_thi:number,
    so_ngay_hoc: number,
    prefix_code:string,
    suffix_code:string,
    num_start_at:number,
    ngay_tao:Date,
    isActive:boolean
}

export interface Khoa_Hoc_Relative extends Khoa_hoc {
    diachi:Dm_DiaChiBoiDuong|undefined
}

export interface  Khoa_Hoc_Lich_Thi
{
    ma_khoa_hoc:string,
    ngay_het_han_dk:Date,
    khoa_hoc_id:number,
    ngay_khai_giang:Date,
    ngay_thi:Date,
    so_luong:number,
    ngay_tao:Date,
    Id:number|undefined
}