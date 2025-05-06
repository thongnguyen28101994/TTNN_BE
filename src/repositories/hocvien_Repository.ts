
import  DangKyThi_TTNN_dataSource  from "../dbs/data_source";
import { hocvienEntity } from "../schemas/hocvien_Schema"

export const HocVienRepository = {
    GetMaxId: async () =>{
        const repos = DangKyThi_TTNN_dataSource.getRepository(hocvienEntity);
        const maxId = await repos.maximum("ma_hoc_vien");
        return maxId||0;
    }
    
}