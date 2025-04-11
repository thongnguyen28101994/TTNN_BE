import { Hoc_SinhAPI } from "../model/hoc_sinh.model.js";
export const getListhocsinh = async (req, res) => {
    const { schoolId } = req.params;
    const data = await Hoc_SinhAPI.getListhocsinh(schoolId);
    return res.status(200).json({
        message: "success",
        data,
    });
};
export const addStudent = async (req, res) => {
    try {
        const students = req.body;
        if (!Array.isArray(students) || students.length === 0) {
            return res.status(400).json({ message: "Invalid input data. Expected a non-empty array of students." });
        }
        await Hoc_SinhAPI.addStudent(students);
        return res.status(200).json({ message: "Students added successfully." });
    }
    catch (err) {
        console.error("Error in AddHocSinh:", err);
        return res.status(500).json({ message: "Failed to add students.", error: err.message });
    }
};
export const deleteStudent = async (req, res) => {
    const { schoolId, ma_dinh_danh, ho_ten, lop } = req.params;
    const data = await Hoc_SinhAPI.deleteStudent(schoolId, ma_dinh_danh, ho_ten, lop);
    if (data) {
        return res.status(200).json({
            message: "success",
            data,
        });
    }
    if (!data) {
        return res.status(404).json({
            message: "Hông tìm thấy dữ liệu",
            data,
        });
    }
};
//# sourceMappingURL=hocsinh.controller.js.map