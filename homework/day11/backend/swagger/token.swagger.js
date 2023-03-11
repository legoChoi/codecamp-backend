/**
 * @swagger
 * /tokens/phone:
 *  post:
 *      summary: 인증번호 보내기
 *      tags: [Token]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phone:
 *                              type: string
 *                              example: '01011111111'
 *      responses:
 *          200:
 *              description: 인증번호 전송 완료
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          example: 해당 번호로 인증번호가 전송되었습니다.
 */

/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *       summary: 인증번호 인증
 *       tags: [Token]
 *       requestBody:
 *                required: true
 *                content:
 *                   application/json:
 *                           schema:
 *                               type: object
 *                               properties:
 *                                   phone:
 *                                      type: string
 *                                      example: '01012341234'
 *                                   token:
 *                                      type: string
 *                                      example: '121123'
 *       responses:
 *             200:
 *                     description: 인증 완료
 *                     content:
 *                        appilcation/json:
 *                           schema:
 *                              type: string
 *                              example: 인증 완료
 *
 *
 *
 *
 */
