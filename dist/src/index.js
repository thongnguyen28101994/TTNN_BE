import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "fs";
import http from "http";
import "reflect-metadata";
import { DangKyThi_TTNN_dataSource } from "./data-source.js";
import router, { uploadRouter } from "./routes.js";
// import  from "./ultils/uploads/upload_v2.js";
dotenv.config();
const app = express();
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
const myLogger = (req, res, next) => {
    console.log("Logged");
    next();
};
app.use(myLogger);
app.use("/api/v1", router);
app.use("/api/file", uploadRouter);
app.get("/", (req, res) => {
    // res.send('Hello World From the Typescript Server!')
    let responseText = "Hello World From the Typescript Server! may 3001";
    responseText += `<small>Request At: ${req.body.requestTime}</small>`;
    res.send(responseText);
});
const port = 3005;
const options = {
    key: fs.readFileSync("ssl/star.ichcm.edu.vn-key.key"),
    cert: fs.readFileSync("ssl/star.ichcm.edu.vn-ssl.crt"),
    ca: fs.readFileSync("ssl/star.ichcm.edu.vn-ca.crt"),
};
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
http
    .createServer(app)
    .listen(process.env.ENV_PORT, async () => {
    await DangKyThi_TTNN_dataSource
        .initialize()
        .then(() => {
        console.log("DangKyThi_TTNN Kết nối thành công");
    })
        .catch((error) => {
        console.log(error);
    });
});
// app.listen(process.env.ENV_PORT as unknown as number,process.env.BASE_URL as unknown as string, async () => {
//   //console.log(`Example app listening on port ${port}`)
// //  await mssqlDataSource.initialize().then(()=>{
// //     console.log("CSDL_2023 Kết nối thành công")
// //   }).catch((error)=>{console.log(error);})
//   await DangKyThi_TTNN_dataSource.initialize().then(()=>{
//     console.log("boarding_meals Kết nối thành công")
//   }).catch((error)=>{console.log(error)})
// });
//# sourceMappingURL=index.js.map