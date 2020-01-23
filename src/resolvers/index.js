const { EventResolver } = require('./EventResolver');
const { ServiceFieldResolver } = require('./ServiceFieldResolver');
const { RatingFieldResolver } = require('./RatingFieldResolver');
const { CompanyResolver } = require('./CompanyResolver');
const { CompanyPhoneResolver } = require('./CompanyPhoneResolver');
const { CompanyEmailResolver } = require('./CompanyEmailResolver');

const resolvers = [
  EventResolver, ServiceFieldResolver, RatingFieldResolver,
  CompanyResolver, CompanyPhoneResolver, CompanyEmailResolver
];

module.exports = {
  resolvers,
};