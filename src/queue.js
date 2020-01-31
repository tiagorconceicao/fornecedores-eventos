require('./database/index');
const { mailQueue } = require('./lib/Queue');
const sendEmail = require('./jobs/sendEmail');

mailQueue.process( sendEmail.handle );


