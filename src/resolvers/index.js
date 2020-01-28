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
const { CompanyMessageResolver } = require('./CompanyMessageResolver');
const { UserResolver } = require('./UserResolver');
const { AuthResolver } = require('./AuthResolver');

const resolvers = [
  UserResolver, AuthResolver,
  EventResolver, ServiceFieldResolver, RatingFieldResolver,
  CompanyResolver, CompanyPhoneResolver, CompanyEmailResolver,
  CompanyLocationResolver, CompanyServiceFieldResolver, CompanyEventResolver,
  CompanyEventRatingResolver, CompanyMessageResolver
];

module.exports = {
  resolvers,
};