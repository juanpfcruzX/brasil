var path = require('path');

module.exports.regioes = path.join(__dirname, './dados/regioes.json');
module.exports.municipiosDicionario = path.join(__dirname, './dados/municipios-dicionario.json');
module.exports.municipiosArray = path.join(__dirname, './dados/municipios-array.json');
module.exports.cfopsDicionario = path.join(__dirname, './dados/cfops-dicionario.json');
module.exports.cfopsArray = path.join(__dirname, './dados/cfops-array.json');

var siglasDosEstados = [
    'RO', 'AC', 'AM',
    'RR', 'PA', 'AP',
    'TO', 'MA', 'PI', 
    'CE', 'RN', 'PB',
    'PE', 'AL', 'SE',
    'BA', 'MG', 'ES',
    'RJ', 'SP', 'PR',
    'SC', 'RS', 'MS',
    'MT', 'GO', 'DF'
];

var tabelaIbgeDeEstados = [
    { codigo: 11, regiao: 'Norte', nome: 'Rondônia', abreviacao: 'RO' },
    { codigo: 12, regiao: 'Norte', nome: 'Acre', abreviacao: 'AC' },
    { codigo: 13, regiao: 'Norte', nome: 'Amazonas', abreviacao: 'AM' },
    { codigo: 14, regiao: 'Norte', nome: 'Roraima', abreviacao: 'RR' },
    { codigo: 15, regiao: 'Norte', nome: 'Pará', abreviacao: 'PA' },
    { codigo: 16, regiao: 'Norte', nome: 'Amapá', abreviacao: 'AP' },
    { codigo: 17, regiao: 'Norte', nome: 'Tocantins', abreviacao: 'TO' },
    { codigo: 21, regiao: 'Nordeste', nome: 'Maranhão', abreviacao: 'MA' },
    { codigo: 22, regiao: 'Nordeste', nome: 'Piauí', abreviacao: 'PI' },
    { codigo: 23, regiao: 'Nordeste', nome: 'Ceará', abreviacao: 'CE' },
    { codigo: 24, regiao: 'Nordeste', nome: 'Rio Grande do Norte', abreviacao: 'RN' },
    { codigo: 25, regiao: 'Nordeste', nome: 'Paraíba', abreviacao: 'PB' },
    { codigo: 26, regiao: 'Nordeste', nome: 'Pernambuco', abreviacao: 'PE' },
    { codigo: 27, regiao: 'Nordeste', nome: 'Alagoas', abreviacao: 'AL' },
    { codigo: 28, regiao: 'Nordeste', nome: 'Sergipe', abreviacao: 'SE' },
    { codigo: 29, regiao: 'Nordeste', nome: 'Bahia', abreviacao: 'BA' },
    { codigo: 31, regiao: 'Sudeste', nome: 'Minas Gerais', abreviacao: 'MG' },
    { codigo: 32, regiao: 'Sudeste', nome: 'Espírito Santo', abreviacao: 'ES' },
    { codigo: 33, regiao: 'Sudeste', nome: 'Rio de Janeiro', abreviacao: 'RJ' },
    { codigo: 35, regiao: 'Sudeste', nome: 'São Paulo', abreviacao: 'SP' },
    { codigo: 41, regiao: 'Sul', nome: 'Paraná', abreviacao: 'PR' },
    { codigo: 42, regiao: 'Sul', nome: 'Santa Catarina', abreviacao: 'SC' },
    { codigo: 43, regiao: 'Sul', nome: 'Rio Grande do Sul', abreviacao: 'RS' },
    { codigo: 50, regiao: 'Centro-Oeste', nome: 'Mato Grosso do Sul', abreviacao: 'MS' },
    { codigo: 51, regiao: 'Centro-Oeste', nome: 'Mato Grosso', abreviacao: 'MT' },
    { codigo: 52, regiao: 'Centro-Oeste', nome: 'Goiás', abreviacao: 'GO' },
    { codigo: 53, regiao: 'Centro-Oeste', nome: 'Distrito Federal', abreviacao: 'DF' }
];

module.exports.obterEstadosPorRegiao = function(regiao){
	var estados = [];
	tabelaIbgeDeEstados.forEach(function(estado){
		if(estado.regiao.toLowerCase() === regiao.toLowerCase()) 
			estados.push(estado);
	});
	
	return estados;
};

module.exports.obterEstado = obterEstado;
function obterEstado(id){
	if(typeof id === 'number' || !isNaN(parseInt(id, 10))){
		id = parseInt(id, 10);
		for(var estado in tabelaIbgeDeEstados){
			if(tabelaIbgeDeEstados.hasOwnProperty(estado)){
				estado = tabelaIbgeDeEstados[estado];
				if(estado.codigo === id)
					return estado;
			};
		}
	}
	else if(typeof id === 'string'){
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

module.exports.siglasDosEstados = siglasDosEstados;
module.exports.tabelaIbgeDeEstados = tabelaIbgeDeEstados;