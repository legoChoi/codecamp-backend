/**
 * @swagger
 * /users:
 *  get:
 *      summary: 유저 목록 출력
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              properties:
 *                                  email:
 *                                      type: string
 *                                  name:
 *                                      type: string
 *                                  phone:
 *                                      type: string
 *                                  personal:
 *                                      type: string
 *                                  prefer:
 *                                      type: string
 */
