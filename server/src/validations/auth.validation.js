const { z } = require("zod");

const registerSchema = z.object({
    username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(20, "Username maksimal 20 karakter"),
    
    email: z
    .string()
    .email("Email tidak valid"),

    password: z
    .string()
    .min(8, "Password minimal 8 karakter"),
});

const loginSchema = z.object({
    email: z
    .string()
    .email("Format email tidak valid"),

    password: z
    .string()
    .min(8, "Password minimal 8 karakter"),
});

module.exports = {
    registerSchema,
    loginSchema,
};