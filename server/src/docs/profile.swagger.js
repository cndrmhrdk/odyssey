/**
 * @swagger
 * tags:
 *  - name: Profile
 *      description: Profile API
 */

/**
 * @swagger
 * /profile:
 *  get:
 *      summary: Mendapatkan profil user yang sedang login
 *      tags: [Profile]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Berhasil mendapatkan profil
 *          401:
 *              description: Unauthorized
 */