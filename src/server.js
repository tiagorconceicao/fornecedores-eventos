//const path = require('path');
const { GraphQLServer } = require('graphql-yoga');
const cors = require('cors');
const { loadResolversFiles, loadSchemaFiles } = require('@graphql-modules/sonar');
const { mergeGraphQLSchemas, mergeResolvers } = require('@graphql-modules/epoxy');
const { resolvers } = require('./resolvers');

require('./database/index');


const app = new GraphQLServer({
  typeDefs: mergeGraphQLSchemas(loadSchemaFiles(__dirname + "/schemas/")),
  resolvers,
});

app.use( cors() );
app.start({ port: 3333 });