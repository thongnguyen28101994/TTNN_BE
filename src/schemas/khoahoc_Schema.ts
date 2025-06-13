import { EntitySchema } from "typeorm";
import { Khoa_hoc, Khoa_Hoc_Lich_Thi, Khoa_Hoc_Relative } from "../entities/khoa_hoc";

export const khoahocEntities = new EntitySchema<Khoa_Hoc_Relative>({
    name: "Khoa_Hoc",
    tableName: "Khoa_Hoc",
    columns: {
        Id: { type: 'bigint', primary: true, generated: true },
        ten: { type: 'nvarchar' },
        mo_ta: { type: 'nvarchar' },
        dia_chi_id: { type: 'int' },
        hoc_phi: { type: 'float' },
        le_phi_thi: { type: 'float' },
        so_ngay_hoc: { type: 'int' },
        prefix_code: { type: 'varchar', length: 10 },
        suffix_code: { type: 'varchar', length: 10 },
        num_start_at: { type: 'int' },
        ngay_tao: { type: "datetime" },
        isActive: { type: 'bit' }
    },
    relations:{
        diachi:{
            type:"one-to-one",
            target:"Dm_DiaChiBoiDuong",
            joinColumn:{
                name:"dia_chi_id",
                referencedColumnName:"Id"
            }
        }
    }
})

export const khoahoc_lichthiEntities = new EntitySchema<Khoa_Hoc_Lich_Thi>({
    name: "Khoa_Hoc_Lich_Thi",
    tableName: "Khoa_Hoc_Lich_Thi",
    columns: {
        ma_khoa_hoc: { type: 'varchar',length:50, primary: true },
        ngay_het_han_dk: { type: 'datetime' },
        ngay_khai_giang: { type: 'date' },
        ngay_thi:{type:'date'},
        khoa_hoc_id: { type: 'bigint' },
        ngay_tao: { type: "datetime" },
        so_luong: { type: 'int' },
        Id:{type:'int'}
    }
})