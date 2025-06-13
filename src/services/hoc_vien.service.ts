import { Hoc_Vien } from "../entities/hoc_vien"
import { HocVienRepository } from "../repositories/hocvien_Repository";

export const Hoc_VienService = {
    Update: async (data: Hoc_Vien[]) => {
        try {
            data.forEach(async (item) => {
                await HocVienRepository.Update(item);
            })
        }
        catch (err) {
            throw err;
        }

    }
}