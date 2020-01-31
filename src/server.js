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
  context: req => ({ token : req.request.get('authorization') })
});

//*/Import Bull-board
const BullBoard = require('bull-board');
const Queue = require('./lib/Queue');
BullBoard.setQueues(Queue.queues.map(queue => queue.bull))
app.express.use("/admin/queues", BullBoard.UI );
//*/

app.use( cors() );
app.start({ port: 3333 });