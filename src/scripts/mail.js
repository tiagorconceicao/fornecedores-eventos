var AWS = require ('aws-sdk');
AWS.config.update({region: 'us-east-1'});

function sendSingleEmail ({ ToAddresses, CcAddresses, BccAddresses, Subject, Html, Text, ReplyToAddresses, Source, SourceName }) {
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

  sendPromise.then(
    function(data) {
      console.log(data.MessageId);
      return data.MessageId;
    }).catch(
      function(err) {
      console.error(err, err.stack);
      return false;
    });
};

module.exports = {
  sendSingleEmail,
};
