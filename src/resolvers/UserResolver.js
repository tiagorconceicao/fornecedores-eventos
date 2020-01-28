const { validateToken } = require("../middlewares/authentication");
const User = require("../models/User");

const UserResolver = {
  Query: {
    getUsers: async (_,{},{token}) => {
      validateToken(token);
      return await User.findAll();
    },

    getUser: async (_,{ user_id },{token}) => {
      validateToken(token);
      foundUser = await User.findByPk(user_id);
      if (!foundUser) { throw new Error("User not found"); }
      return foundUser;
    },
  },

  Mutation: {
    createUser: async (_,{ name, email, password },{token}) => {
      const decoded = validateToken(token);
      userIsAdmin = await User.findOne({ where: { id: decoded.id, admin: true, } });
      if (!userIsAdmin) { throw new Error("Only ADMIN allowed"); }

      // check email format
      // check password format

      const existsUser = await User.findOne({ where: { email } });

      if ( existsUser ) {
        throw new Error("User 'EMAIL' already used");
      }
      const createdUser = await User.create({
        name, email, password, active:true, admin:false
      });
      return await User.findByPk(createdUser.id);
    },

    updateUser: async (_,{ user_id, name, email, password },{token}) => {
      const decoded = validateToken(token);
      userIsAdmin = await User.findOne({ where: { id: decoded.id, admin: true, } });
      if ( !userIsAdmin && (user_id!=decoded.id) ) { throw new Error("Only ADMIN or OWN USER allowed"); }
      
      // check email format
      // check password format

      foundUser = await User.findByPk(user_id);
      if (!foundUser) { throw new Error("User not found"); }

      if (foundUser.email != email) {
        const existsUser = await User.findOne({ where: { email } });
        if ( existsUser ) {
          throw new Error("User 'EMAIL' already used");
        }
      }

      const updatedUser = await User.update({
        name, email, password
      },{
        where: {id:user_id}
      })
      if (!updatedUser) { throw new Error("Unexpected error"); }
      return await User.findByPk(user_id);
    },

    deleteUser: async (_,{ user_id },{token}) => {
      const decoded = validateToken(token);
      userIsAdmin = await User.findOne({ where: { id: decoded.id, admin: true, } });
      if (!userIsAdmin) { throw new Error("Only ADMIN allowed"); }
      if (user_id == decoded.id) { throw new Error("You can't delete your own user"); }

      foundUser = await User.findByPk(user_id);
      if (!foundUser) { throw new Error("User not found"); }

      const deleteUser = await User.destroy({ where: { id:user_id } });

      if (!deleteUser) { throw new Error("Unexpected error"); }
      return true;
    },
  }

};

module.exports = {
  UserResolver,
}