import * as crypto from 'crypto';
export function generateSalt(length = 16) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').substring(0, length); // Chuỗi muối dài `length` ký tự
}
export function hashPassword(password, length = 16) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex').substring(0, length); // Chuỗi băm dài `length` ký tự
}
export function hashPasswordWithSalt(password, salt, length = 16) {
    const hash = crypto.createHash('sha256');
    hash.update(password + salt);
    return hash.digest('hex').substring(0, length); // Chuỗi băm dài `length` ký tự
}
export const hashPassword_test = {
    generateSalt: (length) => {
        return crypto.randomBytes(16).toString('hex');
    },
    hashPassword: (password) => {
        const salt = crypto.randomBytes(16).toString('hex');
        return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
    },
    verifyPassword: (password, salt) => {
        return crypto.pbkdf2Sync(password, salt, 1000, 16, 'sha256').toString('hex');
    }
};
//# sourceMappingURL=hashPassword.js.map