import DangKyThi_TTNN_dataSource from "../dbs/data_source";
import { Khoa_hoc, Khoa_Hoc_Lich_Thi } from "../entities/khoa_hoc";
import { khoahoc_lichthiEntities, khoahocEntities } from "../schemas/khoahoc_Schema";

export const KhoaHocRepository = {
    GetList: async () => {
        const repos = DangKyThi_TTNN_dataSource.getRepository(khoahocEntities);
        const result = await repos.createQueryBuilder("Khoa_Hoc").leftJoinAndSelect("Khoa_Hoc.diachi","diachi").getMany();
        return result;
    },
    GetDetail: async (khoa_hoc_id: number) => {
        const repos = DangKyThi_TTNN_dataSource.getRepository(khoahocEntities);
        const result = await repos.findOneBy({ Id: khoa_hoc_id });
        return result;
    },
    Add: async (data: Khoa_hoc) => {
        const repos = DangKyThi_TTNN_dataSource.getRepository(khoahocEntities).createQueryBuilder("Khoa_Hoc");
        const result = await repos.insert().into(khoahocEntities).values(data).execute();
        return result;
    },
    Update: async (data: Khoa_hoc) => {
        const { Id, ...rest } = data;
        const repos = DangKyThi_TTNN_dataSource.getRepository(khoahocEntities).createQueryBuilder("Khoa_Hoc");
        const result = await repos.update().set(rest).where("Id=:Id", { Id }).execute();
        return result;
    }
}

export const KhoaHocLichThiRepository = {
    GetList: async (khoa_hoc_id:number) => {
        const repos = DangKyThi_TTNN_dataSource.getRepository(khoahoc_lichthiEntities);
        const result = await repos.findBy({khoa_hoc_id});
        return result;
    },
    GetMaxId: async (khoa_hoc_id: number) => {
        const MaxId:{MaxId:string}|undefined = await DangKyThi_TTNN_dataSource.createQueryBuilder().select("Max(Id) as MaxId").from("Khoa_Hoc_Lich_Thi","Khoa_Hoc_Lich_Thi").groupBy("Khoa_Hoc_Lich_Thi.khoa_hoc_id").having("Khoa_Hoc_Lich_Thi.khoa_hoc_id=:khoa_hoc_id", { khoa_hoc_id }).getRawOne();
        return MaxId;
    },
    Add: async (data: Khoa_Hoc_Lich_Thi) => {
        const repos = DangKyThi_TTNN_dataSource.getRepository(khoahoc_lichthiEntities).createQueryBuilder("Khoa_Hoc_Lich_Thi");
        const result = await repos.insert().into(khoahoc_lichthiEntities).values(data).execute();
        return result;
    },
    Update: async (data: Khoa_Hoc_Lich_Thi) => {
        const { ma_khoa_hoc, ...rest } = data;
        const repos = DangKyThi_TTNN_dataSource.getRepository(khoahoc_lichthiEntities).createQueryBuilder("Khoa_Hoc_Lich_Thi");
        const result = await repos.update().set(rest).where("ma_khoa_hoc=:ma_khoa_hoc", { ma_khoa_hoc }).execute();
        return result;
    }
}
