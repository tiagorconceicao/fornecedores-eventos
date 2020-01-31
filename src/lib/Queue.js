const Queue = require('bull');
const redisConfig = require('../config/redis');

const sendEmail = require('../jobs/sendEmail');

const mailQueue = new Queue (sendEmail.key,redisConfig);


mailQueue.on('failed', (job, err) => {
  console.log('Job failed', job.name, job.data);
  console.log(err);
})


module.exports = {
  mailQueue
};