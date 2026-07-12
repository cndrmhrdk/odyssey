const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            throw new Error("Token tidak ditemukan");
        }

        const token = authHeader.split(" ")[1];

        if(!token) {
            throw new Error("Token tidak valid");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        next(error);
    }
};

const authorizeRole = (...roles) => {
    return (req, res, next) => {
        try {
            if(!req.user) {
                throw new Error("User belum terautentikasi");
            }

            if(!roles.includes(req.user.role)) {
                throw new Error("Akses ditolak");
            }

            next();
        }  catch (error) {
            next(error);
        }
    }
}

module.exports = {
    verifyToken,
    authorizeRole,
};