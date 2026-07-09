/**
 * @swagger
 * tags:
 *  - name: Achievement
 *    description: Achievement API
 */

/**
 * @swagger
 * /achievements:
 *  get:
 *      summary: Mendapatkan semua achievement
 *      tags: [Achievement]
 *      responses:
 *          200:
 *              description: Berhasil mendapatkan daftar achievement
 */

/**
 * @swagger
 * /achievements/my:
 *  get:
 *      summary: Mendapatkan achievement milik user
 *      tags: [Achievement]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Berhasil mendapatkan achievement user
 *          401:
 *              description: Unauthorized
 */

/**
 * @swagger
 * /achievements:
 *  post:
 *      summary: Membuat achievement baru
 *      tags: [Achievement]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - title
 *                          - description
 *                          - type
 *                          - requirement
 *                      properties:
 *                          title:
 *                              type: string
 *                              example: Beginner Adventurer
 *                          description:
 *                              type: string
 *                              example: Selesaikan 5 quest pertama.
 *                          type:
 *                              type: string
 *                              enum:
 *                                  - QUEST
 *                                  - LEVEL
 *                              example: QUEST
 *                          requirement:
 *                              type: integer
 *                              example: 5
 *      responses:
 *          201:
 *              description: Achievement berhasil dibuat
 *          400:
 *              description: Validasi gagal
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Hanya ADMIN yang dapat mengakses
 */

/**
 * @swagger
 * /achievements/{id}:
 *  put:
 *      summary: Memperbarui achievement
 *      tags: [Achievement]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path 
 *            name: id 
 *            required: true 
 *            schema: 
 *              type: string 
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              example: Beginner Adventurer
 *                          description:
 *                              type: string
 *                              example: Selesaikan 5 quest pertama.
 *                          type:
 *                              type: string
 *                              enum:
 *                                  - QUEST
 *                                  - LEVEL
 *                              example: QUEST
 *                          requirement:
 *                              type: integer
 *                              example: 5
 *      responses:
 *          200:
 *              description: Achievement berhasil diperbarui
 *          400:
 *              description: Validasi gagal
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Hanya ADMIN yang dapat mengakses
 *          404:
 *              description: Achievement tidak ditemukan
 */

/**
 * @swagger
 * /achievements/{id}:
 *  delete:
 *      summary: Menghapus achievement
 *      tags: [Achievement]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path 
 *            name: id 
 *            required: true 
 *            schema: 
 *              type: string 
 *      responses:
 *          200:
 *              description: Achievement berhasil dihapus
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Hanya ADMIN yang dapat mengakses
 *          404:
 *              description: Achievement tidak ditemukan
 */