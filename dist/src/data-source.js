import { DataSource } from 'typeorm';
export const DangKyThi_TTNN_dataSource = new DataSource({
    type: "mssql",
    host: "45.117.177.212",
    port: 1444,
    username: "sa",
    password: "Thong28101994@",
    database: "DangKyThi_TTNN",
    synchronize: false,
    logging: true,
    entities: ["dist/entities/*{.js,.ts}"],
    subscribers: [],
    migrations: [],
    options: {
        trustServerCertificate: true,
        // useUTC: true
    },
});
//# sourceMappingURL=data-source.js.map