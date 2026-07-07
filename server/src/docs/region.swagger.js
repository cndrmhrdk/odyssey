/**
 * @swagger
 * tags:
 *  -name: Region
 *      description: Region API
 */

/**
 * @swagger
 * /regions:
 *  get:
 *      summary: Mendapatkan semua region
 *      tags: [Region]
 *      responses
 *          200:
 *              description: Berhasil mendapatkan region
 */

/**
 * @swagger
 * /regions:
 *  post:
 *      summary: Membuat region baru
 *      tags: [Region]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - description
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Forest of Hope
 *                          description:
 *                              type: string
 *                              example: Region penuh hutan dan monster level rendah.
 *      responses:
 *          201:
 *              description: Region berhasil dibuat
 *          400:
 *              description: Validasi gagal
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Hanya ADMIN yang dapat mengakses
 */

/**
 * @swagger
 * /regions/{id}:
 *  put:
 *      summary: Memperbarui region
 *      tags: [Region]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Forest of Hope
 *                          description:
 *                              type: string
 *                              example: Region penuh monster level rendah.
 *      responses:
 *          201:
 *              description: Region berhasil diperbarui
 *          400:
 *              description: Validasi gagal
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Hanya ADMIN yang dapat mengakses
 *          404:
 *              description: Region tidak ditemukan
 */

/**
 * @swagger
 * /regions/{id}:
 *  delete:
 *      summary: Menghapus region
 *      tags: [Region]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          201:
 *              description: Region berhasil dihapus
 *          400:
 *              description: Validasi gagal
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Hanya ADMIN yang dapat mengakses
 *          404:
 *              description: Region tidak ditemukan
 */