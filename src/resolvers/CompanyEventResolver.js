const Company = require("../models/Company");
const Event = require("../models/Event");
const CompanyEvent = require("../models/CompanyEvent");

const CompanyEventResolver = {
  Query: {
    getCompanyEvents: async (_,{ company_id }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const foundCompanyEvents = await Event.findAll({
        include: {
          association:'companies',
          where: { company_id }
        }
      });

      return foundCompanyEvents;
    },
  },

  Mutation: {
    addCompanyEvent: async (_,{ company_id, event_id }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundEvent = await Event.findByPk(event_id);
      if (!foundEvent) { throw new Error("Event not found"); }

      foundCompanyEvent = await CompanyEvent.findOne({ where: {company_id, event_id} });
      if (foundCompanyEvent) { throw new Error("Association already exists"); }

      const addCompanyEvent = await CompanyEvent.create({
        company_id, event_id
      });
      if (!addCompanyEvent) { throw new Error("Unexpected error"); }
      return true;
    },

    deleteCompanyEvent: async (_,{ company_id, event_id }) => {      
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundEvent = await Event.findByPk(event_id);
      if (!foundEvent) { throw new Error("Event not found"); }

      foundCompanyEvent = await CompanyEvent.findOne({ where: {company_id, event_id} });
      if (!foundCompanyEvent) { throw new Error("Association not exists"); }

      const removeCompanyEvent = await foundCompanyEvent.destroy();
      if (!removeCompanyEvent) { throw new Error("Unexpected error"); }
      return true;
    },
  }

};

module.exports = {
  CompanyEventResolver,
}