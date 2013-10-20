var br = require("./brasil");

console.log(br.registroNacional("11.222.333/0001-81"));
console.log(br.registroNacional("00.132.781/0001-78"));
console.log(br.registroNacional("016.591.491-26"));

console.log(br.cnpj("11.222.333/0001-81"));
console.log(br.cnpj("00.132.781/0001-78"));

console.log(br.cpf("016.591.491-26"));

console.log(br.chaveDeAcesso("defghjkabcdefghjkabcdefghjkabcdefghjkabcdefg"));
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

console.log(br.obterEstado("minas gerais"));
console.log(br.obterEstado(1234));

console.log(br.regioes[2410]);

console.log(br.municipiosDicionario["2800308"]);
console.log(br.municipiosDicionario["1501402"]);
console.log(br.municipiosDicionario["3106200"]);
console.log(br.municipiosDicionario["1400100"]);
console.log(br.municipiosDicionario["5300108"]);
console.log(br.municipiosDicionario["5002704"]);
console.log(br.municipiosDicionario["5103403"]);
console.log(br.municipiosDicionario["4106902"]);
console.log(br.municipiosDicionario["4205407"]);
console.log(br.municipiosDicionario["2304400"]);
console.log(br.municipiosDicionario["5208707"]);
console.log(br.municipiosDicionario["2507507"]);
console.log(br.municipiosDicionario["1600303"]);
console.log(br.municipiosDicionario["2704302"]);
console.log(br.municipiosDicionario["1302603"]);
console.log(br.municipiosDicionario["2408102"]);
console.log(br.municipiosDicionario["1721000"]);
console.log(br.municipiosDicionario["4314902"]);
console.log(br.municipiosDicionario["1100205"]);
console.log(br.municipiosDicionario["2611606"]);
console.log(br.municipiosDicionario["1200401"]);
console.log(br.municipiosDicionario["3304557"]);
console.log(br.municipiosDicionario["2927408"]);
console.log(br.municipiosDicionario["2111300"]);
console.log(br.municipiosDicionario["3550308"]);
console.log(br.municipiosDicionario["2211001"]);
console.log(br.municipiosDicionario["3205309"]);

console.log(br.municipiosArray[1234]);
console.log(br.municipiosArray[666]);
console.log(br.municipiosArray[4321]);


console.log(br.cfopsArray[123]);
console.log(br.cfopsArray[321]);

console.log(br.cfopsDicionario["6101"]);
console.log(br.cfopsDicionario["5101"]);



console.log(br.gerarChaveDeAcesso({
	uf: "DF",
	dataDeEmissao: new Date(),
	cnpj: "00132781000178",
	modelo: "55",
	serie: 1,
	numero: 19820,
	tipoDeEmissao: 1,
	numeroAleatorio: 123
}));





