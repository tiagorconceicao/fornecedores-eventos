const RatingField = require("../models/RatingField");

const RatingFieldResolver = {
  Query: {

    getRatingFields: async () => {
      return await RatingField.findAll();
    },

    getRatingField: async (_,{ rating_field_id }) => {
      foundRatingField = await RatingField.findByPk(rating_field_id);
      if (!foundRatingField) { throw new Error("RatingField not found"); }
      return foundRatingField;
    },

  },

  Mutation: {
    createRatingField: async (_,{ name, description }) => {
      const existsRatingField = await RatingField.findOne({ where: { name } });
      if ( existsRatingField ) {
        throw new Error("RatingField 'NAME' already used");
      }

      const createdRatingField = await RatingField.create({
        name, description
      });
      return await RatingField.findByPk(createdRatingField.id);
    },

    updateRatingField: async (_,{ rating_field_id, name, description, state, city, date_start, date_end }) => {      
      foundRatingField = await RatingField.findByPk(rating_field_id);
      if (!foundRatingField) { throw new Error("RatingField not found"); }

      if (foundRatingField.name != name) {
        const existsRatingField = await RatingField.findOne({ where: { name } });
        if ( existsRatingField ) {
          throw new Error("RatingField 'NAME' already used");
        }
      }

      const updatedRatingField = await RatingField.update({
        name, description, state, city,
        date_start, date_end
      },{
        where: {id:rating_field_id}
      })
      if (!updatedRatingField) { throw new Error("Unexpected error"); }
      return await RatingField.findByPk(rating_field_id);
    },

    deleteRatingField: async (_,{ rating_field_id }) => {      
      foundRatingField = await RatingField.findByPk(rating_field_id);
      if (!foundRatingField) { throw new Error("RatingField not found"); }

      const deleteRatingField = await RatingField.destroy({ where: { id:rating_field_id } });

      if (!deleteRatingField) { throw new Error("Unexpected error"); }
      return true;
    },
  }

};

module.exports = {
  RatingFieldResolver,
}