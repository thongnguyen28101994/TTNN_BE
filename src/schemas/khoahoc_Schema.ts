import { EntitySchema } from "typeorm";
import { Khoa_hoc } from "../entities/khoa_hoc";

export const khoahocEntities = new EntitySchema<Khoa_hoc>({
    name: "KhoaHoc",
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
    }
})