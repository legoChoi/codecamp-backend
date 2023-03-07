/**
 * @openapi
 * /user:
 *   post:
 *     summary: 회원가입
 *     tags: [User]
 *     requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: 이름
 *                          email:
 *                              type: string
 *                              example: email@gmaile.com
 *                          personal:
 *                              type: string
 *                              example: '123412-3412345'
 *                          prefer:
 *                              type: string
 *                              example: https://naver.com
 *                          pwd:
 *                              type: string
 *                              example: 12341234
 *                          phone:
 *                              type: string
 *                              example: '01011111111'
 *     responses:
 *          200:
 *              description: 생성된 user의 _id
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: string
 *                          example: '61ee53366a92c63829be4269'
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: 유저 목록 출력
 *      tags: [User]
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
