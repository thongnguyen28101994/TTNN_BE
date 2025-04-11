import { DangKyThi_TTNN_dataSource } from "../data-source.js";
export const QrCheck_API = {
    getInfo: async (lop, sdt_ph, schoolId) => {
        const result = await DangKyThi_TTNN_dataSource.query(`SELECT CASE WHEN COUNT(*) > 0 THEN 'true' ELSE 'false' END AS isMatch 
       FROM hoc_sinh 
       WHERE lop=@0 AND sdt_ph=@1 AND schoolId=@2`, [lop, sdt_ph, schoolId]);
        return result[0]?.isMatch === "true";
    },
};
//# sourceMappingURL=qr_check.model.js.map