import express from "express";
import { BucketItem, Client } from "minio";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
import { error } from "console";
import path from "path";

dotenv.config();
export interface FileObj {
  key: string;
  originName: string;
  mimeType?: string;
}

export interface Result {
  message: string;
  data: FileObj | undefined;
}

export const deleteTempFile = async (filePath: string) => {
  fs.unlinkSync(filePath);
};

// kết nối với minio service
const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT as string,
  // port:process.env.MINIO_PORT as unknown as number,
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY as string,
  secretKey: process.env.MINIO_PRIVATE_KEY as string,
});

//lấy list bucket
export const checkBucketList = async () => {
  return await minioClient.listBuckets();
};

export const createBucket = async (bucketName: string) => {
  try {
    const isExists = await minioClient.bucketExists(bucketName);
    if (!isExists) {
      await minioClient.makeBucket(bucketName);
      return bucketName;
    } else {
      throw error("Thư mục đã tồn tại");
    }
  } catch (err: any) {
    throw error(err);
  }
};

export const viewFile = async (bucketName: string, fileName: string) => {
  try {
    //check bucket exists
    const isExists = await minioClient.bucketExists(bucketName);
    if (!isExists) {
      throw error(`Không tìm thấy thư mục tên ${bucketName}`);
    }
    //return await minioClient.presignedUrl('GET',bucketName,'',60*60,{prefix:fileName});
    return await minioClient.presignedUrl("GET", bucketName, fileName, 60 * 60);
  } catch (err: any) {
    throw err;
  }
};

export const getListFile = async (bucketName: string, prefix: string = "") => {
  try {
    //check bucket exists
    const isExists = await minioClient.bucketExists(bucketName);
    if (!isExists) {
      //await minioClient.makeBucket(bucketName);
      throw error(`Không tìm thấy thư mục tên ${bucketName}`);
    }
    return minioClient.listObjectsV2(bucketName, prefix);
  } catch (err: any) {
    throw err;
  }
};

export const uploadImageToBucket = async (
  bucketName: string,
  fileName: string,
  fileOrigin: string,
  fileMimeType: string,
  isImage: boolean
) => {
  try {
    //check bucket exists
    const isExists = await minioClient.bucketExists(bucketName);
    if (!isExists) {
      throw error(`Không tìm thấy thư mục tên ${bucketName}`);
    }
    const metaData = {
      "Content-Type": fileMimeType,
    };
    await minioClient.fPutObject(
      bucketName,
      `${fileName}${path.extname(fileOrigin)}`,
      `uploads/${fileName}${path.extname(fileOrigin)}`,
      metaData
    );
    if (isImage)
      await deleteTempFile(
        path.join("uploads", `${fileName}${path.extname(fileOrigin)}`)
      );

    return {
      key: `${fileName}${path.extname(fileOrigin)}`,
      fileName: `${fileOrigin}`,
    };
  } catch (err: any) {
    throw err;
  }
};

export const uploadFileToBucket = async (
  bucketName: string,
  file: Express.Multer.File | undefined,
  isImage: boolean
) => {
  try {
    //check bucket exists
    const isExists = await minioClient.bucketExists(bucketName);
    if (!isExists) {
      //await minioClient.makeBucket(bucketName);
      throw error(`Không tìm thấy thư mục tên ${bucketName}`);
    }
    //check file exists
    if (file) {
      const metaData = {
        "Content-Type": file.mimetype,
      };
      await minioClient.fPutObject(
        bucketName,
        `${file.filename}${path.extname(
          Buffer.from(file.originalname, "latin1").toString("utf8")
        )}`,
        `uploads/${file.filename}`,
        metaData
      );
      deleteTempFile(file.path);
      return {
        key: `${file.filename}${path.extname(
          Buffer.from(file.originalname, "latin1").toString("utf8")
        )}`,
        fileName: `${Buffer.from(file.originalname, "latin1").toString(
          "utf8"
        )}`,
      };
    }
  } catch (err: any) {
    throw err;
  }
};

// export const downloadFileFromBucket = async (
//   bucketName: string,
//   fileInfo: { key: string; fileName: string } | undefined
// ) => {
//   try {
//     const isExists = await minioClient.bucketExists(bucketName);
//     if (!isExists) {
//       throw error(`Không tìm thấy thư mục tên ${bucketName}`);
//     }
//     if (fileInfo) {
//       const fileDownload = await minioClient.getObject(
//         bucketName,
//         fileInfo.key
//       );
//       const metaData = await minioClient.statObject(bucketName, fileInfo.key);
//       return { metaData, fileDownload };
//     } else {
//       throw error("Không có file tải về");
//     }
//   } catch (err: any) {
//     throw err;
//   }
// };
