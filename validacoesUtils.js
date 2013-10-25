var
	nfe = require("./nfeUtils"),
	mUtils = require("gammautils").math;

module.exports.eRegistroNacional = eRegistroNacional;
function eRegistroNacional(rn){
	if(typeof rn !== "string") return false;
	
	rn = removerMascara(rn);
	
	if(rn.length === 14 && eCnpj(rn)) return "cnpj";
	if(rn.length === 11 && eCpf(rn)) return "cpf";
	
	return false;
};

module.exports.eCnpj = eCnpj; 
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

module.exports.eCpf = eCpf;
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

//identificar porque neste ponto nfe.validarChaveDeAcesso chega undefined
//module.exports.eChaveDeAcessoDeNfe = nfe.validarChaveDeAcesso;

var regexDePlacaValida = /^[a-zA-Z]{3}-?[0-9]{4}$/;
module.exports.ePlaca = function(placa){
	return regexDePlacaValida.test(placa); 
};


var regexDeCepValido = /^\d{2}\.?\d{3}-?\d{3}$/;
module.exports.eCep = function(cep){
	return regexDeCepValido.test(cep); 
};

var regexpDeTelefoneValido = /^\(?[1-9]{1}[0-9]{1}\)?\s?[1-9]{1}[0-9]{3,4}-?[0-9]{4}$/;
module.exports.eTelefone = function(telefone){
	return regexpDeTelefoneValido.test(telefone);
};

function removerMascara(texto){
	return texto.replace(/\W/g, "").replace(/\./g, "").replace(/\//g, "").replace(/\-/g, "").replace(/\s/g, "").trim();
}