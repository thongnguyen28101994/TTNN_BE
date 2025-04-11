import { DangKyThi_TTNN_dataSource } from "../data-source.js";
import { hoc_sinh } from "../type/interface.js";

export const Hoc_SinhAPI = {
  getListhocsinh: async (schoolId: string): Promise<hoc_sinh[]> => {
    const result: hoc_sinh[] = await DangKyThi_TTNN_dataSource.query(
      `Select * from hoc_sinh where schoolId=@0`,
      [schoolId]
    );
    return result;
  },

  addStudent: async (students: hoc_sinh[]) => {
    function safeSplit(dateValue: any): string | null {
      if (!dateValue) return null;
      if (typeof dateValue === "string") {
        const dateParts = dateValue.split("/");
        if (dateParts.length === 3) {
          return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        }
        return dateValue.split("T")[0];
      }
      if (dateValue instanceof Date) {
        return dateValue.toISOString().split("T")[0];
      }
      console.error("Unexpected date type:", dateValue);
      return null;
    }

    try {
      const formattedData = students.map((student) => ({
        ...student,
        ngay_sinh: safeSplit(student.ngay_sinh),
        created_date: safeSplit(student.created_date),
      }));

      const json = JSON.stringify(formattedData);
      return await DangKyThi_TTNN_dataSource.query(
        `INSERT INTO hoc_sinh(
           schoolId, nam_hoc_id, ma_dinh_danh, ho_ten, ngay_sinh, 
           lop, email_ph, sdt_ph, userName, password, isActive, 
           created_date
         )
         SELECT * FROM OPENJSON(@0)
         WITH (
           schoolId NVARCHAR(500),
           nam_hoc_id INT,
           ma_dinh_danh NVARCHAR(500),
           ho_ten NVARCHAR(500),
           ngay_sinh DATE,
           lop NVARCHAR(500),
           email_ph NVARCHAR(500),
           sdt_ph NVARCHAR(500),
           userName NVARCHAR(500),
           password NVARCHAR(500),
           isActive BIT,
           created_date DATETIME
         )`,
        [json]
      );
    } catch (err: any) {
      console.error("Error in addStudent query:", err);
      throw err;
    }
  },

  deleteStudent: async (
    schoolId: string,
    ma_dinh_danh: number | string,
    ho_ten: string,
    lop: string
  ): Promise<hoc_sinh[]> => {
    const results: hoc_sinh[] = await DangKyThi_TTNN_dataSource.query(
      `DELETE FROM hoc_sinh 
       WHERE schoolId=@0 
         AND ma_dinh_danh=@1 
         AND ho_ten=@2 
         AND lop=@3`,
      [schoolId, ma_dinh_danh.toString(), ho_ten, lop]
    );
    return results;
  },

  deleteRating: async (cId: number) => {
    const result = await DangKyThi_TTNN_dataSource.query(
      `Delete from mon_an_danh_gia where mon_an_id=@0`,
      [cId]
    );
    return result;
  },

  updateStudent: async (student: hoc_sinh): Promise<hoc_sinh[]> => {
    try {
      let json = JSON.stringify(student);
      const result: hoc_sinh[] = await DangKyThi_TTNN_dataSource.query(
        `UPDATE hoc_sinh
         SET nam_hoc_id=J.nam_hoc_id,
             ho_ten=J.ho_ten,
             ngay_sinh=J.ngay_sinh,
             lop=J.lop,
             email_ph=J.email_ph,
             sdt_ph=J.sdt_ph,
             userName=J.userName,
             password=J.password,
             isActive=J.isActive,
             created_date=J.created_date
         FROM OPENJSON(@0) 
         WITH (
           schoolId NVARCHAR(500),
           nam_hoc_id INT,
           ma_dinh_danh NVARCHAR(500),
           ho_ten NVARCHAR(500),
           ngay_sinh DATE,
           lop NVARCHAR(500),
           email_ph NVARCHAR(500),
           sdt_ph NVARCHAR(500),
           userName NVARCHAR(500),
           password NVARCHAR(500),
           isActive BIT,
           created_date DATETIME
         ) J
         WHERE hoc_sinh.schoolId=J.schoolId 
           AND hoc_sinh.ma_dinh_danh=J.ma_dinh_danh`,
        [json]
      );
      return result;
    } catch (err: any) {
      console.error("Error in updateStudent query:", err);
      throw err;
    }
  },
};
