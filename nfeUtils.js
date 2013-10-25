var 
	validacoes = require("./validacoesUtils"),
	dados = require("./dadosUtils"),
	sUtils = require("gammautils").string,
	mUtils = require("gammautils").math;

module.exports.formatarSerie = formatarSerie;
function formatarSerie(serie){
	return sUtils.pad(serie, 3, "0");
}

module.exports.formatarNumero = formatarNumero;
function formatarNumero(numero){
	return sUtils.pad(numero, 9, "0").split("").reduce(function(ultimo, atual, indice){
		if(indice % 3 === 0) return ultimo + "." + atual;
		
		return ultimo + atual;
	});
}

module.exports.formatarChaveDeAcesso = formatarChaveDeAcesso; 
function formatarChaveDeAcesso(chave){
	if(!/^[0-9]{44}$/.test(chave)) return chave;
	
	return chave.split("").reduceRight(function(elemento, anterior){
		var temp = anterior + elemento;
	    if(temp.replace(/\s/g, "").length % 4 === 0) 
	    	return " " + temp;

	    return temp;
	}).substr(1);
}

module.exports.gerarChaveDeAcesso = gerarChaveDeAcesso;
function gerarChaveDeAcesso(info){
	var chaveDeAcesso =
		dados.obterEstado(info.uf).codigo.toString() + 
		obterDataAAMM(info.dataDeEmissao) +
		info.cnpj +
		sUtils.pad(info.modelo, 2, "0") +
		sUtils.pad(info.serie.toString(), 3, "0") + 
		sUtils.pad(info.numero.toString(), 9, "0") + 
		info.tipoDeEmissao + 
		sUtils.pad(info.numeroAleatorio.toString(), 8, "0");
	
	chaveDeAcesso = chaveDeAcesso + calcularDigitoVerificador(chaveDeAcesso);
	
	return validarChaveDeAcesso(chaveDeAcesso) ? chaveDeAcesso : null;
	
	function obterDataAAMM(data){
		return data.getYear().toString().substr(1, 2) + ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"][data.getMonth()];
	}
};

module.exports.calcularDigitoVerificador = calcularDigitoVerificador;
function calcularDigitoVerificador(chaveDeAcesso){
	if(!/^[0-9]{43}$/.test(chaveDeAcesso)) return false;
	
	var resto = mUtils.mod(chaveDeAcesso, [2, 3, 4, 5, 6, 7, 8, 9]) % 11;
	var digito = resto < 2 ? 0 : 11 - resto;
	
	return digito;
};	

module.exports.validarChaveDeAcesso = validarChaveDeAcesso;
function validarChaveDeAcesso(chaveDeAcesso){
	if(typeof chaveDeAcesso !== "string") return false;
	
	chaveDeAcesso = chaveDeAcesso.replace(/\W/g, "");
	
	if(chaveDeAcesso.length !== 44) return false;
	if(!validacoes.eCnpj(chaveDeAcesso.substr(6, 14))) return false;
	
	var base = chaveDeAcesso.substring(0, 43);
	var multiplicadores = [2, 3, 4, 5, 6, 7, 8, 9];
	
	var resto = mUtils.mod(base, multiplicadores) % 11;
	var digito = resto < 2 ? 0 : 11 - resto;
	
	return chaveDeAcesso === base + digito;
}