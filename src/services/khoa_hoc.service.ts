import { Khoa_Hoc_Lich_Thi } from "../entities/khoa_hoc";
import {
  KhoaHocLichThiRepository,
  KhoaHocRepository,
} from "../repositories/khoahoc_Repository";

export const KhoaHoc_LichThiServices = {
  Insert: async (data: Khoa_Hoc_Lich_Thi) => {
    //tạo mã khoá học
    const khoa_hoc = await KhoaHocRepository.GetDetail(data.khoa_hoc_id);
    if (!khoa_hoc) throw new Error("Không tìm thấy thông tin khoá học này");
    let maxId = (await KhoaHocLichThiRepository.GetMaxId(khoa_hoc.Id)) || {
      MaxId: "0",
    };

    const convertData = {
      ...data,
      ma_khoa_hoc:
        khoa_hoc.prefix_code +
        (parseInt(maxId.MaxId) + 1) +
        khoa_hoc.suffix_code,
      Id: parseInt(maxId.MaxId) + 1,
    };
    //insert lịch thi
    const result = await KhoaHocLichThiRepository.Add(convertData);
    return result;
  },
};
