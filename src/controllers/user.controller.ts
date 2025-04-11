import { raw, RequestHandler } from "express";
import { UserApi } from "../model/user.model.js";
import Jwt from "jsonwebtoken";
import { hashPassword_test } from "../satl_password/hashPassword.js";
export const Login: RequestHandler = async (req, res) => {
  const { username, password, donviId } = req.body;

  try {
    const data = await UserApi.login(username, password, donviId);
    if (data) {
      const tokenPayload = {
        userId: data.userId,
        roleId: data.roleId,
        fullName: data.fullName,
        donviId: data.donviId,
      };

      const token = Jwt.sign(tokenPayload, process.env.SECRET_KEY as string);
      return res.status(200).json({
        message: "success",
        data: { ...tokenPayload, token },
      });
    }

    return res.status(200).json({
      message: "not success",
      data: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Internal Server Error ${error}`,
    });
  }
};

// API để cập nhật mật khẩu
export const updatePassword_Hash: RequestHandler = async (req, res) => {
  const { userId_test } = req.body; // Giả sử bạn gửi `userId` trong body

  try {
    const success = await UserApi.updatePasswordWithSalt(userId_test);
    if (success) {
      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(400).json({ message: "Failed to update password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating password" });
  }
};

//tạm thời không check ở Back-end
// export const checkUserPassword:RequestHandler = async (req , res) => {
//     try {
//         const { username, password, donviId } = req.params;
//         if (!username || !password || !donviId) {
//             return res.status(400).json({
//                 message: "Thông tin đầu vào không đầy đủ.",
//                 success: false,
//             });
//         }
//
//         const result = await UserApi.checkPassword(username, password, donviId);
//
//         if (result.isValid) {
//             return res.status(200).json({
//                 message: "Mật khẩu hợp lệ.",
//                 success: true,
//             });
//         } else {
//             return res.status(400).json({
//                 message: result.error || "Sai thông tin đăng nhập.",
//                 success: false,
//             });
//         }
//     } catch (err: any) {
//         console.error("Error in checkUserPassword:", err);
//         return res.status(500).json({
//             message: "Đã xảy ra lỗi trong quá trình kiểm tra mật khẩu.",
//             success: false,
//         });
//     }
// };

export const update_password: RequestHandler = async (req, res) => {
  try {
    const { donviId, oldPassword, newPassword, userId } = req.body;

    console.log(donviId, oldPassword, newPassword);

    if (!donviId || !oldPassword || !newPassword || !userId) {
      return res.status(400).json({
        message: "Thông tin đầu vào không đầy đủ.",
        success: false,
      });
    }

    const isChaned = await UserApi.changePassword(
      donviId,
      userId,
      oldPassword,
      newPassword
    );

    if (isChaned) {
      return res.status(200).json({
        message: "Thay đổi mật khẩu thành công.",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Mật khẩu cũ không đúng hoặc không tìm thấy người dùng.",
        success: false,
      });
    }
  } catch (err: any) {
    console.error("Error in changeUserPassword:", err);
    return res.status(500).json({
      message: "Đã xảy ra lỗi trong quá trình thay đổi mật khẩu.",
      success: false,
    });
  }
};

export const generateSalt: RequestHandler = async (req, res) => {
  try {
    return res.status(200).json({
      message: "success",
      data: hashPassword_test.generateSalt(16),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const verifyPassword: RequestHandler = async (req, res) => {
  try {
    const { password } = req.body as { password: string };
    return res.status(200).json({
      message: "success",
      data: hashPassword_test.verifyPassword(
        password,
        "ac4c9c53788e79183ab05a1730e1392a"
      ),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const themUserBep: RequestHandler = async (req, res) => {
  try {
    const { username, name, donviId } = req.params;
    if (!username || !name || !donviId) {
      return res.status(400).json({
        message: "Thông tin đầu vào không đầy đủ.",
        success: false,
      });
    }

    await UserApi.postUserBep(donviId, name, username);

    return res.status(200).json({
      message: "Thêm user thành công.",
      success: true,
    });
  } catch (err: any) {
    console.error("Error in themUserBep:", err);
    return res.status(500).json({
      message: "Đã xảy ra lỗi trong quá trình thêm user.",
      success: false,
    });
  }
};

export const danhSachBepAn: RequestHandler = async (req, res) => {
  const { donviId } = req.params;
  try {
    const data = await UserApi.getUserBepAn(donviId);
    return res.status(200).json({
      message: "success",
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
