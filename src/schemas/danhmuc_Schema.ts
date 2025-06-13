import { EntitySchema } from "typeorm";
import { Dm_DiaChiBoiDuong } from "../entities/danh_muc";

export const khoahocEntities = new EntitySchema<Dm_DiaChiBoiDuong>({
    name: "Dm_DiaChiBoiDuong",
    tableName: "DM_DiaChiBoiDuong",
    columns: {
        Id: { type: 'bigint', primary: true, generated: true },
        dia_chi:{type:'nvarchar',length:500}
    }
})