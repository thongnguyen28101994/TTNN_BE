import Jwt from "jsonwebtoken";
const checkAuth = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        let token = authorization && authorization.replace("Bearer", "").trim();
        if (!token)
            throw new Error("Token không hợp lệ");
        const verifyToken = Jwt.verify(token, process.env.SECRET_KEY);
        if (!verifyToken)
            throw new Error("Token đã hết hạn");
        next();
    }
    catch (err) {
        res.status(401).send({ message: err.message, data: null });
    }
};
export default checkAuth;
//# sourceMappingURL=auth.js.map