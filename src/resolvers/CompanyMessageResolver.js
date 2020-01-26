const Company = require("../models/Company");
const CompanyMessage = require("../models/CompanyMessage");

const CompanyMessageResolver = {
  Query: {
    getCompanyMessages: async (_,{ company_id }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const foundCompanyMessages = await CompanyMessage.findAll({
        where:{ company_id },      
      });

      return foundCompanyMessages;
    },

    getCompanyMessage: async (_,{ company_id, company_message_id }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const foundCompanyMessage = await CompanyMessage.findOne({
        where:{ id:company_message_id, company_id },      
      });
      if (!foundCompanyMessage) { throw new Error("CompanyMessage not found"); }

      return foundCompanyMessage;
    },
  },

  Mutation: {
    createCompanyMessage: async (_,{ company_id, title, message, fixed }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const createdCompanyMessage = await CompanyMessage.create({
        company_id, title, message, fixed
      });
      return await CompanyMessage.findByPk(createdCompanyMessage.id);
    },

    updateCompanyMessage: async (_,{ company_id, company_message_id, title, message, fixed }) => {      
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundCompanyMessage = await CompanyMessage.findOne({ where: { id:company_message_id, company_id } });
      if (!foundCompanyMessage) { throw new Error("CompanyMessage not found"); }

      const updatedCompanyMessage = await CompanyMessage.update({
        title, message, fixed
      },{
        where: { id:company_message_id, company_id }
      });
      if (!updatedCompanyMessage) { throw new Error("Unexpected error"); }
      return await CompanyMessage.findByPk(company_message_id);
    },

    deleteCompanyMessage: async (_,{ company_id, company_message_id }) => {      
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundCompanyMessage = await CompanyMessage.findOne({ where: { id:company_message_id, company_id } });
      if (!foundCompanyMessage) { throw new Error("CompanyMessage not found"); }

      const deleteCompanyMessage = await foundCompanyMessage.destroy();
      if (!deleteCompanyMessage) { throw new Error("Unexpected error"); }
      return true;
    },
  }

};

module.exports = {
  CompanyMessageResolver,
}