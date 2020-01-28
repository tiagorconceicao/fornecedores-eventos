const { validateToken } = require("../middlewares/authentication");
const Company = require("../models/Company");
const CompanyPhone = require("../models/CompanyPhone");

const CompanyPhoneResolver = {
  Query: {
    getCompanyPhones: async (_,{ company_id },{token}) => {
      validateToken(token);
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const foundCompanyPhones = await CompanyPhone.findAll({
        where:{ company_id },      
      });

      return foundCompanyPhones;
    },

    getCompanyPhone: async (_,{ company_id, company_phone_id },{token}) => {
      validateToken(token);
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const foundCompanyPhone = await CompanyPhone.findOne({
        where:{ id:company_phone_id, company_id },      
      });
      if (!foundCompanyPhone) { throw new Error("CompanyPhone not found"); }

      return foundCompanyPhone;
    },
  },

  Mutation: {
    createCompanyPhone: async (_,{ company_id, phone, title, description },{token}) => {
      validateToken(token);
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const existsCompanyPhone = await CompanyPhone.findOne({ where: { phone, company_id } });
      if ( existsCompanyPhone ) {
        throw new Error("CompanyPhone 'PHONE' already exists");
      }

      const createdCompanyPhone = await CompanyPhone.create({
        company_id, phone, title, description
      });
      return await CompanyPhone.findByPk(createdCompanyPhone.id);
    },

    updateCompanyPhone: async (_,{ company_id, company_phone_id, phone, title, description },{token}) => {
      validateToken(token);    
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundCompanyPhone = await CompanyPhone.findOne({ where: { id:company_phone_id, company_id } });
      if (!foundCompanyPhone) { throw new Error("CompanyPhone not found"); }

      if (foundCompanyPhone.phone != phone) {
        const existsCompanyPhone = await CompanyPhone.findOne({ where: { phone, company_id } });
        if ( existsCompanyPhone ) {
          throw new Error("CompanyPhone 'PHONE' already used");
        }
      }

      const updatedCompanyPhone = await CompanyPhone.update({
        phone, title, description
      },{
        where: { id:company_phone_id, company_id }
      })
      if (!updatedCompanyPhone) { throw new Error("Unexpected error"); }
      return await CompanyPhone.findByPk(company_phone_id);
    },

    deleteCompanyPhone: async (_,{ company_id, company_phone_id },{token}) => {
      validateToken(token);   
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundCompanyPhone = await CompanyPhone.findOne({ where: { id:company_phone_id, company_id } });
      if (!foundCompanyPhone) { throw new Error("CompanyPhone not found"); }

      const deleteCompanyPhone = await CompanyPhone.destroy({ where: { id:company_phone_id, company_id } });

      if (!deleteCompanyPhone) { throw new Error("Unexpected error"); }
      return true;
    },
  }

};

module.exports = {
  CompanyPhoneResolver,
}