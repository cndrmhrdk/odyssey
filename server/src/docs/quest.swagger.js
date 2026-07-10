/**
 * @swagger
 * tags: 
 *  - name: Quest
 *    description: Quest API
 */

/**
 * @swagger
 * /quests:
 *  get: 
 *      summary: Mendapatkan semua quest
 *      tags: [Quest]
 *      responses:
 *          200:
 *              description: Berhasil mendapatkan daftar quest
 */

/**
 * @swagger
 * /quests:
 *  get: 
 *      summary: Mendapatkan semua quest
 *      tags: [Quest]
 *      responses:
 *          200:
 *              description: Berhasil mendapatkan daftar quest
 */

/**
 * @swagger
 * /quests:
 *  post:
 *      summary: Membuat quest baru
 *      tags: [Quest]
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
 *                          - difficulty
 *                          - regionId
 *                          - xpReward
 *                          - coinReward
 *                      properties:
 *                          title:
 *                              type: string
 *                              example: Kalahkan 10 slime
 *                          description:
 *                              type: string
 *                              example: Kalahkan 10 di Forest of Hope.
 *                          difficulty:
 *                              type: string
 *                              enum:
 *                                  - EASY
 *                                  - MEDIUM
 *                                  - HARD
 *                              example: EASY
 *                          regionId:
 *                              type: string
 *                              example: cmcf8z3vl0001w2ab12345678
 *                          xpReward:
 *                              type: integer
 *                              example: 100
 *                          coinReward:
 *                              type: integer
 *                              example: 50
 *      responses:
 *          201:
 *              description: Quest berhasil dibuat
 *          400:
 *              description: Validasi gagal
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Hanya ADMIN yang dapat mengakses
 */

/**
 * @swagger
 * /quests/{questId}:
 *  put:
 *      summary: Memperbarui quest
 *      tags: [Quest]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: questId
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
 *                          description:
 *                              type: string
 *                          difficulty:
 *                              type: string
 *                              enum:
 *                                  - EASY
 *                                  - MEDIUM
 *                                  - HARD
 *                          regionId:
 *                              type: string
 *                          xpReward:
 *                              type: integer
 *                          coinReward:
 *                              type: integer
 *      responses:
 *          200:
 *              description: Quest berhasil diperbarui
 *          400:
 *              description: Validasi gagal
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Hanya ADMIN yang dapat mengakses
 *          404:
 *              description: Quest tidak ditemukan
 */

/**
 * @swagger
 * /quests/{questId}:
 *  delete:
 *      summary: Menghapus quest
 *      tags: [Quest]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: questId
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Quest berhasil dihapus
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Hanya ADMIN yang dapat mengakses
 *          404:
 *              description: Quest tidak ditemukan
 */

/**
 * @swagger
 * /quests/{questId}/start:
 *  post:
 *      summary: Memulai quest
 *      tags: [Quest]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: questId
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Quest berhasil dimulai
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: Quest tidak ditemukan
 */

/**
 * @swagger
 * /quests/{questId}/complete:
 *  patch:
 *      summary: Menyelesaikan quest
 *      tags: [Quest]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: questId
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Quest berhasil diselesaikan
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: Quest tidak ditemukan
 */