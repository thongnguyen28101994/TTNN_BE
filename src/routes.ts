import express, { RequestHandler } from "express";
import path from "path";

import cors from "cors";
import {
  GetDm_DiaChiBoiDuong,
  getDm_HinhThucDangKy,
  GetDmHuyen,
  GetDmTruong,
  GetThongTinTruong,
} from "./controllers/common.controller.js";

import {
  danhSachBepAn,
  generateSalt,
  Login,
  themUserBep,
  update_password,
  updatePassword_Hash,
  verifyPassword,
} from "./controllers/user.controller.js";
import {
  addAndUpdateFoodCompanyToSchool,
  addCompanyToSchool,
  danhSachByIsAuthBySchool,
  deleteCompanyBySchool,
  getCompanyBySchoolId,
  getListCompanySetBySchool,
  updateIsAuthBySchool,
} from "./controllers/school.controller.js";
import {
  FileServer,
  createBucket_v2,
  createFolderFileServer,
  deleteFileGoogle,
  // downloadFile_v2,
  // downloadImage_v2,
  getFileGoogle,
  getListBucket,
  getListFile_v2,
  uploadFileImageBase64,
  uploadFile_v2,
  uploadMultiFile_congdoan,
  uploadMultiFile_v2,
  uploadMultiImage_v2,
  viewFile_v2,
} from "./controllers/file.controller.js";
import multer from "multer";




// import {getListhocsinh, addStudent} from "./controllers/hocsinh.controller.js";

import { getInfo_HS } from "./controllers/qr_check.controller.js";
import { validateRequestMiddleware } from "./middleware/RequestMiddleware.js";
import { getListKhoaHoc } from "./controllers/khoahoc.controller.js";
import { addHocVien, getListHocVien } from "./controllers/hocvien.controller.js";

const router = express.Router();


/**
 * common route
 */

router.get("/huyen", GetDmHuyen);
router.get("/truong/:pgdId", GetDmTruong);
router.get("/truong/thongtin/:schoolId", GetThongTinTruong);
router.get("/diachiboiduong", GetDm_DiaChiBoiDuong);
router.get("/hinhthucdangky", getDm_HinhThucDangKy);



/**
 * school
 */

router.get("/school/getCompanyBySchoolId/:id", getCompanyBySchoolId);
router.post("/school/add", addCompanyToSchool);
router.post("/school/add_update", addAndUpdateFoodCompanyToSchool);
router.delete("/school/delete/:id", deleteCompanyBySchool);
router.get("/school/getListCompanySetBySchool/", getListCompanySetBySchool);
router.put("/school/update/:schoolId/:isAuth", updateIsAuthBySchool);
router.get("/school/getList/:schoolId", danhSachByIsAuthBySchool);

// tài khoản user
router.post("/user/add/:donviId/:name/:username", themUserBep);
router.get(`/user/getList/:donviId`, danhSachBepAn);

/**
 * auth
 */
//router.post("/auth/login", validateRequestMiddleware, Login);
router.post("/auth/login", Login);
// router.post("/auth/check_passwrod/:username/:password/:donviId", checkUserPassword)
router.post("/auth/change_password", update_password);

router.post("/auth/updatepasssword", updatePassword_Hash);

router.get("/auth/generateSalt", generateSalt);
router.post("/auth/verifyPassword", verifyPassword);

const upload = multer({ dest: "uploads/" });
/**
 * file
 */
router.post("/file/upload", upload.single("files"), FileServer);

router.post("/file/createFolder", createFolderFileServer);

router.get("/file/get/:id", getFileGoogle);
router.delete("/file/delete/:id", deleteFileGoogle);

router.post("/file/getImageBase64", uploadFileImageBase64);

/**
 * Học sinh
 */
router.post("/hocvien/add", addHocVien);
router.get("/hocvien/getList", getListHocVien);
// router.delete(
//   "/deleteStudent/:schoolId/:ma_dinh_danh/:ho_ten/:lop",
//   deleteStudent
// );

/**
 * Khoá học
 */
router.get("/khoahoc",getListKhoaHoc);
/**
 * QR check
 */
router.post("/check_QR/:lop/:sdt_ph/:schoolId", getInfo_HS);


export default router;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define your uploads folder
  },
  filename: (req, file, cb) => {
    const { schoolId } = req.params;
    const uniqueSuffix = schoolId ? schoolId + "-" + Date.now() : Date.now();
    cb(
      null,
      uniqueSuffix +
        "-" +
        path.parse(Buffer.from(file.originalname, "latin1").toString("utf8"))
          .name
    );
  },
});

const upload_v2 = multer({ storage: storage });

export const uploadRouter = express.Router();

uploadRouter.get("/getListBucket", getListBucket);
uploadRouter.post("/createBucket", createBucket_v2);
uploadRouter.get("/getListFile/:bucketName/:suffix", getListFile_v2);
uploadRouter.get("/view/:bucketName/:fileName", viewFile_v2);

// viết tạm schoolId sau này dùng JWT
uploadRouter.post(
  "/uploadMultiImage/:schoolId",
  upload_v2.array("images", 3),
  uploadMultiImage_v2
);
// uploadRouter.post("/downloadImage", downloadImage_v2);

uploadRouter.post("/uploadFile", upload_v2.single("file"), uploadFile_v2);
// uploadRouter.post("/downloadFile", downloadFile_v2);
// viết tạm schoolId sau này dùng JWT
uploadRouter.post(
  "/uploadMultiFile/:schoolId",
  upload_v2.array("files", 3),
  uploadMultiFile_v2
);

//upload file cho công đoàn
uploadRouter.post(
  "/uploadMultiFileCongDoan",
  upload_v2.array("files", 3),
  uploadMultiFile_congdoan
);


