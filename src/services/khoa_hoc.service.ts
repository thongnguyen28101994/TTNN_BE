import { Khoa_Hoc_Lich_Thi } from "../entities/khoa_hoc"
import { KhoaHocLichThiRepository, KhoaHocRepository } from "../repositories/khoahoc_Repository"

export const KhoaHoc_LichThiServices = {
    Insert: async (data:Khoa_Hoc_Lich_Thi) =>{

        //tạo mã khoá học
        const khoa_hoc = await KhoaHocRepository.GetDetail(data.khoa_hoc_id);
         const newMaKhoaHoc= "";
        const convertData= {...data,ma_khoa_hoc:newMaKhoaHoc}

        //insert lịch thi 
        const result = await KhoaHocLichThiRepository.Add(convertData);
        return result;
    }
}