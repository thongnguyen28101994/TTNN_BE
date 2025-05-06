import { raw, RequestHandler } from "express";
import { UserApi } from "../model/user.model";
import Jwt from "jsonwebtoken";
import { hashPassword_test } from "../satl_password/hashPassword";
import { Sys_User } from "../type/interface";
import { SchoolApi } from "../model/school.model";
export const Login: RequestHandler = async (req, res) => {
  const { UserName, Password } = req.body;

  try {
    const data = await UserApi.login(UserName, Password);

    if (data) {
      const tokenPayload = {
        UserId: data.UserId,
        RoleId: data.RoleId,
        FullName: data.FullName,
        ma_truong: data.ma_truong,
        SDT: data.SDT,
      };
      const token = Jwt.sign(tokenPayload, process.env.SECRET_KEY as string);
       res.status(200).json({
        message: "success",
        data: { ...tokenPayload, token },
      });
    } else {
       res.status(200).json({
        message: "Login false",
        data: null,
      });
    }
  } catch (error) {
     res.status(500).json({
      message: `Internal Server Error ${error}`,
    });
  }
};

// API để cập nhật mật khẩu
export const updatePassword_Hash: RequestHandler = async (req, res) => {
  const { UserId_test } = req.body; // Giả sử bạn gửi `UserId` trong body

  try {
    const success = await UserApi.updatePasswordWithSalt(UserId_test);
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
//         const { username, password, ma_truong } = req.params;
//         if (!username || !password || !ma_truong) {
//              res.status(400).json({
//                 message: "Thông tin đầu vào không đầy đủ.",
//                 success: false,
//             });
//         }
//
//         const result = await UserApi.checkPassword(username, password, ma_truong);
//
//         if (result.isValid) {
//              res.status(200).json({
//                 message: "Mật khẩu hợp lệ.",
//                 success: true,
//             });
//         } else {
//              res.status(400).json({
//                 message: result.error || "Sai thông tin đăng nhập.",
//                 success: false,
//             });
//         }
//     } catch (err: any) {
//         console.error("Error in checkUserPassword:", err);
//          res.status(500).json({
//             message: "Đã xảy ra lỗi trong quá trình kiểm tra mật khẩu.",
//             success: false,
//         });
//     }
// };

export const update_password: RequestHandler = async (req, res) => {
  try {
    const { ma_truong, OldPassword, NewPassword, UserId } = req.body;

    console.log(ma_truong, OldPassword, NewPassword);

    if (!ma_truong || !OldPassword || !NewPassword || !UserId) {
       res.status(400).json({
        message: "Thông tin đầu vào không đầy đủ.",
        success: false,
      });
    }

    const isChaned = await UserApi.changePassword(
      ma_truong,
      UserId,
      OldPassword,
      NewPassword
    );

    if (isChaned) {
       res.status(200).json({
        message: "Thay đổi mật khẩu thành công.",
        success: true,
      });
    } else {
       res.status(500).json({
        message: "Mật khẩu cũ không đúng hoặc không tìm thấy người dùng.",
        success: false,
      });
    }
  } catch (err: any) {
    console.error("Error in changeUserPassword:", err);
     res.status(500).json({
      message: "Đã xảy ra lỗi trong quá trình thay đổi mật khẩu.",
      success: false,
    });
  }
};

export const generateSalt: RequestHandler = async (req, res) => {
  try {
     res.status(200).json({
      message: "success",
      data: hashPassword_test.generateSalt(16),
    });
  } catch (error) {
    console.error(error);
     res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const verifyPassword: RequestHandler = async (req, res) => {
  try {
    const { password } = req.body as { password: string };
     res.status(200).json({
      message: "success",
      data: hashPassword_test.verifyPassword(
        password,
        "ac4c9c53788e79183ab05a1730e1392a"
      ),
    });
  } catch (error) {
    console.error(error);
     res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const GetUserList: RequestHandler = async (req, res) => {
  const data = await UserApi.getListUser();
   res.status(200).json({
    message: "success",
    data,
  });
};

export const AddUser: RequestHandler = async (req, res) => {
  try {
    const params: Sys_User = req.body;
    SchoolApi.addSchool(params);
    await UserApi.addUser(params);
     res.status(200).json({
      message: "success",
      data: params,
    });
  } catch (error) {
     res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const UpdateUser: RequestHandler = async (req, res) => {
  try {
    const params: Sys_User = req.body;
    await SchoolApi.updateSchool(params);
    const isUserExist = await UserApi.checkUserExistsBySchoolId(params.ma_truong,params.UserName);
    if (isUserExist.length>0) {
      UserApi.updateUser(params);
       res.status(200).json({
        message: "success",
        data: params,
      });
    } else {
      UserApi.addUser(params);
       res.status(200).json({
        message: "success",
        data: params,
      });
    }
  } catch (error) {
     res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const GetRoleList: RequestHandler = async (req, res) => {
  try {
    const result = await UserApi.getDmRole();
     res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    console.error(error);
     res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
