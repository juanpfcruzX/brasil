var nfe = require("./nfeUtils"),
	dados = require('./dadosUtils'),
	formatacoes = require('./formatacoesUtils'),
	removerMascara = formatacoes.removerMascara,
	utils = require("gammautils"),
	mUtils = utils.math,
	isUndefined = utils.object.isUndefined;

function eEan(ean) {
	if(typeof ean !== 'string' || !/^(?:\d{8}|\d{12,14})$/.test(ean)) {
		return false;
	}

	ean = ean.split('').map(Number);

	var peso = 1,
		digitoVerificador = ean.pop(),
		soma = ean.reduceRight(function(anterior, atual, indice) {
			peso = 4 - peso;
			return anterior + (atual * peso);
		}, 0),
		digitoVerificadorCalculado = (soma + ((10 - (soma % 10)) % 10)) - soma;

	return digitoVerificador === digitoVerificadorCalculado;
}
module.exports.eEan = eEan;

function eRegistroNacional(rn, tipo){
	if(typeof rn !== "string") {
		return false;
	}

	rn = removerMascara(rn);

	if(typeof tipo === 'undefined') {
		if(rn.length === 14 && eCnpj(rn)) {
			return "cnpj";
		}

		if(rn.length === 11 && eCpf(rn)) {
			return "cpf";
		}
	} else if(['cpf', 'cnpj'].indexOf(tipo.toLowerCase()) > -1) {
		//criar "primeiraMaiuscula" no gammautils (linha abaixo)
		var fn = module.exports['e' + tipo[0].toUpperCase() + tipo.substr(1)];

		if(fn(rn)) {
			return tipo;
		}
	}

	return false;
};
module.exports.eRegistroNacional = eRegistroNacional;

function eCnpj(cnpj){
	if(typeof cnpj !== "string") return false;
	cnpj = removerMascara(cnpj);
	if(cnpj.length !== 14) return false;

	var base = cnpj.substring(0, 12);

	var primeiroResto = mUtils.mod(base);
	var primeiroDigito = primeiroResto < 2 ? 0 : 11 - primeiroResto;

	var segundoResto = mUtils.mod(base + primeiroDigito);
	var segundoDigito = segundoResto < 2 ? 0 : 11 - segundoResto;

	return cnpj === base + primeiroDigito + segundoDigito;
};
module.exports.eCnpj = eCnpj;

var regexParaMatrizEFilial = /^[0-9]{8}([0-9]{4})[0-9]{2}$/;

function eMatriz(cnpj) {
	//retorna null caso não seja passado um cnpj
	//retorna true caso seja uma matriz
	//retorna false caso não seja uma matriz

	if(!eCnpj(cnpj)) {
		return null;
	}

	var matches = regexParaMatrizEFilial.exec(removerMascara(cnpj));

	return (matches !== null && matches.length === 2 && matches[1] === '0001');
}
module.exports.eMatriz = eMatriz;

function eFilial(cnpj) {
	//retorna null caso não seja passado um cnpj
	//retorna o número da filial caso seja passado um cnpj válido
	//retorna false caso não seja uma filial

	if(!eCnpj(cnpj)) {
		return null;
	}

	var matches = regexParaMatrizEFilial.exec(removerMascara(cnpj));

	if(matches !== null && matches.length === 2 && matches[1] !== '0001') {
		return parseInt(matches[1], 10);
	} else {
		return false;
	}
}
module.exports.eFilial = eFilial;

function eCpf(cpf){
	if(typeof cpf !== "string") return false;
	cpf = removerMascara(cpf);
	if(cpf.length !== 11) return false;

	var base = cpf.substring(0, 9);
	var multiplicadores = [2, 3, 4, 5, 6, 7, 8, 9, 10];

	var primeiroResto = mUtils.mod(base, multiplicadores);
	var primeiroDigito = primeiroResto < 2 ? 0 : 11 - primeiroResto;

	multiplicadores.push(11);

	var segundoResto = mUtils.mod(base + primeiroDigito, multiplicadores);
	var segundoDigito = segundoResto < 2 ? 0 : 11 - segundoResto;

	return cpf === base + primeiroDigito + segundoDigito;
};
module.exports.eCpf = eCpf;

function ePisPasep(pisPasep){
	if(typeof pisPasep !== "string") return false;
	pisPasep = removerMascara(pisPasep);
	if(pisPasep.length !== 11) return false;

	var base = pisPasep.substring(0,10);
	var multiplicadores = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

	var resto = mUtils.mod(base, multiplicadores, 11, 'leftToRight');
	var subtracao = 11 - resto;
	var digito = subtracao == 10 || subtracao == 11 ? 0 : subtracao;

	return pisPasep === base + digito;
}
module.exports.ePisPasep = ePisPasep;
module.exports.eNit = ePisPasep;

var regexDePlacaValida = /^[a-zA-Z]{3}-?[0-9]{4}$/;
module.exports.ePlaca = function(placa){
	return regexDePlacaValida.test(placa);
};


var regexDeCepValido = /^\d{2}\.?\d{3}-?\d{3}$/;
module.exports.eCep = function(cep){
	return regexDeCepValido.test(cep);
};

var regexpDeTelefoneValido = /^\(?([0-9]{1}[0-9]{1})*\)?\s?[1-9]{1}[0-9]{3,4}-?[0-9]{4}$/;
module.exports.eTelefone = function(telefone, validarDDD){
	var match = regexpDeTelefoneValido.exec(telefone);

	if(isUndefined(validarDDD)) {
		validarDDD = true;
	}

	if(match) {
		var ddd = match[1];

		if(validarDDD && ddd) {
			return eDDD(ddd);
		}

		return true;
	} else {
		return false;
	}
};

function eDDD(ddd) {
	ddd = parseInt(ddd, 10);

	if(isNaN(ddd)) {
		return false;
	}

	return typeof dados.codigosDDDDicionario[ddd] !== 'undefined';
}
module.exports.eDDD = eDDD;