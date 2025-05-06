import {DataSource} from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

const DangKyThi_TTNN_dataSource = new  DataSource({
    type: "mssql",
    host: "45.117.177.212",
    port: 1444,
    username: "sa",
    password: "Thong28101994@",
    database: `${process.env.ENV_ENVIROMENT==='production'?`DangKyThi_TTNN`:`DangKyThi_TTNN_Test`}`,
    synchronize: false,
    logging: false,
    entities:["**/schemas/**.{js,ts}"],
    options: {
        trustServerCertificate: true,
        encrypt:false
        // useUTC: true
        },
})

export default DangKyThi_TTNN_dataSource;



 