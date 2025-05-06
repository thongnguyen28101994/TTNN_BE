import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import "reflect-metadata";

import DangKyThi_TTNN_dataSource from "./dbs/data_source";
import router, { uploadRouter } from "./routes";

// const swaggerUi = require('swagger-ui-express');
// import swaggerUi from 'swagger-ui-express';
// const swaggerDocument = require('./swagger.json')

// import  from "./ultils/uploads/upload_v2.js";

dotenv.config();

const app: Express = express();

app.use(express.json());
const corsOptions = {
  // origin: process.env.BASE_URL || '*', // Cho phép tất cả các nguồn
  methods: "GET, POST, PUT, DELETE", // Các phương thức HTTP được phép
  allowedHeaders: "Content-Type, Authorization", // Các header được phép
};
// const corsOptions = {
//   origin:"localhost:3000",
//   optionsSuccessStatus:200,
// }
app.use(cors(corsOptions));



app.use("/api/v1", router);

app.use("/api/file", uploadRouter);

app.get("/", (req: Request, res: Response) => {
  // res.send('Hello World From the Typescript Server!')
  let responseText = "Hello World From the Typescript Server! may 3001";
  responseText += `<small>Request At: ${req.body.requestTime}</small>`;
  res.send(responseText);
});




// https
//   .createServer(options, app)
//   .listen(process.env.ENV_PORT as unknown as number, async () => {
//     await DangKyThi_TTNN_dataSource
//       .initialize()
//       .then(() => {
//         console.log("DangKyThi_TTNN Kết nối thành công");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });

// http
//   .createServer(app)
//   .listen(process.env.ENV_PORT as unknown as number, async () => {
//     await DangKyThi_TTNN_dataSource
//       .initialize()
//       .then(() => {
//         console.log("DangKyThi_TTNN Kết nối thành công");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });

app.listen(process.env.ENV_PORT as unknown as number, async () => {
  //console.log(`Example app listening on port ${port}`)

//  await mssqlDataSource.initialize().then(()=>{
//     console.log("CSDL_2023 Kết nối thành công")
//   }).catch((error)=>{console.log(error);})

  await DangKyThi_TTNN_dataSource.initialize().then(()=>{
    console.log("DangKyThi_TTNN Kết nối thành công")
  }).catch((error)=>{console.log(error)})
});
