module.exports.regioes = require("./regioes.json"); 
module.exports.municipiosDicionario = require("./municipios-dicionario.json");
module.exports.municipiosArray = require("./municipios-array.json");

module.exports.obterEstado = function(id){
	if(typeof id === "number" || !isNaN(parseInt(id, 10))){
		id = parseInt(id, 10);
		for(var estado in tabelaIbgeDeEstados){
			if(tabelaIbgeDeEstados.hasOwnProperty(estado)){
				estado = tabelaIbgeDeEstados[estado];
				if(estado.codigo === id)
					return estado;
			};
		}
	}
	else if(typeof id === "string"){
		for(var estado in tabelaIbgeDeEstados){
			if(tabelaIbgeDeEstados.hasOwnProperty(estado)){
				estado = tabelaIbgeDeEstados[estado];
				if(estado.nome.toLowerCase() === id.toLowerCase() || estado.abreviacao.toLowerCase() === id.toLowerCase())
					return estado;
			};
		}
	}
	
	return null;
};

module.exports.tabelaIbgeDeEstados = tabelaIbgeDeEstados;
var tabelaIbgeDeEstados = [
	{ codigo: 11, regiao: "Região Norte", nome: "Rondônia", abreviacao: "RO" },
	{ codigo: 12, regiao: "Região Norte", nome: "Acre", abreviacao: "AC" },
	{ codigo: 13, regiao: "Região Norte", nome: "Amazonas", abreviacao: "AM" },
	{ codigo: 14, regiao: "Região Norte", nome: "Roraima", abreviacao: "RR" },
	{ codigo: 15, regiao: "Região Norte", nome: "Pará", abreviacao: "PA" },
	{ codigo: 16, regiao: "Região Norte", nome: "Amapá", abreviacao: "AP" },
	{ codigo: 17, regiao: "Região Norte", nome: "Tocantins", abreviacao: "TO" },
	{ codigo: 21, regiao: "Região Nordeste", nome: "Maranhão", abreviacao: "MA" },
	{ codigo: 22, regiao: "Região Nordeste", nome: "Piauí", abreviacao: "PI" },
	{ codigo: 23, regiao: "Região Nordeste", nome: "Ceará", abreviacao: "CE" },
	{ codigo: 24, regiao: "Região Nordeste", nome: "Rio Grande do Norte", abreviacao: "RN" },
	{ codigo: 25, regiao: "Região Nordeste", nome: "Paraíba", abreviacao: "PB" },
	{ codigo: 26, regiao: "Região Nordeste", nome: "Pernambuco", abreviacao: "PE" },
	{ codigo: 27, regiao: "Região Nordeste", nome: "Alagoas", abreviacao: "AL" },
	{ codigo: 28, regiao: "Região Nordeste", nome: "Sergipe", abreviacao: "SE" },
	{ codigo: 29, regiao: "Região Nordeste", nome: "Bahia", abreviacao: "BA" },
	{ codigo: 31, regiao: "Região Sudeste", nome: "Minas Gerais", abreviacao: "MG" },
	{ codigo: 32, regiao: "Região Sudeste", nome: "Espírito Santo", abreviacao: "ES" },
	{ codigo: 33, regiao: "Região Sudeste", nome: "Rio de Janeiro", abreviacao: "RJ" },
	{ codigo: 35, regiao: "Região Sudeste", nome: "São Paulo", abreviacao: "SP" },
	{ codigo: 41, regiao: "Região Sul", nome: "Paraná", abreviacao: "PR" },
	{ codigo: 42, regiao: "Região Sul", nome: "Santa Catarina", abreviacao: "SC" },
	{ codigo: 43, regiao: "Região Sul", nome: "Rio Grande do Sul", abreviacao: "RS" },
	{ codigo: 50, regiao: "Região Centro-Oeste", nome: "Mato Grosso do Sul", abreviacao: "MS" },
	{ codigo: 51, regiao: "Região Centro-Oeste", nome: "Mato Grosso", abreviacao: "MT" },
	{ codigo: 52, regiao: "Região Centro-Oeste", nome: "Goiás", abreviacao: "GO" },
	{ codigo: 53, regiao: "Região Centro-Oeste", nome: "Distrito Federal", abreviacao: "DF" }
];

module.exports.formatarChaveDeAcesso = formatarChaveDeAcesso; 
function formatarChaveDeAcesso(chave){
	if(chave.length !== 44) return chave;
	else{
		return chave.split("").reduceRight(function(elemento, anterior){
			var temp = anterior + elemento;
		    if(temp.replace(/\s/g, "").length % 4 === 0) return " " + temp;
		    else return temp;
		}).substr(1);
	}
}

module.exports.chaveDeAcesso = chaveDeAcesso;
function chaveDeAcesso(chaveDeAcesso){
	if(typeof chaveDeAcesso !== "string") return false;
	
	chaveDeAcesso = removerMascara(chaveDeAcesso);
	
	if(chaveDeAcesso.length !== 44) return false;
	if(!cnpj(chaveDeAcesso.substr(6, 14))) return false;
	
	var base = chaveDeAcesso.substring(0, 43);
	var multiplicadores = [2, 3, 4, 5, 6, 7, 8, 9];
	
	var resto = mod11(base, multiplicadores);
	var digito = resto < 2 ? 0 : 11 - resto;
	
	return chaveDeAcesso === base + digito;
}

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
	return texto.replace(/\./g, "").replace(/\//g, "").replace(/\-/g, "").replace(/\s/g, "");
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




