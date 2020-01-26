const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const dbConnection = new Sequelize(dbConfig);

// Load Models
const Event = require('../models/Event');
const ServiceField = require('../models/ServiceField');
const RatingField = require('../models/RatingField');
const Company = require('../models/Company');
const CompanyPhone = require('../models/CompanyPhone');
const CompanyEmail = require('../models/CompanyEmail');
const CompanyLocation = require('../models/CompanyLocation');
const CompanyEvent = require('../models/CompanyEvent');
const CompanyEventRating = require('../models/CompanyEventRating');
const CompanyMessage = require('../models/CompanyMessage');

// Start Connections
Event.init(dbConnection);
ServiceField.init(dbConnection);
RatingField.init(dbConnection);
Company.init(dbConnection);
CompanyPhone.init(dbConnection);
CompanyEmail.init(dbConnection);
CompanyLocation.init(dbConnection);
CompanyEvent.init(dbConnection);
CompanyEventRating.init(dbConnection);
CompanyMessage.init(dbConnection);

// Start Associations
Event.associate(dbConnection.models);
ServiceField.associate(dbConnection.models);
RatingField.associate(dbConnection.models);
Company.associate(dbConnection.models);
CompanyPhone.associate(dbConnection.models);
CompanyEmail.associate(dbConnection.models);
CompanyLocation.associate(dbConnection.models);
CompanyEvent.associate(dbConnection.models);
CompanyEventRating.associate(dbConnection.models);
CompanyMessage.associate(dbConnection.models);

module.exports = dbConnection;