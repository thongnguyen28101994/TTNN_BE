import { Client } from "minio";
import fs from "fs";
import dotenv from "dotenv";
import { error } from "console";
import path from "path";
dotenv.config();
export const deleteTempFile = async (filePath) => {
    fs.unlinkSync(filePath);
};
// kết nối với minio service
const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT,
    // port:process.env.MINIO_PORT as unknown as number,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_PRIVATE_KEY,
});
//lấy list bucket
export const checkBucketList = async () => {
    return await minioClient.listBuckets();
};
export const createBucket = async (bucketName) => {
    try {
        const isExists = await minioClient.bucketExists(bucketName);
        if (!isExists) {
            await minioClient.makeBucket(bucketName);
            return bucketName;
        }
        else {
            throw error("Thư mục đã tồn tại");
        }
    }
    catch (err) {
        throw error(err);
    }
};
export const viewFile = async (bucketName, fileName) => {
    try {
        //check bucket exists
        const isExists = await minioClient.bucketExists(bucketName);
        if (!isExists) {
            throw error(`Không tìm thấy thư mục tên ${bucketName}`);
        }
        //return await minioClient.presignedUrl('GET',bucketName,'',60*60,{prefix:fileName});
        return await minioClient.presignedUrl("GET", bucketName, fileName, 60 * 60);
    }
    catch (err) {
        throw err;
    }
};
export const getListFile = async (bucketName, prefix = "") => {
    try {
        //check bucket exists
        const isExists = await minioClient.bucketExists(bucketName);
        if (!isExists) {
            //await minioClient.makeBucket(bucketName);
            throw error(`Không tìm thấy thư mục tên ${bucketName}`);
        }
        return minioClient.listObjectsV2(bucketName, prefix);
    }
    catch (err) {
        throw err;
    }
};
export const uploadImageToBucket = async (bucketName, fileName, fileOrigin, fileMimeType, isImage) => {
    try {
        //check bucket exists
        const isExists = await minioClient.bucketExists(bucketName);
        if (!isExists) {
            throw error(`Không tìm thấy thư mục tên ${bucketName}`);
        }
        const metaData = {
            "Content-Type": fileMimeType,
        };
        await minioClient.fPutObject(bucketName, `${fileName}${path.extname(fileOrigin)}`, `uploads/${fileName}${path.extname(fileOrigin)}`, metaData);
        if (isImage)
            await deleteTempFile(path.join("uploads", `${fileName}${path.extname(fileOrigin)}`));
        return {
            key: `${fileName}${path.extname(fileOrigin)}`,
            fileName: `${fileOrigin}`,
        };
    }
    catch (err) {
        throw err;
    }
};
export const uploadFileToBucket = async (bucketName, file, isImage) => {
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
            await minioClient.fPutObject(bucketName, `${file.filename}${path.extname(Buffer.from(file.originalname, "latin1").toString("utf8"))}`, `uploads/${file.filename}`, metaData);
            deleteTempFile(file.path);
            return {
                key: `${file.filename}${path.extname(Buffer.from(file.originalname, "latin1").toString("utf8"))}`,
                fileName: `${Buffer.from(file.originalname, "latin1").toString("utf8")}`,
            };
        }
    }
    catch (err) {
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
//# sourceMappingURL=upload_v2.js.map