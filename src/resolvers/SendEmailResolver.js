const moment = require('moment');
const Queue = require('../lib/Queue');
const { validateToken } = require("../middlewares/authentication");

const SendEmailResolver = {

  Mutation: {

    sendBasicEmail: async (_,{ to },{token}) => {
      
      //validateToken(token);
      company_name = [
        ["Praxis Jr"],
        ["Engetop"],
      ];

      to_addresses = [
        ["tiraco"],
        ["tiracotech"],
      ];

      cc_addresses = [
        [],
        [],
      ];

      bcc_addresses = [
        [],
        [],
      ];

      var from = "tiago@planoaeventos.com.br";
      var from_name = "Tiago Teste";
      var pre_subject = 'Plano A Eventos';
      var subject = "Orçamento v4";
      var message = "<p>Olá %COMPANY_NAME%. Segue email.</p>";

      count = to_addresses.length
      if (
        !(company_name.length == count) ||
        !(cc_addresses.length == count) ||
        !(bcc_addresses.length == count)
      ) {
        throw new Error("Malformatted data!");
      }

      for (let i = 0; i < count; i++) {

        send_subject = subject;
        if ( company_name[i].toString() ) {
          send_subject = company_name[i].toString() + ' - ' + send_subject;
        }
        if ( pre_subject ) {
          send_subject = pre_subject + ' - ' + send_subject;
        }
        //console.log(send_subject);

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


        console.log('i = '+i);
        console.log('To:');
        console.log( to_addresses[i] );
        console.log( send_to_addresses );
        console.log('Cc:');
        console.log( cc_addresses[i] );
        console.log( send_cc_addresses );
        console.log('Bcc:');
        console.log( bcc_addresses[i] );
        console.log( send_bcc_addresses );
        console.log('\n');

        if ( company_name[i].toString() ) {
          var send_message = message.replace('%COMPANY_NAME%', company_name[i].toString() );
        } else { send_message = message; }

        /*
        await Queue.add('sendEmail',{
          user_id:1,
          send_subject, send_message, from, from_name,
          send_to_addresses, send_cc_addresses, send_bcc_addresses
        });

        now = moment().format('YY-MM-DD HH:mm:ss');
        console.log('add sendEmail to Queue (at '+now+')');
        */

      }
      
      return true;

    },

    
  }

};

module.exports = {
  SendEmailResolver,
}