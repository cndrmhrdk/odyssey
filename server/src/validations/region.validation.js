const { z } = require("zod");

const createRegionSchema = z.object({
    name: z
    .string({
        error: "Nama region wajib diisi",
    })
    .trim()
    .min(3, "Nama region minimal 3 karakter")
    .max(50, "Nama region maksimal 50 karakter"),

    description: z
    .string({
        error: "Deskripsi wajib diisi",
    })
    .trim()
    .min(5, "Deskripsi minimal 5 karakter")
    .max(255, "Deskripsi maksimal 255 karakter")
});

const updateRegionSchema = createRegionSchema.partial();

module.exports = {
    createRegionSchema,
    updateRegionSchema,
};