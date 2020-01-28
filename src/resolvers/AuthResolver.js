const User = require("../models/User");
const { generateToken } = require("../middlewares/authentication");

const AuthResolver = {
  Mutation: {
    authenticate: async (_,{ email, password }) => {

      const user = await User.findOne({ where: { email } });
      if (!user) { throw new Error("User not found"); }
      if (!user.active) { throw new Error("User not authorized"); }
      if ( !User.validate(user,password) ) { throw new Error("Invalid password"); }
      
      return { token: generateToken({id: user.id}), user };
    },
  }

};

module.exports = {
  AuthResolver,
}