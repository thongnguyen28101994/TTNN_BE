import {RequestHandler} from "express";
import {hoc_vien} from "../type/interface";
import { HocVienApi } from "../model/hocvien.model";


export const getListHocVien:RequestHandler = async (req,res) =>{
    const data = await HocVienApi.getDSHocVien();
     res.status(200).json({
        message:"success",
        data,
    })
}
export const getInfoHocVien: RequestHandler = async(req,res)=>{
    const hoc_vien:{maDinhDanh:string,hoTen:string}= req.body;
    const data = await HocVienApi.getHocVienByCCCD(hoc_vien.maDinhDanh,hoc_vien.hoTen);
     res.status(200).json({
        message:"success",
        data,
    })
}
export const getDSHocVienByUser: RequestHandler = async(req,res)=>{
    const params:{ma_truong:string,ma_khoa_hoc:string} = req.body
    const data = await HocVienApi.getDSHocVienByUser(params.ma_truong,params.ma_khoa_hoc);
     res.status(200).json({
        message:"success",
        data,
    })
}
export const addHocVien: RequestHandler = async (req, res) => {
    try {
        const students: hoc_vien[] = req.body;

        if (!Array.isArray(students) || students.length === 0) {
             res.status(400).json({ message: "Invalid input data. Expected a non-empty array of students." });
        }

        await HocVienApi.addHocVien(students);
         res.status(200).json({ message: "Students added successfully." });
    } catch (err: any) {
        console.error("Error in AddHocSinh:", err);
         res.status(500).json({ message: "Failed to add students.", error: err.message });
    }
};

export const getDSHocVienByAdmin: RequestHandler = async(req,res)=>{
    const data = await HocVienApi.AdminGetHocVienList();
     res.status(200).json({
        message:"success",
        data,
    })
}


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