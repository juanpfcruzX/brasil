var br = require("./brasil");

console.log(br.registroNacional("11.222.333/0001-81"));
console.log(br.registroNacional("00.132.781/0001-78"));
console.log(br.registroNacional("016.591.491-26"));

console.log(br.cnpj("11.222.333/0001-81"));
console.log(br.cnpj("00.132.781/0001-78"));

console.log(br.cpf("016.591.491-26"));

console.log(br.chaveDeAcesso("52060433009911002506550120000007800267301615"));
console.log(br.chaveDeAcesso("52110210132781000178550010000005480000005486"));

console.log(br.formatarChaveDeAcesso("52110210132781000178550010000005480000005486"));
console.log(br.formatarChaveDeAcesso("52060433009911002506550120000007800267301615"));

console.log(br.obterEstado(52));
console.log(br.obterEstado("DF"));
console.log(br.obterEstado("GO"));
console.log(br.obterEstado("MG"));
console.log(br.obterEstado("RJ"));
console.log(br.obterEstado("Rio de Janeiro"));
console.log(br.obterEstado("Goiás"));
console.log(br.obterEstado("Minas Gerais"));