/**
 * @swagger
 * tags:
 *  - name: Character
 *    description: Character API
 */

/**
 * @swagger
 * /characters:
 *  post:
 *      summary: Membuat karakter baru
 *      tags: [Character]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - nickname
 *                      properties:
 *                          nickname:
 *                              type: string
 *                              example: candraHero
 *                          avatar:
 *                              type: string
 *                              example: https://example.com/avatar.png
 *      response:
 *          201:
 *              description: Character berhasil dibuat
 *          400:
 *              description: Validasi gagal
 *          401:
 *              description: Unauthorized
 */

/**
 * @swagger
 * /characters/me:
 *  get:
 *      summary: Mendapatkan karakter milik user
 *      tags: [Character]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Berhasil mendapatkan karakter
 *          401:
 *              description: Unauthorized
*/