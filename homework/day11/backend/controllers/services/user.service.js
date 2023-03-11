import { User } from "../../models/user.model.js";

export default class UserService {
  //
  async create(input, og) {
    const user = new User({
      ...input,
      og,
    });

    await user.save();

    console.log(`user: ${user}`);

    return user._id;
  }

  async findAll() {
    const users = await User.find().exec();
    return users;
  }
}
