const { sendSingleEmail } = require('./scripts/mail');


var email = {
  Subject:'Teste da função 2',
  Html: '<p>Holá mundo!</p>',
  ToAddresses: ['tiracotech@gmail.com'],
  //Source: 'nao.responder@planoaeventos.com.br',
  //SourceName: 'Contato Plano A',
};

sendSingleEmail(email);