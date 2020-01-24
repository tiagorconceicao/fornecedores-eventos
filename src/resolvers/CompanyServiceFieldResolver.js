const Company = require("../models/Company");
const ServiceField = require("../models/ServiceField");

const CompanyServiceFieldResolver = {
  Query: {
    getCompanyServices: async (_,{ company_id }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const foundCompanyServices = await foundCompany.getService_fields();
      return foundCompanyServices;
    },
  },

  Mutation: {
    addCompanyService: async (_,{ company_id, service_field_id }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundServiceField = await ServiceField.findByPk(service_field_id);
      if (!foundServiceField) { throw new Error("ServiceField not found"); }

      checkCompanyService = await foundCompany.hasService_field(foundServiceField);
      if (checkCompanyService) { throw new Error("Association already exists"); }

      const addCompanyService = await foundCompany.addService_field(foundServiceField);
      if (!addCompanyService) { throw new Error("Unexpected error"); }
      return true;
    },

    deleteCompanyService: async (_,{ company_id, service_field_id }) => {      
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundServiceField = await ServiceField.findByPk(service_field_id);
      if (!foundServiceField) { throw new Error("ServiceField not found"); }

      checkCompanyService = await foundCompany.hasService_field(foundServiceField);
      if (!checkCompanyService) { throw new Error("Association not exists"); }

      const removeCompanyService = await foundCompany.removeService_field(foundServiceField);
      if (!removeCompanyService) { throw new Error("Unexpected error"); }
      return true;
    },
  }

};

module.exports = {
  CompanyServiceFieldResolver,
}