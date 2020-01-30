var AWS = require ('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const LogEmail = require("../models/LogEmail");

function sendSingleEmail ({ user_id, ToAddresses, CcAddresses, BccAddresses, Subject, Html, Text, ReplyToAddresses, Source, SourceName }) {
  var params = {
    Destination: { ToAddresses: [], CcAddresses: [], BccAddresses: [] },
    Message: {
      Body: {
        Html: { Charset: 'UTF-8', Data: '<p></p>' },
        Text: { Charset: 'UTF-8', Data: '' }
      },
      Subject: { Charset: 'UTF-8', Data: '' }
    },
    Source: process.env.AWS_SES_DEFAULT_SOURCE,
    ReplyToAddresses: [],
  };

  //Validações
  if (!ToAddresses && !CcAddresses ) { console.log('Invalid Params'); return false; }
  if (!Html && !Text) { console.log('Invalid Params'); return false; }

  //Preenchimento
  if (ToAddresses)      { params.Destination.ToAddresses = ToAddresses; }
  if (CcAddresses)      { params.Destination.CcAddresses = CcAddresses; }
  if (BccAddresses)     { params.Destination.BccAddresses = BccAddresses; }
  
  if (Subject)          { params.Message.Subject.Data = Subject; }
  if (Html)             { params.Message.Body.Html.Data = Html; }
  if (Text)             { params.Message.Body.Text.Data = Text; }
  if (ReplyToAddresses) { params.ReplyToAddresses = ReplyToAddresses; }
  
  if (Source) {
    if (SourceName) { Name = SourceName+' '; } else { Name = ''; }
    params.Source = Name+'<'+Source+'>';
  }

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

  if ( params.Message.Subject.Data.toString() ) {
    subject = params.Message.Subject.Data.toString();
  } else { subject = null; }

  if ( params.Destination.ToAddresses.toString() ) {
    to_addresses = params.Destination.ToAddresses.toString();
  } else { to_addresses = null; }

  if ( params.Destination.CcAddresses.toString() ) {
    cc_addresses = params.Destination.CcAddresses.toString();
  } else { cc_addresses = null; }

  if ( params.Destination.BccAddresses.toString() ) {
    bcc_addresses = params.Destination.BccAddresses.toString();
  } else { bcc_addresses = null; }

  if ( params.Source.toString() ) {
    source = params.Source.toString();
  } else { source = null; }

  sendPromise.then(
    async function(data) {
      console.log(data.MessageId);
      await LogEmail.create({
        user_id,
        subject, to_addresses, cc_addresses, bcc_addresses,
        source, message_id: data.MessageId
      });
      return data.MessageId;
    }).catch(
      async function(err) {
        console.log('sendSingleEmail ERROR. Log in Database.');
        await LogEmail.create({
          user_id,
          subject, to_addresses, cc_addresses, bcc_addresses,
          source, error: err.stack.toString()
        });
        return false;
    });
};

module.exports = {
  sendSingleEmail,
};
