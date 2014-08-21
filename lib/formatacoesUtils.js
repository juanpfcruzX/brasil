var validacoes = require("./validacoesUtils");

module.exports.removerMascara = removerMascara;
function removerMascara(texto) {
	if(typeof texto !== 'string') {
		return texto;
	}

	return texto
		.trim()
		.replace(/\(/g, '')
		.replace(/\)/g, '')
		.replace(/\./g, '')
		.replace(/\//g, '')
		.replace(/-/g, '')
		.replace(/\s/g, '')
		.replace(/R\$/g, '')
		.replace(/%/g, '')
		.trim()
}

module.exports.cnpj = cnpj;
function cnpj(texto) {
	if(!validacoes.eCnpj(texto)) return texto;
	if(texto.trim().length > 14) return texto;

	texto = texto.trim();

	return texto.substr(0, 2) + "." +
		texto.substr(2, 3) + "." +
		texto.substr(5, 3) + "/" +
		texto.substr(8, 4) + "-" +
		texto.substr(12, 2);
};

module.exports.cpf = cpf;
function cpf(texto) {
	if(!validacoes.eCpf(texto)) return texto;
	if(texto.trim().length > 11) return texto;

	texto = texto.trim();

	return texto.substr(0, 3) + "." +
		texto.substr(3, 3) + "." +
		texto.substr(6, 3) + "-" +
		texto.substr(9, 2);
};

module.exports.registroNacional = registroNacional;
function registroNacional(texto) {
	var tipo = validacoes.eRegistroNacional(texto);

	if(!tipo) return texto;

	return this[tipo](texto);
};

module.exports.telefone = telefone;
function telefone(texto) {
	if(!validacoes.eTelefone(texto)) return texto;

	texto = texto.trim().replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "").replace(/-/g, "");

	var i = (texto.length === 11 ? 1 : 0);

	return "(" + texto.substr(0, 2) + ") " + texto.substr(2, 4 + i) + "-" + texto.substr(6 + i, 4);
}

module.exports.placa = placa;
function placa(texto) {
	if(!validacoes.ePlaca(texto)) return texto;

	texto = texto.trim().replace(/-/g, "");

	return texto.substr(0, 3).toUpperCase() + "-" + texto.substr(3, 4);
}

module.exports.cep = cep;
function cep(texto) {
	if(!validacoes.eCep(texto)) return texto;

	texto = texto.trim().replace(/-/g, "").replace(/\./g, "");

	return texto.substr(0, 2) + "." + texto.substr(2, 3) + "-" + texto.substr(5, 3);
}