import {RequestHandler} from "express";
import {hoc_vien} from "../type/interface.js";
import { HocVienApi } from "../model/hocvien.model.js";


export const getListHocVien:RequestHandler = async (req,res) =>{
    const data = await HocVienApi.getDSHocVien();
    return res.status(200).json({
        message:"success",
        data,
    })
}
export const addHocVien: RequestHandler = async (req, res) => {
    try {
        const students: hoc_vien[] = req.body;

        if (!Array.isArray(students) || students.length === 0) {
            return res.status(400).json({ message: "Invalid input data. Expected a non-empty array of students." });
        }

        await HocVienApi.addHocVien(students);
        return res.status(200).json({ message: "Students added successfully." });
    } catch (err: any) {
        console.error("Error in AddHocSinh:", err);
        return res.status(500).json({ message: "Failed to add students.", error: err.message });
    }
};


// export  const deleteStudent: RequestHandler = async (req, res) =>{
//         const {schoolId, ma_dinh_danh, ho_ten, lop} = req.params
//         const data = await Hoc_SinhAPI.deleteStudent(schoolId, ma_dinh_danh, ho_ten, lop)

//     if (data)
//     {
//         return res.status(200).json({
//             message:"success",
//             data,
//         })
//     }
//     if(!data)
//     {
//         return res.status(404).json({
//             message:"Hông tìm thấy dữ liệu",
//             data,
//         })
//     }
// }