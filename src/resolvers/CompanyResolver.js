const Company = require("../models/Company");

const CompanyResolver = {
  Query: {
    getCompanies: async () => {
      return await Company.findAll();
    },

    getCompany: async (_,{ company_id }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }
      return foundCompany;
    },
  },

  Mutation: {
    createCompany: async (_,{ name, description, zipcode, state, city, district, street, number, complement }) => {
      const existsCompany = await Company.findOne({ where: { name } });
      if ( existsCompany ) {
        throw new Error("Company 'NAME' already used");
      }

      const createdCompany = await Company.create({
        name, description, zipcode, state, city,
        district, street, number, complement
      });
      return await Company.findByPk(createdCompany.id);
    },

    updateCompany: async (_,{ company_id, name, description, zipcode, state, city, district, street, number, complement }) => {      
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      if (foundCompany.name != name) {
        const existsCompany = await Company.findOne({ where: { name } });
        if ( existsCompany ) {
          throw new Error("Company 'NAME' already used");
        }
      }    

      const updatedCompany = await Company.update({
        name, description, zipcode, state,
        city, district, street, number, complement
      },{
        where: {id:company_id}
      })
      if (!updatedCompany) { throw new Error("Unexpected error"); }
      return await Company.findByPk(company_id);
    },

    deleteCompany: async (_,{ company_id }) => {      
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const deleteCompany = await Company.destroy({ where: { id:company_id } });

      if (!deleteCompany) { throw new Error("Unexpected error"); }
      return true;
    },
  }

};

module.exports = {
  CompanyResolver,
}