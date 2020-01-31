const { sendBasicEmail } = require('./scripts/mail');

sendBasicEmail({
  user_id: 1,
  Subject:'Teste',
  Html: '<p>Holá mundo!</p>',
  ToAddresses: ['tiracotech@gmail.com'],
  //CcAddresses: [],
  //BccAddresses: [],
  //Source: 'nao.responder@planoaeventos.com.br',
  //SourceName: 'Contato Plano A',
});