import getOG from "../utils/scraping.js";
import * as personalFunction from "../utils/validation.js";
import * as emailFunction from "../utils/email.js";

export default class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  createUser = async (req, res) => {
    const input = req.body;
    console.log(input);

    // 주민번호가공;
    if (
      personalFunction.checkRegiNumberLength(input.personal) &&
      personalFunction.checkRegistrationNumber(input.personal)
    ) {
      input.personal = personalFunction.getRegistrationNumber(input.personal);

      const og = await getOG(input.prefer);

      // 가입 환영 이메일 전송
      const template = emailFunction.getWelcomeTemplate(input);
      // eFunction.sendTemplateToEmail(input.email, template);

      console.log(input);

      const result = await this.userService.create(input, og);

      res.send(result);
    } else {
      res.send("주민번호 오류");
    }
  };

  fetchUsers = async (req, res) => {
    const result = await this.userService.findAll();

    res.send(result);
  };
}
