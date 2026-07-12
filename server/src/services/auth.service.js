const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");

const register = async ({ username, email, password }) => {
    // cek usn
    const existingUsername = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if(existingUsername) {
        throw new Error("Username sudah digunakan");
    }

    // cek email
    const existingEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if(existingEmail) {
        throw new Error("Email sudah digunakan");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // cari role player
    const playerRole = await prisma.role.findUnique({
        where: {
            name: "PLAYER",
        },
    });

    if(!playerRole) {
        throw new Error("Role PLAYER tidak ditemukan");
    }

    // simpan user
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            roleId: playerRole.id,
        },
    });

    return user;
};

const login = async ({ email, password })  => {
    // cari user
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            role: true,
        },
    });


    if(!user) {
        throw new Error("Email atau password salah");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error("Email atau passsword salah");
    }

    // Generate JWT
    const token = jwt.sign(
        {
            id: user.id,
            role: user.role.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    return token;
}

const me = async (userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: {
                select: {
                    name: true,
                },
            },
        },
    });

    if(!user) {
        throw new Error("User tidak ditemukan");
    }

    return user;
}

module.exports = {
    register,
    login,
    me,
}