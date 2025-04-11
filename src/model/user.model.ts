import { DangKyThi_TTNN_dataSource } from "../data-source.js";
import { dm_role, user } from "../type/interface.js";
import { User } from "../entities/user.js";
import {
  generateSalt,
  hashPassword,
  hashPasswordWithSalt,
} from "../satl_password/hashPassword.js";
import { User_test } from "../entities/user_test.js";
export const UserApi = {
  login: async (
    username: string,
    password: string,
    donviId: string
  ): Promise<user | null> => {
    try {
      //const userRepository = DangKyThi_TTNN_dataSource.getRepository(User);
      const data: any = await DangKyThi_TTNN_dataSource.query(
        `select * from [user] where userName=@0 and donviId=@1 and password=@2`,
        [username, donviId, password]
      );
      // const user = await userRepository.findOne({
      //   where: { userName: username, donviId: donviId, password:password }
      // });
      if (!data) {
        console.error("User not found");
        return null;
      }

      // chưa sử dụng hashPassword
      // const salt = "4fc34310c3af4faa";

      // const hashedPassword = hashPassword(password, 16);
      // const hashedInputPassword = hashPasswordWithSalt(hashedPassword, salt, 16);

      // if (hashedInputPassword === user.password) {
      //   console.log("tên tài khoản:", username)
      //   console.log("mật khẩu đã băm:", hashedInputPassword)
      //   console.log("Login successful");
      //   return user as user;
      // } else {
      //   console.log("Invalid credentials");
      //   return null; // Sai mật khẩu
      // }
      return data[0] as unknown as user;
    } catch (err: any) {
      console.error("Error during login:", err);
      throw err;
    }
  },

  getDmRole: async (): Promise<dm_role> => {
    const data: dm_role = await DangKyThi_TTNN_dataSource.query(
      "Select * from dm_role"
    );
    return data;
  },

  // changePassword: async (
  //   username: string,
  //   password: string,
  //   donviId: string | number,
  //   newPassword: string
  // ): Promise<{ isValid: boolean; error?: string; user?: user }> => {
  //   try {
  //     const data = await DangKyThi_TTNN_dataSource.query(
  //       `SELECT * FROM [user] WHERE username = '${username}' AND password='${password}' AND donviId = '${donviId}'`
  //     );

  //     if (data.length === 0) {
  //       return {
  //         isValid: false,
  //         error: "Sai thông tin người dùng hoặc đơn vị.",
  //       };
  //     }

  //     const user = data[0];

  //     if (password === "123456" || user.password === password) {
  //       // Update the password
  //       const userRepository = DangKyThi_TTNN_dataSource.getRepository(User);
  //       user.password = newPassword;
  //       await userRepository.save(user);

  //       return { isValid: true, user };
  //     }

  //     return { isValid: false, error: "Sai thông tin đăng nhập." };
  //   } catch (err: any) {
  //     console.error("Error in changePassword:", err);
  //     throw new Error("Đã xảy ra lỗi trong quá trình kiểm tra mật khẩu.");
  //   }
  // },

  // changePassword: async (
  //   donviId: string,
  //   oldPassword: string,
  //   newPassword: string
  // ): Promise<boolean> => {
  //   try {
  //     const userRepository = DangKyThi_TTNN_dataSource.getRepository(User);

  //     const user = await userRepository.findOne({
  //       where: { donviId: donviId },
  //     });

  //     if (!user) {
  //       console.error("User not found");
  //       return false; // Người dùng không tồn tại
  //     }

  //     // Lấy chuỗi muối từ cơ sở dữ liệu
  //     const salt = "4fc34310c3af4faa";

  //     // Băm mật khẩu cũ để xác minh
  //     const hashedOldPassword = hashPassword(oldPassword, 16);
  //     const hashedInputOldPassword = hashPasswordWithSalt(
  //       hashedOldPassword,
  //       salt,
  //       16
  //     );

  //     // console.log("password", user.password);

  //     // console.log("hashedInputOldPassword", hashedInputOldPassword);

  //     console.log("Checking password:");
  //     console.log("Old password (input):", oldPassword);
  //     console.log("Hashed old password:", hashedOldPassword);
  //     console.log("Hashed input old password:", hashedInputOldPassword);
  //     console.log("User password from DB:", user.password);

  //     if (hashedInputOldPassword !== user.password) {
  //       console.error("Old password does not match");
  //       return false; // Mật khẩu cũ không khớp
  //     }

  //     // Tạo muối mới và băm mật khẩu mới
  //     const hashedNewPassword = hashPassword(newPassword, 16);
  //     const finalHashedPassword = hashPasswordWithSalt(
  //       hashedNewPassword,
  //       salt,
  //       16
  //     );

  //     // Cập nhật cơ sở dữ liệu
  //     user.password = finalHashedPassword;
  //     await userRepository.save(user);

  //     console.log("Password changed successfully");
  //     return true; // Đổi mật khẩu thành công
  //   } catch (err: any) {
  //     console.error("Error during changePassword:", err);
  //     throw err;
  //   }
  // },

  changePassword: async (
    donviId: string,
    userId: number,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    try {
      // const userRepository = DangKyThi_TTNN_dataSource.getRepository(User);

      // const user = await userRepository.findOne({
      //   where: { donviId: donviId },
      // });

      const user = await DangKyThi_TTNN_dataSource.query(
        `SELECT * FROM dbo.[user] WHERE donviId = @0 AND userId = @1`,
        [donviId, userId]
      );

      const dataUser = user[0];

      if (!dataUser) {
        console.error("User not found");
        return false; // Người dùng không tồn tại
      }

      // console.log("Checking password:");
      // console.log("Old password (input):", oldPassword);
      // console.log("User password from DB:", dataUser.password);

      if (oldPassword !== dataUser.password) {
        console.error("Old password does not match");
        return false; // Mật khẩu cũ không khớp
      }

      // Cập nhật cơ sở dữ liệu với mật khẩu mới
      dataUser.password = newPassword;
      // await userRepository.save(user);
      await DangKyThi_TTNN_dataSource.query(
        `UPDATE dbo.[user] SET password = @0 WHERE donviId = @1 AND userId = @2`,
        [newPassword, donviId, userId]
      );

      console.log("Password changed successfully");
      return true; // Đổi mật khẩu thành công
    } catch (err: any) {
      console.error("Error during changePassword:", err);
      throw err;
    }
  },

  updatePasswordWithSalt: async (userId_test: number): Promise<boolean> => {
    try {
      const userRepository = DangKyThi_TTNN_dataSource.getRepository(User_test);
      const user = await userRepository.findOne({
        where: { userId_test: userId_test },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Tạo muối mới
      const salt = "4fc34310c3af4faa";

      // Băm mật khẩu gốc
      const hashedPassword = hashPassword(user.password_test, 16);

      // Băm thêm lần nữa với muối
      const finalHashedPassword = hashPasswordWithSalt(
        hashedPassword,
        salt,
        16
      );

      // Cập nhật cơ sở dữ liệu
      user.password_test = finalHashedPassword;
      user.active_password = salt;

      await userRepository.save(user);

      return true; // Cập nhật thành công
    } catch (err: any) {
      console.error("Error updating password with salt:", err);
      throw err;
    }
  },

  postUserBep: async (donviId: string, name: string, userName: string) => {
    try {
      const tenTruongResult = await DangKyThi_TTNN_dataSource.query(
        `SELECT TOP 1 
          CASE 
            WHEN CHARINDEX(N' - admin', fullName) > 0 
            THEN LEFT(fullName, CHARINDEX(N' - admin', fullName) - 1) 
            ELSE fullName 
          END AS tenTruong
        FROM dbo.[user] 
        WHERE roleId = 3 AND donviId = @0`,
        [donviId]
      );

      const donviIdResult = await DangKyThi_TTNN_dataSource.query(
        `SELECT TOP 1 donviId 
        FROM dbo.[user] 
        WHERE roleId = 3 AND donviId = @0`,
        [donviId]
      );

      const tenTruong = tenTruongResult[0]?.tenTruong || "";
      const donviIdValue = donviIdResult[0]?.donviId || "";

      const data = await DangKyThi_TTNN_dataSource.query(
        `INSERT INTO dbo.[user] (fullName, roleId, userName, [password], donviId, created_date, roleMenu) 
        VALUES (@0, @1, @2, @3, @4, GETDATE(), @5)`,
        [
          `${tenTruong}${name && name !== ":name" ? ` - ${name}` : " - bếp"}`,
          5,
          userName,
          "123456",
          donviIdValue,
          '{ "isAuthThucDon": false, "isAuthBieuMau3Buoc": false }',
        ]
      );

      console.log("User bếp inserted successfully");
      return data;
    } catch (err: any) {
      console.error("Error during postUserBep:", err);
      throw err;
    }
  },

  getUserBepAn: async (donviId: string) => {
    try {
      const data = await DangKyThi_TTNN_dataSource.query(
        `SELECT fullName, username, password 
        FROM dbo.[user] 
        WHERE donviId = @0 AND roleId = 5`,
        [donviId]
      );
      return data;
    } catch (err: any) {
      console.error("Error during getUserBepAn:", err);
      throw err;
    }
  },
};
