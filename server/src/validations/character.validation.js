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

    title: z
    .string()
    .trim()
    .min(3, "Nickname minimal 3 karakter")
    .max(20, "Nickname maksimal 20 karakter")
    .optional(),
});

const updateCharacterSchema = z.object({
    nickname: z
    .string()
    .trim()
    .min(3, "Nickname minimal 3 karakter")
    .max(20, "Nickname maksimal 20 karakter")
    .optional(), 

    avatar: z
    .string()
    .trim()
    .optional(),

    title: z
    .string()
    .trim()
    .min(3, "Nickname minimal 3 karakter")
    .max(20, "Nickname maksimal 20 karakter")
    .optional(),
})

.refine(
    (data) => data.nickname !== undefined || data.avatar !== undefined || data.title !== undefined,
    {
        message: "Minimal satu field harus diisi",
    }
);

module.exports = {
    createCharacterSchema,
    updateCharacterSchema,
};