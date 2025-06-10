import DangKyThi_TTNN_dataSource from "../dbs/data_source";
import { Khoa_hoc } from "../entities/khoa_hoc";
import { khoahocEntities } from "../schemas/khoahoc_Schema";

export const KhoaHocRepository = {
    GetList: async () =>{
        const repos = DangKyThi_TTNN_dataSource.getRepository(khoahocEntities);
        const result =await repos.find();
        return result;
    },
    AddKhoaHoc: async (params: Khoa_hoc) => {
        const repos = await DangKyThi_TTNN_dataSource.getRepository(khoahocEntities).createQueryBuilder("KhoaHoc").insert().execute()
    }
}
