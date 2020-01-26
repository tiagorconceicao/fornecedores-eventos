const Company = require("../models/Company");
const Event = require("../models/Event");
const RatingField = require("../models/RatingField");
const CompanyEvent = require("../models/CompanyEvent");
const CompanyEventRating = require("../models/CompanyEventRating");

const CompanyEventRatingResolver = {
  Query: {

    getCompanyEventRatings: async (_,{ company_id, event_id }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundEvent = await Event.findByPk(event_id);
      if (!foundEvent) { throw new Error("Event not found"); }

      foundCompanyEvent = await CompanyEvent.findOne({ where: {company_id, event_id} });
      if (!foundCompanyEvent) { throw new Error("Association not exists"); }

      foundCompanyEventRatings = await CompanyEventRating.findAll({
        where: { company_event_id:foundCompanyEvent.id },
        include: [
          {association:'rating_field'},
          {association:'company_event'},
        ],
      });

      return foundCompanyEventRatings;
    },

    getCompanyEventRating: async (_,{ company_id, event_id, rating_field_id }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundEvent = await Event.findByPk(event_id);
      if (!foundEvent) { throw new Error("Event not found"); }

      foundCompanyEvent = await CompanyEvent.findOne({ where: {company_id, event_id} });
      if (!foundCompanyEvent) { throw new Error("Association not exists"); }

      foundRatingField = await RatingField.findByPk(rating_field_id);
      if (!foundRatingField) { throw new Error("RatingField not found"); }

      foundCompanyEventRating = await CompanyEventRating.findOne({
        where: { company_event_id:foundCompanyEvent.id, rating_field_id },
        include: [
          {association:'rating_field'},
          {association:'company_event'},
        ],
      });
      if (!foundCompanyEventRating) { throw new Error("CompanyEventRating not found"); }

      return foundCompanyEventRating;
    },

  },

  Mutation: {
    addCompanyEventRating: async (_,{ company_id, event_id, rating_field_id, score, comment }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundEvent = await Event.findByPk(event_id);
      if (!foundEvent) { throw new Error("Event not found"); }

      foundCompanyEvent = await CompanyEvent.findOne({ where: {company_id, event_id} });
      if (!foundCompanyEvent) { throw new Error("Association not exists"); }

      foundRatingField = await RatingField.findByPk(rating_field_id);
      if (!foundRatingField) { throw new Error("RatingField not found"); }

      foundCompanyEventRating = await CompanyEventRating.findOne({
        where: {
          company_event_id:foundCompanyEvent.id, rating_field_id
        }
      });

      if ( !foundCompanyEventRating ) {
        const addCompanyEventRating = await CompanyEventRating.create({
          company_event_id:foundCompanyEvent.id,
          rating_field_id, score, comment
        });
        if (!addCompanyEventRating) { throw new Error("Unexpected error"); }
      } else {
        const updateCompanyEventRating = await foundCompanyEventRating.update({
          score, comment
        });
        if (!updateCompanyEventRating) { throw new Error("Unexpected error"); }
      }

      getCompanyEventRating = await CompanyEventRating.findOne({
        where: { company_event_id:foundCompanyEvent.id, rating_field_id },
        include: [
          {association:'rating_field'},
          {association:'company_event'},
        ],
      });
      if (!getCompanyEventRating) { throw new Error("Unexpected error"); }

      return getCompanyEventRating;
    },

    deleteCompanyEventRating: async (_,{ company_id, event_id, rating_field_id }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundEvent = await Event.findByPk(event_id);
      if (!foundEvent) { throw new Error("Event not found"); }

      foundCompanyEvent = await CompanyEvent.findOne({ where: {company_id, event_id} });
      if (!foundCompanyEvent) { throw new Error("Association not exists"); }

      foundRatingField = await RatingField.findByPk(rating_field_id);
      if (!foundRatingField) { throw new Error("RatingField not found"); }

      foundCompanyEventRating = await CompanyEventRating.findOne({
        where: { company_event_id:foundCompanyEvent.id, rating_field_id },
      });
      if (!foundCompanyEventRating) { throw new Error("CompanyEventRating not found"); }

      deleteCompanyEventRating = await foundCompanyEventRating.destroy();
      if (!deleteCompanyEventRating) { throw new Error("Unexpected error"); }

      return true;
    },
  }

};

module.exports = {
  CompanyEventRatingResolver,
}