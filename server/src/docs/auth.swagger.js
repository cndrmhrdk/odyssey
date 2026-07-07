/**
 * @swagger
 * tags:
 *  - name: Auth
 *    description: Authentication API
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: Register user baru
 *      tags: [Auth]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - email
 *                          - password
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: candra
 *                          email:
 *                              type: string
 *                              example: candra@gmail.com
 *                          password:
 *                              type: string
 *                              example: password123
 *      responses:
 *          201:
 *              description: Register berhasil
 *          400:
 *              description: Validasi gagal
 */ 

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Login user
 *      tags: [Auth]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: candra@gmail.com
 *                          password:
 *                              type: string
 *                              example: password123
 *      responses:
 *          200:
 *              description: Login berhasil
 *          401:
 *              description: Email atau password salah
 */ 

/**
 * 
 */