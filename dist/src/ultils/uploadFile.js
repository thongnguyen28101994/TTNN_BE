import fs from "fs";
import { google } from "googleapis";
// import apikeys from "../fileserver.json" assert {type:"json"};
const SCOPE = ["https://www.googleapis.com/auth/drive"];
export async function authorize() {
    // const base64EncodedServiceAccount = process.env.GOOGLE_API_PRIVATE_KEY;
    // const decodeServiceAccount = Buffer.from(base64EncodedServiceAccount as string,'base64').toString();
    // const credential = JSON.parse(decodeServiceAccount);
    // console.log(  process.env.GOOGLE_API_KEYS, process.env.GOOGLE_API_PRIVATE_KEY)
    const jwtClient = new google.auth.JWT(process.env.GOOGLE_API_KEYS, undefined, "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDccA7LwUrkWcD7\n1AYv0mRUjNfv5DOj/CjS+hH9EnEIT1LaM3QiN+o5VPbZuwKdWXTxPVlBJglL1JSl\ntw95dhJ69J4869E7CYlzt8FGCRP+aBhmLIj4M0S45YyaDQAE/qFIDIbrYeLA0H42\nfVPWnc683f1RH6ebD/ZE+Ii0Gbtc0sbyXppP9I5oo9IQ1rKZjuLCL/fy1sWPagx4\npchwX0EXo/HgAULMFGJeGtjDGESRSAMVNTo5CO/s5PKMMdwLHwQ2pV2Xtp3gsDUa\nh8DFaJeYRbYK2fAF0jN1FIQiO/wiwUAyi3MjYDHeWJT/405som/qqmdKmDOLyo7v\nL13xLXdzAgMBAAECggEABFHlCb8emSoC4rmvW9L4Tm9Iv+4zMmeG6pPELIoE5EmX\njYKboIWShtOhZnAqNmTHyJUx338tD/3PtTrXuQ5AkGcODfvfyow+vTB7Ej1RexOV\nkeHZXl7iIa7Ew4bMOQkR8cRPqwkK5knIKy26k1Hs6ZQVaZK5FoTBHqnmNCmTZvXN\n/0v5kwmxGzi+ewCXvkFAoI6Ry5uzV1DcJ5QCXkUftLut1GO2eaIA4fIarxdMINTk\nRIxapymYW/wyOf+2SGbYpzZRNi+t/DO/t3yeKJwL3CMuhp10sXSzeZ+kOAW2nZub\nvCcKvr3bNgnYUAy0WYXieRKEm4uiFyKCqzK6f54D5QKBgQDwkhT9gJB03ygqIe8a\noiH1Rm0r401AeexPqtrAzL5L6bugNEu4Jl1MaP3AH2O3/K9YdKi2s3BFq8fQWTay\nJ/jX85HmuOuk5j/r81nnLnxuwn/SsN+0Y7dYSJ84NAStKhiQ1gMgbuTBQiD4zJ36\nVHBgVvLzzSTCKkrkeBQKiGOFJQKBgQDqk2ofY9kcaMtAqYS8vMuFHYKyNONoorWR\nDWF9vMNYq/+rNSFvA0GmYrv4DrrXxXHsr8Xot8h4RZZsOMwZ/qRmdyoyaB8PZZO0\ns5LBqoJsOr9EG0H4XEeQ5Rl0uwUq+0mgMiBRgVot6NXgPRTQAEbKqNpYJuyqQ7hl\nWeKDgFMCtwKBgQCCaT51uecVZA+631Bl6LRt6TKvUvYC2NVQzrbtQ1B5iIhMrWzK\ntAlprZS5PIrrJ1DKq9r1x8o6Cog0Gti6tU6BiqlyIJaleqf2OaJn31xXEpsGVRnA\nCTpP4nZlmlVapfJROaLSRys81KNZHFsbZADTSO9FWNTvaMvWlH2QxCTm/QKBgQDP\n/hH071XNKOY/2Y+Gwmg7CeWfGeIiH1Oa4CB3mu4jK68xIZUZl+uYGqfM1VK6i6nu\nUhTLulmYuysbnmjrC6y95h+WPlh8EHcdnLQd4JBwYs7BFuIx07DpOxqNNF7qs5Ge\n55NccbOCTZeGkuJnZDdg7sNbsnfaqN1RkJeWPixclQKBgQCLYSzyRrpyI7Kf3P3C\nFKznNhQrLv4bbZloLa7RDDVECheRUokit2mLB99aYGRe6vBNZYAs3choSHg5sXat\nojrv8PENFZMauZHqhiMyv9ZoYtHzoQytR58LWtb7uL8hYTGzj6i141o5AOY8LXQU\noms61coQfFXpcRWQq9nJZB0e+A==\n-----END PRIVATE KEY-----\n", SCOPE);
    await jwtClient.authorize();
    return jwtClient;
}
export const deleteTempFile = async (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err)
            throw err;
    });
};
export const createFolder = async (auth) => {
    const drive = google.drive({ version: "v3", auth });
    const res = await drive.files
        .create({
        requestBody: {
            name: "Test",
            mimeType: "application/vnd.google-apps.folder",
            parents: ["1DIOUk6Ymt4DhIO3mt1eorck2rqmbISfI"],
        },
        fields: "id",
    })
        .catch((err) => console.log(err));
    console.log(res);
    return res;
};
export const getFile = async (auth, fileId) => {
    const drive = google.drive({ version: "v3", auth });
    const res = await drive.files
        .export({ fileId: fileId })
        .catch((err) => console.log(err));
    console.log(res);
    return res;
};
export const deleteFile = async (auth, fileId) => {
    const drive = google.drive({ version: "v3", auth });
    const res = await drive.files
        .delete({ fileId: fileId })
        .catch((err) => console.log(err));
    return res;
};
export async function uploadFile(authClient, sourceFile, extension) {
    return new Promise((resolve, rejected) => {
        const drive = google.drive({ version: "v3", auth: authClient });
        drive.files.create({
            requestBody: {
                name: sourceFile.originalname,
                //mimeType: 'application/vnd.google-apps.folder',
                mimeType: sourceFile.mimeType,
                parents: ["1DIOUk6Ymt4DhIO3mt1eorck2rqmbISfI"],
            },
            media: {
                body: fs.createReadStream(`${sourceFile.path}`), // files that will get uploaded
                mimeType: sourceFile.mimeType,
            },
            fields: "id,name",
        }, function (error, file) {
            if (error) {
                return rejected(error);
            }
            // console.log(file.data);
            drive.permissions.create({
                fileId: file.data.id,
                requestBody: {
                    role: "reader",
                    type: "anyone",
                },
            });
            deleteTempFile(sourceFile.path);
            if (extension) {
                deleteTempFile(`${sourceFile.path}${extension}`);
            }
            resolve(file.data);
        });
    });
}
export async function uploadFileImageWithBase64(authClient, sourceFile) {
    return new Promise((resolve, rejected) => {
        const drive = google.drive({ version: "v3", auth: authClient });
        const uploadImg = sourceFile.split(/,(.+)/)[1];
        const imgBuf = Buffer.from(uploadImg, "base64"); // Added
        const filePath = `test${Math.random()}.jpg`;
        fs.writeFileSync(filePath, imgBuf);
        drive.files.create({
            requestBody: {
                name: "test.jpg",
                //mimeType: 'application/vnd.google-apps.folder',
                mimeType: "image/jpeg",
                parents: ["1DIOUk6Ymt4DhIO3mt1eorck2rqmbISfI"],
            },
            media: {
                body: fs.createReadStream(filePath),
                //  body: fs.writeFileSync(path.join(__dirname,"/uploadFile/"),imgBuf), // files that will get uploaded
                mimeType: "image/jpeg",
            },
            fields: "id,name",
        }, function (error, file) {
            if (error) {
                return rejected(error);
            }
            // console.log(file.data);
            drive.permissions.create({
                fileId: file.data.id,
                requestBody: {
                    role: "reader",
                    type: "anyone",
                },
            });
            deleteTempFile(filePath);
            resolve(file.data);
        });
    });
}
//# sourceMappingURL=uploadFile.js.map