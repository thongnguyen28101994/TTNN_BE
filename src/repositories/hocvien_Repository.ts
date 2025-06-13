
import DangKyThi_TTNN_dataSource from "../dbs/data_source";
import { Hoc_Vien } from "../entities/hoc_vien";
import { hocvienEntity } from "../schemas/hocvien_Schema"

export const HocVienRepository = {
    GetMaxId: async () =>{
         try {
            const repos = DangKyThi_TTNN_dataSource.getRepository(hocvienEntity);
            const maxId = await repos.maximum("ma_hoc_vien")

            return maxId
        }
        catch (err) {
            throw err;
        }
    },
    Update: async (data: Hoc_Vien) => {
        try {
            const { Id, ...rest } = data;
            const repos = DangKyThi_TTNN_dataSource.getRepository(hocvienEntity);
            const maxId = await repos.createQueryBuilder().update().set(rest).where("Id=:Id", { Id }).execute();

            return maxId
        }
        catch (err) {
            throw err;
        }
    }
}