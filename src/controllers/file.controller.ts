import { RequestHandler } from "express";
import {
  authorize,
  createFolder,
  getFile,
  uploadFile,
  deleteFile,
  uploadFileImageWithBase64,
} from "../ultils/uploadFile.js";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import {
  checkBucketList,
  createBucket,
  deleteTempFile,
  // downloadFileFromBucket,
  getListFile,
  uploadFileToBucket,
  uploadImageToBucket,
  viewFile,
} from "../ultils/uploads/upload_v2.js";
import { error } from "console";
import { BucketItem } from "minio";

export const FileServer: RequestHandler = async (req, res) => {
  try {
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = dirname(__filename);
    if (!req.file) return res.status(400).json("Chưa có file tải lên");
    const auth = await authorize();
    const result = await uploadFile(auth, req.file);
    if (result) {
      return res.status(200).json({
        message: "File upload thành công",
        statusCode: 200,
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    // res.json({ status: -1, message: "failure", err: error.message });
  }
};

export const getFileGoogle: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const auth = await authorize();
    const result = await getFile(auth, id);
    if (result) {
      return res.status(200).json("File upload thành công");
    }
  } catch (error) {
    console.log(error);
    // res.json({ status: -1, message: "failure", err: error.message });
  }
};

export const deleteFileGoogle: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const auth = await authorize();
    const result = await deleteFile(auth, id);
    if (result) {
      return res.status(200).json("File upload thành công");
    }
  } catch (error) {
    console.log(error);
    // res.json({ status: -1, message: "failure", err: error.message });
  }
};

export const createFolderFileServer: RequestHandler = async (req, res) => {
  try {
    const auth = await authorize();
    const result = await createFolder(auth);
    if (result) {
      return res.status(200).json("File upload thành công");
    }
  } catch (error) {
    console.log(error);
    // res.json({ status: -1, message: "failure", err: error.message });
  }
};

export const uploadFileImageBase64: RequestHandler = async (req, res) => {
  try {
    const { img } = req.body;
    const auth = await authorize();
    const data = await uploadFileImageWithBase64(auth, img);
    if (data) {
      return res.status(200).json({
        message: "File upload thành công",
        statusCode: 200,
        data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// upload v2

export const getListBucket: RequestHandler = async (_, res) => {
  try {
    const bucket = await checkBucketList();
    return res.status(200).json({
      message: "Success",
      data: bucket,
    });
  } catch (err) {
    console.log(err);
  }
};

const imageBucket = "hinhanh";
const fileBucket = "file";

export const createBucket_v2: RequestHandler = async (req, res) => {
  try {
    const { bucketName } = req.body;
    if (bucketName) {
      const result = await createBucket(bucketName);
      res.status(200).json({
        message: "success",
        data: result,
      });
    } else {
      throw error("Lỗi khi tạo thư mục");
    }
  } catch (err: any) {
    return res.status(500).json({
      message: err,
      data: null,
    });
  }
};


export const uploadMultiImage_v2: RequestHandler = async (req, res) => {
  try {
    const { files } = req;
    if (!files) return res.status(400).json("Chưa có file tải lên");
   
    let listFile = [];
    for (const file of files as Express.Multer.File[]) {
      const img = await sharp(file.path as string).metadata();
      const originFileName = file.originalname;
      const fileName = file.filename;
      const mimeType = file.mimetype;
      switch (img.format) {
        case "png":
          await sharp(file.path as string)
            .png({ quality: 50 })
            .withMetadata()
            .toFile(
              path.join(
                "uploads",
                `${file.filename}${path.extname(file.originalname)}`
              )
            ).then(()=>{
              fs.unlink(file.path as string, (err) => {
                console.log(err);
              });
            });
          break;
        case "jpg":
        case "jpeg":
        case "heif":
        case "webp":
          await sharp(file.path as string)
            .jpeg({ mozjpeg:true, quality: 50 })
            .withMetadata()
            .toFile(
              path.join(
                "uploads",
                `${file.filename}${path.extname(file.originalname)}`
              )
            ).then(()=>{
              fs.unlink(file.path as string, (err) => {
                console.log(err);
              });
            });

          break;
        default:
          break;
      }
      const result = await uploadImageToBucket(
        imageBucket,
        fileName,
        originFileName,
        mimeType,
        true
      );
      listFile.push(result);
    }
    // for(const file of files as Express.Multer.File[])
    // {
    //    fs.unlinkSync(file.path as string)
    // }
    return res.status(200).json({
      message: "success",
      data: listFile,
    });
  } catch (err: any) {
    return res.status(500).json({
      message: err,
      data: null,
    });
  }
};

export const uploadFile_v2: RequestHandler = async (req, res) => {
  try {
    const { file } = req;
    if (!file) return res.status(400).json("Chưa có file tải lên");
    const result = await uploadFileToBucket(fileBucket, file, false);
    return res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      message: err,
      data: null,
    });
  }
};

export const uploadMultiFile_v2: RequestHandler = async (req, res) => {
  try {
    const { files } = req;
    let listFile = [];
    if (!files) return res.status(400).json("Chưa có file tải lên");
    for (const file of files as Express.Multer.File[]) {
      const result = await uploadFileToBucket(fileBucket, file, false);
      listFile.push(result);
    }

    return res.status(200).json({
      message: "success",
      data: listFile,
    });
  } catch (err: any) {
    return res.status(500).json({
      message: err,
      data: null,
    });
  }
};

export const uploadMultiFile_congdoan: RequestHandler = async (req, res) => {
  try {
    const { files } = req;
    let listFile = [];
    if (!files) return res.status(400).json("Chưa có file tải lên");
    for (const file of files as Express.Multer.File[]) {
      const result = await uploadFileToBucket("congdoan", file, false);
      listFile.push(result);
    }

    return res.status(200).json({
      message: "success",
      data: listFile,
    });
  } catch (err: any) {
    return res.status(500).json({
      message: err,
      data: null,
    });
  }
};

// export const downloadImage_v2: RequestHandler = async (req, res) => {
//   try {
//     const { key, fileName } = req.body;
//     const result = await downloadFileFromBucket(imageBucket, { key, fileName });
//     let size = 0;
//     const chunks: any = [];
//     result.fileDownload.on("data", (c) => {
//       (size += c.length), chunks.push(c);
//     });
//     result.fileDownload.on("end", () => {
//       const buffer = Buffer.concat(chunks, size);
//       res.set(result.metaData);
//       res.setHeader("Content-Disposition", `attachment; filename=${key}`);
//       res.status(200).send(buffer);
//     });
//   } catch (err: any) {
//     return res.status(500).json({
//       message: err,
//       data: null,
//     });
//   }
// };

// export const downloadFile_v2: RequestHandler = async (req, res) => {
//   try {
//     const { key, fileName } = req.body;
//     const result = await downloadFileFromBucket(fileBucket, { key, fileName });
//     let size = 0;
//     const chunks: any = [];
//     result.fileDownload.on("data", (c) => {
//       (size += c.length), chunks.push(c);
//     });
//     result.fileDownload.on("end", () => {
//       const buffer = Buffer.concat(chunks, size);
//       res.set(result.metaData);
//       res.setHeader("Content-Disposition", `attachment; filename=${key}`);
//       res.status(200).send(buffer);
//     });
//   } catch (err: any) {
//     return res.status(500).json({
//       message: err,
//       data: null,
//     });
//   }
// };

export const getListFile_v2: RequestHandler = async (req, res) => {
  try {
    const { bucketName, suffix } = req.params;
    let fileNameList: string[] = [];
    const result = await getListFile(bucketName, suffix);
    result.on("data", (item: BucketItem) => {
      if (item.name) fileNameList.push(item.name);
    });
    result.on("end", () => {
      res
        .status(200)
        .send({ message: "lấy danh sách file thành công", data: fileNameList });
    });
  } catch (err: any) {
    return res.status(500).json({
      message: err,
      data: null,
    });
  }
};

export const viewFile_v2: RequestHandler = async (req, res) => {
  try {
    const { bucketName, fileName } = req.params;
    const result = await viewFile(bucketName, fileName);
    if (result)
      res.status(200).json({
        message: "success",
        data: result,
      });
  } catch (err: any) {
    return res.status(500).json({
      message: err,
      data: null,
    });
  }
};
