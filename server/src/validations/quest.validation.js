const { z } = require("zod");

const createQuestSchema = z.object({
    title: z
    .string({
        error: "Title wajib diisi",
    })
    .trim()
    .min(3, "Title minimal 3 karakter")
    .max(50, "Title maksimal 50 karakter"),

    description: z
    .string({
        error: "Deskripsi wajib diisi",
    })
    .trim()
    .min(5, "Deskripsi minimal 5 karakter")
    .max(255, "Deskripsi maksimal 255 karakter"),

    difficulty: z.enum(["EASY", "MEDIUM", "HARD"], {
        error: "Difficulty harus EASY, MEDIUM, atau HARD",
    }),

    regionId: z
    .string({
        error: "Region wajib diisi",
    })
    .trim()
    .min(1, "Region wajib dipilih"),
    
    xpReward: z.coerce
    .number({
        error: "XP Reward wajib diisi",
    })
    .int("Coin Reward harus bilangan bulat")
    .min(0, "Coin Reward tidak boleh negatif"),
});

const updateQuestSchema = createQuestSchema.partial();

module.exports = {
    createQuestSchema,
    updateQuestSchema,
};