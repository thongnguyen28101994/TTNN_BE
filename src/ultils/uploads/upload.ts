import express from 'express';
import {BucketItem, Client} from 'minio';
import multer from 'multer';
import fs from 'fs';

let uploadRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

let minioClient = new Client({
    endPoint:"45.117.177.53",
    port:9000,
    useSSL:false,
    accessKey:"thong",
    secretKey:"Thong28101994@"
})

uploadRouter.get('/getListBucket',async(_,res)=>{
  try {
    const buckets = await minioClient.listBuckets();
     res.status(200).json({
      message:"Success",
      data: buckets
  })
    // console.log('Success', buckets)
  } catch (err: any) {
    console.log(err.message)
  }
})

uploadRouter.get('/getListObject', async (_,res)=>{
  try{
    let fileNameList:string[] =[];
    const objList =  minioClient.listObjectsV2("test","ImportMonAn");
    objList.on("data",(item:BucketItem)=>{
    if(item.name)
      fileNameList.push(item.name);
    })
    objList.on("end",()=>{
      res.status(200).send({message:"lấy danh sách file thành công",data:fileNameList})
    })
  }
  catch(err:any){
    res.status(500).send({message:"dữ liệu bị lỗi",data:null})
  }
})

uploadRouter.get("/checkAndCreateNewBucket",async (req,res) =>{
  const isExists =  await minioClient.bucketExists("test");
  if(isExists)
  {
    res.send("Bucket exists.");
  }
  else
  {
    const newBucket = await minioClient.makeBucket("test");
    console.log(newBucket);
    res.send("Đã tạo mới bucket")
  }})
 const deleteTempFile = async (filePath: string) => {
    fs.unlink(filePath, (err) => {
      if (err) throw err;
    });
  };
// Upload file route
uploadRouter.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const { file } = req;
      const metaData = {
        'Content-Type': file?.mimetype as string,
      };
  
      // Upload to MinIO
      await minioClient.fPutObject('test', file?.filename as string, file?.path as string, metaData);
      deleteTempFile(file?.path as string);
      res.send({ message: 'Tải file thành công',data:{key:file?.originalname,fileName:file?.filename} });
    } catch (error) {
      console.error('Lỗi khi tải file:', error);
      res.status(500).send({ message: 'Lỗi file tải lên',data:null });
    }
  });

  //Get file route
  uploadRouter.post('/download', async (req, res) => {
    let size = 0;
    const chunks:any = [];
 
    try {
    const { key,fileName } = req.body;
     const fileObj = await minioClient.getObject('test', key);
     const fileInfo = await minioClient.statObject('test',key);
     res.set(fileInfo.metaData);
     res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      fileObj.on("data",(c)=>{
        size += c.length;
        chunks.push(c);
      })
      fileObj.on('end',  function () {
         const buffer =  Buffer.concat(chunks, size);
         res.status(200).send(buffer);
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      res.status(500).send({ error: 'Failed to download file' });
    }
  });

  export default uploadRouter;