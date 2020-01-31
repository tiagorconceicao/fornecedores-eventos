const moment = require('moment');
const Queue = require('../lib/Queue');
const { validateToken } = require("../middlewares/authentication");

//Function to check JSON integrity
function isJson(item) {
  item = typeof item !== "string" ? JSON.stringify(item) : item;
  try { item = JSON.parse(item); } catch (e) { return false; }
  if (typeof item === "object" && item !== null) { return true; }
  return false;
}

const SendEmailResolver = {

  Mutation: {

    sendBasicEmail: async (_,{ company_name, to_addresses, cc_addresses, bcc_addresses, from, from_name, pre_subject, subject, message },{token}) => {
      const decoded = validateToken(token);
      
      //Repair JSONString replacing ' by "
      company_name = company_name.replace(/'/g,'"');
      to_addresses = to_addresses.replace(/'/g,'"');
      cc_addresses = cc_addresses.replace(/'/g,'"');
      bcc_addresses = bcc_addresses.replace(/'/g,'"');

      //Check JSON integrity
      if ( !isJson(company_name) ) { throw new Error("Malformatted data! 'company_name' is not a JSON"); }
      if ( !isJson(to_addresses) ) { throw new Error("Malformatted data! 'to_addresses' is not a JSON"); }
      if ( !isJson(cc_addresses) ) { throw new Error("Malformatted data! 'cc_addresses' is not a JSON"); }
      if ( !isJson(bcc_addresses) ) { throw new Error("Malformatted data! 'bcc_addresses' is not a JSON"); }

      //Parse to JSON
      company_name = JSON.parse(company_name);
      to_addresses = JSON.parse(to_addresses);
      cc_addresses = JSON.parse(cc_addresses);
      bcc_addresses = JSON.parse(bcc_addresses);

      //Check ADDRESSES integrity
      count = to_addresses.length
      if (
        !(company_name.length == count) ||
        !(cc_addresses.length == count) ||
        !(bcc_addresses.length == count)
      ) { throw new Error("Malformatted data!"); }

      for (let i = 0; i < count; i++) {

        send_subject = subject;
        if ( company_name[i].toString() ) {
          send_subject = company_name[i].toString() + ' - ' + send_subject;
        }

        if ( pre_subject ) {
          send_subject = pre_subject + ' - ' + send_subject;
        }

        send_to_addresses = to_addresses[i].toString();
        if (send_to_addresses) {
          send_to_addresses = send_to_addresses.split(',');
        } else { send_to_addresses = send_to_addresses.split(''); }

        send_cc_addresses = cc_addresses[i].toString();
        if (send_cc_addresses) {
          send_cc_addresses = send_cc_addresses.split(',');
        } else { send_cc_addresses = send_cc_addresses.split(''); }

        send_bcc_addresses = bcc_addresses[i].toString();
        if (send_bcc_addresses) {
          send_bcc_addresses = send_bcc_addresses.split(',');
        } else { send_bcc_addresses = send_bcc_addresses.split(''); }

        if ( company_name[i].toString() ) {
          var send_message = message.replace('%COMPANY_NAME%', company_name[i].toString() );
        } else { send_message = message; }

        //Add email to QUEUE
        await Queue.add('sendEmail',{
          user_id: decoded.id,
          send_subject, send_message, from, from_name,
          send_to_addresses, send_cc_addresses, send_bcc_addresses
        });

        // console.log('LOOP: '+(i+1));
        // console.log('subject: '+send_subject);
        // console.log('To:');
        // console.log( send_to_addresses );
        // console.log('Cc:');
        // console.log( send_cc_addresses );
        // console.log('Bcc:');
        // console.log( send_bcc_addresses );
        // console.log('From: '+from);
        // console.log('From name: '+from_name);   
        // console.log('message: '+send_message);
        // console.log('-----------------------------------------------------'); 
        now = moment().format('YY-MM-DD HH:mm:ss');
        console.log('('+now+') add sendEmail to Queue'); 
      }

      return true;
    },
    
  }

};

module.exports = {
  SendEmailResolver
}