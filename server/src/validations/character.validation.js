const { z } = require("zod");

const createCharacterSchema = z.object({
    nickname: z
    .string()
    .trim()
    .min(3, "Nickname minimal 3 karakter")
    .max(20, "Nickname maksimal 20 karakter"),  

    avatar: z
    .string()
    .trim()
    .optional(),
});

const updateCharacterSchema = z.object({
    nickname: z
    .string()
    .trim()
    .min(3, "Nickname minimal 3 karakter")
    .max(20, "Nickname maksimal 20 karakter"),  

    avatar: z
    .string()
    .trim()
    .optional(),

    title: z
    .string()
    .trim()
    .max(50, "Title maksimal 50 karakter")
    .optional(),
});

module.exports = {
    createCharacterSchema,
    updateCharacterSchema,
};