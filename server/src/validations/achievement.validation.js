const { z } = require("zod");

const createAchievementSchema = z.object ({
    title: z
    .string({
        error: "Title wajib diisi",
    })
    .trim()
    .min(3, "Title minimal 3 karakter")
    .max(100, "Title maksimal 100 karakter"),

    description: z
    .string({
        error: "Deskripsi wajib diisi",
    })
    .trim()
    .min(5, "Deskripsi minimal 5 karakter")
    .max(255, "Deskripsi maksimal 255 karakter"),

    type: z.enum(["QUEST", "LEVEL"], {
        error: "Type harus QUEST atau LEVEL",
    }),

    requirement: z.coerce
    .number({
        error: "Requirement wajib diisi dan harus berupa angka",
    })
    .int("Requirement harus bilangan bulat")
    .min(1, "Requirement minimal 1"),
});

const updateAchievementSchema = createAchievementSchema.partial();

module.exports = {
    createAchievementSchema,
    updateAchievementSchema,
};