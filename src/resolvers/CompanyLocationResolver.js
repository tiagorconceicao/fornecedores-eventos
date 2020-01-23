const Company = require("../models/Company");
const CompanyLocation = require("../models/CompanyLocation");

const estados = [
  {"nome": "Todos", "sigla": "ALL"},
  {"nome": "Acre", "sigla": "AC"},
  {"nome": "Alagoas", "sigla": "AL"},
  {"nome": "Amapá", "sigla": "AP"},
  {"nome": "Amazonas", "sigla": "AM"},
  {"nome": "Bahia", "sigla": "BA"},
  {"nome": "Ceará", "sigla": "CE"},
  {"nome": "Distrito Federal", "sigla": "DF"},
  {"nome": "Espírito Santo", "sigla": "ES"},
  {"nome": "Goiás", "sigla": "GO"},
  {"nome": "Maranhão", "sigla": "MA"},
  {"nome": "Mato Grosso", "sigla": "MT"},
  {"nome": "Mato Grosso do Sul", "sigla": "MS"},
  {"nome": "Minas Gerais", "sigla": "MG"},
  {"nome": "Pará", "sigla": "PA"},
  {"nome": "Paraíba", "sigla": "PB"},
  {"nome": "Paraná", "sigla": "PR"},
  {"nome": "Pernambuco", "sigla": "PE"},
  {"nome": "Piauí", "sigla": "PI"},
  {"nome": "Rio de Janeiro", "sigla": "RJ"},
  {"nome": "Rio Grande do Norte", "sigla": "RN"},
  {"nome": "Rio Grande do Sul", "sigla": "RS"},
  {"nome": "Rondônia", "sigla": "RO"},
  {"nome": "Roraima", "sigla": "RR"},
  {"nome": "Santa Catarina", "sigla": "SC"},
  {"nome": "São Paulo", "sigla": "SP"},
  {"nome": "Sergipe", "sigla": "SE"},
  {"nome": "Tocantins", "sigla": "TO"}
];

const CompanyLocationResolver = {
  Query: {
    getCompanyLocations: async (_,{ company_id }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const foundCompanyLocations = await CompanyLocation.findAll({
        where:{ company_id },      
      });

      return foundCompanyLocations;
    },

    getCompanyLocation: async (_,{ company_id, company_location_id }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const foundCompanyLocation = await CompanyLocation.findOne({
        where:{ id:company_location_id, company_id },      
      });
      if (!foundCompanyLocation) { throw new Error("CompanyLocation not found"); }

      return foundCompanyLocation;
    },
  },

  Mutation: {
    createCompanyLocation: async (_,{ company_id, state, city }) => {
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const found_estado = estados.find(o => o.sigla === state);
      if (!found_estado) { throw new Error("Invalid state"); }
      if (!city) { throw new Error("Invalid city"); }

      const existsCompanyLocation = await CompanyLocation.findOne({ where: { state, city, company_id } });
      if ( existsCompanyLocation ) {
        throw new Error("CompanyLocation 'STATE' & 'CITY' already exists");
      }

      const createdCompanyLocation = await CompanyLocation.create({
        company_id, state, city
      });
      return await CompanyLocation.findByPk(createdCompanyLocation.id);
    },

    updateCompanyLocation: async (_,{ company_id, company_location_id, state, city }) => {      
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      const found_estado = estados.find(o => o.sigla === state);
      if (!found_estado) { throw new Error("Invalid state"); }
      if (!city) { throw new Error("Invalid city"); }

      foundCompanyLocation = await CompanyLocation.findOne({ where: { id:company_location_id, company_id } });
      if (!foundCompanyLocation) { throw new Error("CompanyLocation not found"); }

      if (foundCompanyLocation.state != state || foundCompanyLocation.city != city) {
        const existsCompanyLocation = await CompanyLocation.findOne({ where: { company_id, state, city } });
        if ( existsCompanyLocation ) {
          throw new Error("CompanyLocation already exists");
        }
      }

      const updatedCompanyLocation = await CompanyLocation.update({
        state, city
      },{
        where: { id:company_location_id, company_id }
      })
      if (!updatedCompanyLocation) { throw new Error("Unexpected error"); }
      return await CompanyLocation.findByPk(company_location_id);
    },

    deleteCompanyLocation: async (_,{ company_id, company_location_id }) => {      
      foundCompany = await Company.findByPk(company_id);
      if (!foundCompany) { throw new Error("Company not found"); }

      foundCompanyLocation = await CompanyLocation.findOne({ where: { id:company_location_id, company_id } });
      if (!foundCompanyLocation) { throw new Error("CompanyLocation not found"); }

      const deleteCompanyLocation = await CompanyLocation.destroy({ where: { id:company_location_id, company_id } });

      if (!deleteCompanyLocation) { throw new Error("Unexpected error"); }
      return true;
    },
  }

};

module.exports = {
  CompanyLocationResolver,
}