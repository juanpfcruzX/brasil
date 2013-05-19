var ie = require("inscricaoestadual"); 

module.exports.inscricaoEstadual = ie;

module.exports.registroNacional = registroNacional;
function registroNacional(rn){
	if(typeof rn !== "string") return false;
	rn = removerMascara(rn);
	
	if(rn.length === 14 && cnpj(rn)) return "cnpj";
	else if(rn.length === 11 && cpf(rn)) return "cpf";
	else return false;
};

module.exports.cnpj = cnpj; 
function cnpj(cnpj){
	if(typeof cnpj !== "string") return false;
	cnpj = removerMascara(cnpj);
	if(cnpj.length !== 14) return false;
	
	var base = cnpj.substring(0, 12);
	
	var primeiroResto = mod11(base);
	var primeiroDigito = primeiroResto < 2 ? 0 : 11 - primeiroResto;
	
	var segundoResto = mod11(base + primeiroDigito);
	var segundoDigito = segundoResto < 2 ? 0 : 11 - segundoResto;
	
	return cnpj === base + primeiroDigito + segundoDigito;
};

module.exports.cpf = cpf;
function cpf(cpf){
	if(typeof cpf !== "string") return false;
	cpf = removerMascara(cpf);
	if(cpf.length !== 11) return false;
	
	var base = cpf.substring(0, 9);
	var multiplicadores = [2, 3, 4, 5, 6, 7, 8, 9, 10];
	
	var primeiroResto = mod11(base, multiplicadores);
	var primeiroDigito = primeiroResto < 2 ? 0 : 11 - primeiroResto;
	
	multiplicadores.push(11);
	
	var segundoResto = mod11(base + primeiroDigito, multiplicadores);
	var segundoDigito = segundoResto < 2 ? 0 : 11 - segundoResto;
	
	return cpf === base + primeiroDigito + segundoDigito;
};

function removerMascara(texto){
	return texto.replace(/\./g, "").replace(/\//g, "").replace(/\-/g, "");
}

function mod11(valor, multiplicadores){
	if(typeof multiplicadores === "undefined")
		multiplicadores = [2, 3, 4, 5, 6, 7, 8, 9];
		
	var i = 0;
	return valor.split("").reduceRight(function(anterior, atual){
		if(i > multiplicadores.length - 1) i = 0;
		return (multiplicadores[i++] * parseInt(atual)) + anterior; 
	}, 0) % 11;
}