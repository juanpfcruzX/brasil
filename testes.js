var brasil = require("./brasil");

console.log(brasil.registroNacional("11.222.333/0001-81"));
console.log(brasil.registroNacional("00.132.781/0001-78"));
console.log(brasil.registroNacional("016.591.491-26"));

console.log(brasil.cnpj("11.222.333/0001-81"));
console.log(brasil.cnpj("00.132.781/0001-78"));

console.log(brasil.cpf("016.591.491-26"));

console.log(brasil.chaveDeAcesso("52060433009911002506550120000007800267301615"));