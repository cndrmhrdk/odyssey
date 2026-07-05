const { z } = require("zod");

const createCharacterSchema = z.object({
    nickname: z
    .string()
    .min(3, "Nickname minimal 3 karakter")
    .max(20, "Nickname maksimal 20 karakter"),
});

module.exports = {
    createCharacterSchema,
};