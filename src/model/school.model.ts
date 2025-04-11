import { DangKyThi_TTNN_dataSource } from "../data-source.js";
import { school_company } from "../type/interface.js";

export const SchoolApi = {
  getCompanyBySchoolId: async (schoolId: string): Promise<school_company[]> => {
    const result = await DangKyThi_TTNN_dataSource.query(
      `select f.*,t.rowId as rowId,mh.ten_mo_hinh 
       from [truong_congty] as t 
       join food_company as f on f.companyId=t.congtyId 
       join dm_loai_mo_hinh mh on mh.mo_hinh_id=f.mo_hinh_id  
       where schoolId=@0`,
      [schoolId]
    );
    return result;
  },

  addCompanyToSchool: async (params: school_company[]) => {
    const json = JSON.stringify(params);
    const result = await DangKyThi_TTNN_dataSource.query(
      `insert into [truong_congty](schoolId,congtyId) 
       select schoolId,congtyId 
       from OPENJSON(@0) with (
         schoolId varchar(500),
         congtyId int
       )`,
      [json]
    );
    return result;
  },

  addAndUpdateCompanyToSchool: async (params: school_company[]) => {
    // Get existing data
    const getData: school_company[] = await DangKyThi_TTNN_dataSource.query(
      `select * from truong_congty where schoolId=@0`,
      [params[0].schoolId]
    );

    const deleteData = getData.filter(
      (x) => !params.some((y) => y.congtyId === x.congtyId)
    );

    if (deleteData.length > 0) {
      // Add to history table
      await DangKyThi_TTNN_dataSource.query(
        `insert into [truong_congty_history](rowId,schoolId,congtyId,created_date)
         select rowId,schoolId,congtyId,created_date 
         from OPENJSON(@0) with (
           rowId int,
           schoolId varchar(500),
           congtyId int,
           created_date datetime
         )`,
        [JSON.stringify(deleteData)]
      );

      // Delete from main table
      await DangKyThi_TTNN_dataSource.query(
        `delete from [truong_congty] 
         where rowId in (
           select rowId from OPENJSON(@0) with (rowId int)
         )`,
        [JSON.stringify(deleteData)]
      );
    }

    const insertData = params.filter(
      (x) => !getData.some((y) => y.congtyId == x.congtyId)
    );

    const insertDataString = JSON.stringify(insertData);
    // Add new records
    await DangKyThi_TTNN_dataSource.query(
      `insert into [truong_congty](schoolId,congtyId)
         select schoolId,congtyId 
         from OPENJSON(@0) with (
           schoolId varchar(500),
           congtyId int
         )`,
      [insertDataString]
    );

    return null;
  },

  deleteCompanyToSchool: async (rowId: number) => {
    const result = await DangKyThi_TTNN_dataSource.query(
      `delete from [truong_congty] where rowId=@0`,
      [rowId]
    );
    return result;
  },

  getListCompanySetBySchool: async (): Promise<school_company[]> => {
    const result = await DangKyThi_TTNN_dataSource.query(
      `select f.*,t.rowId as rowId,h.ten_quan_huyen as tenHuyen,
         tr.ten_truong as tenTruong,c.ten_day_du as capTruong 
       from [truong_congty] as t 
       join food_company as f on f.companyId=t.congtyId
       join dm_quan_huyen h on f.huyen_id=h.id
       JOIN dm_truong tr on t.schoolId=tr.schoolId
       join dm_cap_truong c on c.id=tr.cap_truong_id`
    );
    return result;
  },

  updateIsAuthSchool: async (schoolId: string, isAuth: boolean = false) => {
    const result = await DangKyThi_TTNN_dataSource.query(
      `update [dm_truong] set isAuth=@0 where schoolId=@1`,
      [isAuth, schoolId]
    );
    return result;
  },

  getByAuthSchool: async (schoolId: string) => {
    const result = await DangKyThi_TTNN_dataSource.query(
      `SELECT isAuth FROM dbo.[dm_truong] WHERE schoolId=@0`,
      [schoolId]
    );
    return result;
  },
};
