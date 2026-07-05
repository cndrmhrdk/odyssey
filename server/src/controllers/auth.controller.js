const { registerSchema, loginSchema } = require("../validations/auth.validation");
const authService = require("../services/auth.service");

const register = async (req, res, next) => {
    try {
        // validasi request
        const data = registerSchema.parse(req.body);

        await authService.register(data);

        return res.status(201).json ({
            success: true,
            message: "Register berhasil",
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const data = loginSchema.parse(req.body);

        const token = await authService.login(data);

        return res.status(200).json({
            success: true,
            message: "Login berhasil",
            data: {
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

const me = async (req, res, next) => {
    try {
        const user = await authService.me(req.user.id);

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    me,
};