const { validateToken } = require("../middlewares/authentication");
const ServiceField = require("../models/ServiceField");

const ServiceFieldResolver = {
  Query: {

    getServiceFields: async (_,{},{token}) => {
      validateToken(token);
      return await ServiceField.findAll();
    },

    getServiceField: async (_,{ service_field_id },{token}) => {
      validateToken(token);
      foundServiceField = await ServiceField.findByPk(service_field_id);
      if (!foundServiceField) { throw new Error("ServiceField not found"); }
      return foundServiceField;
    },

  },

  Mutation: {
    createServiceField: async (_,{ name, description },{token}) => {
      validateToken(token);
      const existsServiceField = await ServiceField.findOne({ where: { name } });
      if ( existsServiceField ) {
        throw new Error("ServiceField 'NAME' already used");
      }

      const createdServiceField = await ServiceField.create({
        name, description
      });
      return await ServiceField.findByPk(createdServiceField.id);
    },

    updateServiceField: async (_,{ service_field_id, name, description, state, city, date_start, date_end },{token}) => {
      validateToken(token);   
      foundServiceField = await ServiceField.findByPk(service_field_id);
      if (!foundServiceField) { throw new Error("ServiceField not found"); }

      if (foundServiceField.name != name) {
        const existsServiceField = await ServiceField.findOne({ where: { name } });
        if ( existsServiceField ) {
          throw new Error("ServiceField 'NAME' already used");
        }
      }

      const updatedServiceField = await ServiceField.update({
        name, description, state, city,
        date_start, date_end
      },{
        where: {id:service_field_id}
      })
      if (!updatedServiceField) { throw new Error("Unexpected error"); }
      return await ServiceField.findByPk(service_field_id);
    },

    deleteServiceField: async (_,{ service_field_id },{token}) => {
      validateToken(token);     
      foundServiceField = await ServiceField.findByPk(service_field_id);
      if (!foundServiceField) { throw new Error("ServiceField not found"); }

      const deleteServiceField = await ServiceField.destroy({ where: { id:service_field_id } });

      if (!deleteServiceField) { throw new Error("Unexpected error"); }
      return true;
    },
  }

};

module.exports = {
  ServiceFieldResolver,
}