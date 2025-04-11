import { Request, Response, NextFunction } from "express";

export const validateRequestMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // const maliciousPattern = /('|--|;|\/\*|\*\/|xp_|or\s+\d+=\d+|-|,|=|@|!|<|>?|`|~|#|&)/i;
    const maliciousPattern = /('|--|;|\/\*|\*\/|xp_|or\s+\d+=\d+|<script>|<.*?>|-|#|@|!|`|~|\$|\^|%|&|\*)/i;
//(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}
    const validateInput = (input: any): boolean => {
        if (typeof input === "string") {
            return !maliciousPattern.test(input);
        }
        if (typeof input === "object" && input !== null) {
            return Object.values(input).every(validateInput);
        }
        return true;
    };

    const isBodyValid = validateInput(req.body);
    const isQueryValid = validateInput(req.query);
    const isParamsValid = validateInput(req.params);

    if (!isBodyValid || !isQueryValid || !isParamsValid) {
        console.log("data", req.body)
        return res.status(400).json({
            message: "Invalid input detected",
        });
        // if (!isBodyValid || !isQueryValid || !isParamsValid) {
        //     throw new Error("Invalid input detected")
        // }
    }

    // Nếu dữ liệu hợp lệ, tiếp tục xử lý
    next();
};
