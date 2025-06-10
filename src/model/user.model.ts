
import { Sys_Role, Sys_User } from "../type/interface";
import {
  generateSalt,
  hashPassword,
  hashPasswordWithSalt,
} from "../satl_password/hashPassword";
import { User_test } from "../entities/user_test";
import DangKyThi_TTNN_dataSource from "../dbs/data_source";
export const UserApi = {
  login: async (
    UserName: string,
    Password: string
  ): Promise<Sys_User | null> => {
    try {
      const data: any = await DangKyThi_TTNN_dataSource.query(
        `select Sys_User.*,School.SDT,School.TenTruong from Sys_User join School on School.ma_truong=Sys_User.ma_truong where UserName = @0  and Password = @1`,
        [UserName, Password]
      );
      if (!data) {
        console.error("User not found");
        return null;
      }
      return data[0] as unknown as Sys_User;
    } catch (err: any) {
      console.error("Error during login:", err);
      throw err;
    }
  },

  getDmRole: async (): Promise<Sys_Role[]> => {
    const data: Sys_Role[] = await DangKyThi_TTNN_dataSource.query(
      "Select * from Sys_Role"
    );
    return data;
  },

  getDmUser: async () : Promise<Sys_User[]>=>{
    const data: Sys_User[]= await DangKyThi_TTNN_dataSource.query(`select School.CapTruongId,School.DistrictId,School.TenTruong,School.SoNhaTenDuong,School.MaSoThue,School.NguoiDaiDien,Sys_User.UserName 
              from Sys_User join School on Sys_User.ma_truong=School.ma_truong`);
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
    ma_truong: string,
    UserId: number,
    OldPassword: string,
    NewPassword: string
  ): Promise<boolean> => {
    try {
      // const userRepository = DangKyThi_TTNN_dataSource.getRepository(User);

      // const user = await userRepository.findOne({
      //   where: { donviId: donviId },
      // });

      const user = await DangKyThi_TTNN_dataSource.query(
        `SELECT * FROM Sys_User WHERE ma_truong = @0 AND UserId = @1`,
        [ma_truong, UserId]
      );

      const dataUser = user[0];

      if (!dataUser) {
        console.error("User not found");
        return false; // Người dùng không tồn tại
      }

      // console.log("Checking password:");
      // console.log("Old password (input):", oldPassword);
      // console.log("User password from DB:", dataUser.password);
      if (OldPassword !== dataUser.Password) {
        console.error("Old password does not match");
        return false; // Mật khẩu cũ không khớp
      }

      // Cập nhật cơ sở dữ liệu với mật khẩu mới
      dataUser.password = NewPassword;
      // await userRepository.save(user);
      await DangKyThi_TTNN_dataSource.query(
        `UPDATE Sys_User SET Password = @0 WHERE ma_truong = @1 AND UserId = @2`,
        [NewPassword, ma_truong, UserId]
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

  /**Admin */
  getListUser: async (): Promise<Sys_User[]> => {
    try {
      const data:Sys_User[]  = await DangKyThi_TTNN_dataSource.query(
        `select School.*,Sys_User.FullName,Sys_User.UserName,Sys_User.RoleId from Sys_User 
join Sys_Role on Sys_User.RoleId=Sys_Role.Id
join School on Sys_User.ma_truong=School.ma_truong`
      );
      return data;
    } catch (err: any) {
      console.error("Error :", err);
      throw err;
    }
  },

  addUser: async (param:Sys_User) => {
    const data: any = await DangKyThi_TTNN_dataSource.query(
      `insert into Sys_User(ma_truong,FullName,RoleId,UserName) values(@0,@1,@2,@3)`,[param.ma_truong,param.FullName,param.RoleId,param.UserName]
    ).catch(err => {
      throw err;
    })
   return data;
  },

  updateUser: async(param:Sys_User) => {
    const data: any = await DangKyThi_TTNN_dataSource.query(
      `update Sys_User set ma_truong= @0,FullName= @1,RoleId= @2,UserName= @3 where UserName= @3 and ma_truong= @0`,[param.ma_truong,param.FullName,param.RoleId,param.UserName]
    ).catch(err => {
      throw err;
    })
   return data;
  },
  checkUserExistsBySchoolId: async(ma_truong:string,UserName:string)=>{
    const data: any = await DangKyThi_TTNN_dataSource.query(
      `select 1 from Sys_User where ma_truong= @0 and UserName = @1`,[ma_truong,UserName]
    ).catch(err => {
      throw err;
    })
   return data;
  }
};
