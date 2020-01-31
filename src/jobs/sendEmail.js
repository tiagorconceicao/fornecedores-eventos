const { sendBasicEmail } = require('../lib/Mail');


module.exports = {
  key: 'sendEmail',
  async handle({ data }) {

    const {
      user_id, send_subject, send_message,
      send_to_addresses, send_cc_addresses, send_bcc_addresses,
      from, from_name
    } = data;

    await sendBasicEmail({
      user_id,
      Subject: send_subject,
      Html: send_message,
      ToAddresses: send_to_addresses,
      CcAddresses: send_cc_addresses,
      BccAddresses: send_bcc_addresses,
      Source: from,
      SourceName: from_name
    });
    
  }
}