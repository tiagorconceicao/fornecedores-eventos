const { EventResolver } = require('./EventResolver');
const { ServiceFieldResolver } = require('./ServiceFieldResolver');
const { RatingFieldResolver } = require('./RatingFieldResolver');
const { CompanyResolver } = require('./CompanyResolver');
const { CompanyPhoneResolver } = require('./CompanyPhoneResolver');
const { CompanyEmailResolver } = require('./CompanyEmailResolver');
const { CompanyLocationResolver } = require('./CompanyLocationResolver');
const { CompanyServiceFieldResolver } = require('./CompanyServiceFieldResolver');
const { CompanyEventResolver } = require('./CompanyEventResolver');
const { CompanyEventRatingResolver } = require('./CompanyEventRatingResolver');

const resolvers = [
  EventResolver, ServiceFieldResolver, RatingFieldResolver,
  CompanyResolver, CompanyPhoneResolver, CompanyEmailResolver,
  CompanyLocationResolver, CompanyServiceFieldResolver, CompanyEventResolver,
  CompanyEventRatingResolver
];

module.exports = {
  resolvers,
};