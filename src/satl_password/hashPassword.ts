import * as crypto from 'crypto';
export function generateSalt(length: number = 16): string {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').substring(0, length); // Chuỗi muối dài `length` ký tự
}

export function hashPassword(password: string, length: number = 16): string {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex').substring(0, length); // Chuỗi băm dài `length` ký tự
}

export function hashPasswordWithSalt(password: string, salt: string, length: number = 16): string {
    const hash = crypto.createHash('sha256');
    hash.update(password + salt);
    return hash.digest('hex').substring(0, length); // Chuỗi băm dài `length` ký tự
}

export const hashPassword_test = {
    generateSalt: (length:number):string => {
        return crypto.randomBytes(16).toString('hex');
    },
    hashPassword:(password:string):string =>{
        const salt = crypto.randomBytes(16).toString('hex');
        return crypto.pbkdf2Sync(password,salt,1000,64,'sha256').toString('hex');
    },
    verifyPassword:(password:string,salt:string) =>{
        return crypto.pbkdf2Sync(password,salt,1000,16,'sha256').toString('hex');
    }
}
