const Company = require("../models/Company");
const Event = require("../models/Event");

const CompanyEventResolver = {
  Query: {
    getCompanyEvents: async (_,{ company_id }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const foundCompanyEvents = await foundCompany.getEvents();
      return foundCompanyEvents;
    },
  },

  Mutation: {
    addCompanyEvent: async (_,{ company_id, event_id }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundEvent = await Event.findByPk(event_id);
      if (!foundEvent) { throw new Error("Event not found"); }

      checkCompanyEvent = await foundCompany.hasEvent(foundEvent);
      if (checkCompanyEvent) { throw new Error("Association already exists"); }

      const addCompanyEvent = await foundCompany.addEvent(foundEvent);
      if (!addCompanyEvent) { throw new Error("Unexpected error"); }
      return true;
    },

    deleteCompanyEvent: async (_,{ company_id, event_id }) => {      
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundEvent = await Event.findByPk(event_id);
      if (!foundEvent) { throw new Error("Event not found"); }

      checkCompanyEvent = await foundCompany.hasEvent(foundEvent);
      if (!checkCompanyEvent) { throw new Error("Association not exists"); }

      const removeCompanyEvent = await foundCompany.removeEvent(foundEvent);
      if (!removeCompanyEvent) { throw new Error("Unexpected error"); }
      return true;
    },
  }

};

module.exports = {
  CompanyEventResolver,
}