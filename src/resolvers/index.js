const { EventResolver } = require('./EventResolver');
const { ServiceFieldResolver } = require('./ServiceFieldResolver');
const { RatingFieldResolver } = require('./RatingFieldResolver');
const { CompanyResolver } = require('./CompanyResolver');
const { CompanyPhoneResolver } = require('./CompanyPhoneResolver');
const { CompanyEmailResolver } = require('./CompanyEmailResolver');
const { CompanyLocationResolver } = require('./CompanyLocationResolver');

const resolvers = [
  EventResolver, ServiceFieldResolver, RatingFieldResolver,
  CompanyResolver, CompanyPhoneResolver, CompanyEmailResolver,
  CompanyLocationResolver
];

module.exports = {
  resolvers,
};