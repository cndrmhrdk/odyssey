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
    .int("XP Reward harus bilangan bulat")
    .min(0, "XP Reward tidak boleh negatif"),

    coinReward: z.coerce
    .number({
        error: "Coin Reward wajib diisi",
    })
    .int("Coin Reward harus bilangan bulat")
    .min(0, "Coin Reward tidak boleh negatif"),


    question: z
        .string({
            error: "Question wajib diisi",
        })
        .trim()
        .min(10, "Question minimal 10 karakter"),

    choiceA: z
        .string({
            error: "Choice A wajib diisi",
        })
        .trim()
        .min(1),

    choiceB: z
        .string({
            error: "Choice B wajib diisi",
        })
        .trim()
        .min(1),

    choiceC: z
        .string({
            error: "Choice C wajib diisi",
        })
        .trim()
        .min(1),

    choiceD: z
        .string({
            error: "Choice D wajib diisi",
        })
        .trim()
        .min(1),

    correctChoice: z.enum(["A", "B", "C", "D"], {
        error: "Jawaban benar harus A, B, C, atau D",
    }),
});

const updateQuestSchema = createQuestSchema.partial();

const submitAnswerSchema = z.object({
    answer: z.enum(["A", "B", "C", "D"], {
        error: "Jawaban harus A, B, C, atau D",
    }),
});

module.exports = {
    createQuestSchema,
    updateQuestSchema,
    submitAnswerSchema,
};