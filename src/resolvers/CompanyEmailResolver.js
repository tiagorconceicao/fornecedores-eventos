const { validateToken } = require("../middlewares/authentication");
const Company = require("../models/Company");
const CompanyEmail = require("../models/CompanyEmail");

const CompanyEmailResolver = {
  Query: {
    getCompanyEmails: async (_,{ company_id },{token}) => {
      validateToken(token);
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const foundCompanyEmails = await CompanyEmail.findAll({
        where:{ company_id },      
      });

      return foundCompanyEmails;
    },

    getCompanyEmail: async (_,{ company_id, company_email_id },{token}) => {
      validateToken(token);
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const foundCompanyEmail = await CompanyEmail.findOne({
        where:{ id:company_email_id, company_id },      
      });
      if (!foundCompanyEmail) { throw new Error("CompanyEmail not found"); }

      return foundCompanyEmail;
    },
  },

  Mutation: {
    createCompanyEmail: async (_,{ company_id, email, title, description },{token}) => {
      validateToken(token);
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const existsCompanyEmail = await CompanyEmail.findOne({ where: { email, company_id } });
      if ( existsCompanyEmail ) {
        throw new Error("CompanyEmail 'EMAIL' already exists");
      }

      const createdCompanyEmail = await CompanyEmail.create({
        company_id, email, title, description
      });
      return await CompanyEmail.findByPk(createdCompanyEmail.id);
    },

    updateCompanyEmail: async (_,{ company_id, company_email_id, email, title, description },{token}) => {
      validateToken(token);     
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundCompanyEmail = await CompanyEmail.findOne({ where: { id:company_email_id, company_id } });
      if (!foundCompanyEmail) { throw new Error("CompanyEmail not found"); }

      if (foundCompanyEmail.email != email) {
        const existsCompanyEmail = await CompanyEmail.findOne({ where: { email, company_id } });
        if ( existsCompanyEmail ) {
          throw new Error("CompanyEmail 'EMAIL' already used");
        }
      }

      const updatedCompanyEmail = await CompanyEmail.update({
        email, title, description
      },{
        where: { id:company_email_id, company_id }
      })
      if (!updatedCompanyEmail) { throw new Error("Unexpected error"); }
      return await CompanyEmail.findByPk(company_email_id);
    },

    deleteCompanyEmail: async (_,{ company_id, company_email_id },{token}) => {
      validateToken(token);
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundCompanyEmail = await CompanyEmail.findOne({ where: { id:company_email_id, company_id } });
      if (!foundCompanyEmail) { throw new Error("CompanyEmail not found"); }

      const deleteCompanyEmail = await CompanyEmail.destroy({ where: { id:company_email_id, company_id } });

      if (!deleteCompanyEmail) { throw new Error("Unexpected error"); }
      return true;
    },
  }

};

module.exports = {
  CompanyEmailResolver,
}