var path = require('path');

module.exports.regioes = path.join(__dirname, './dados/regioes.json');
module.exports.municipiosDicionario = path.join(__dirname, './dados/municipios-dicionario.json');
module.exports.municipiosArray = path.join(__dirname, './dados/municipios-array.json');
module.exports.cfopsDicionario = path.join(__dirname, './dados/cfops-dicionario.json');
module.exports.cfopsArray = path.join(__dirname, './dados/cfops-array.json');

var naturezasJuridicas = [
    //fonte: http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/tabelas/natjurqualificaresponsavel.htm
    { tipo: 'Administração Pública', codigo: '101-5', naturezaJuridica: 'Órgão Público do Poder Executivo Federal', representanteDaEntidade: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '102-3', naturezaJuridica: 'Órgão Público do Poder Executivo Estadual ou do Distrito Federal', representanteDaEntidade: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '103-1', naturezaJuridica: 'Órgão Público do Poder Executivo Municipal', representanteDaEntidade: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '104-0', naturezaJuridica: 'Órgão Público do Poder Legislativo Federal', representanteDaEntidade: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '105-8', naturezaJuridica: 'Órgão Público do Poder Legislativo Estadual ou do Distrito Federal', representanteDaEntidade: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '106-6', naturezaJuridica: 'Órgão Público do Poder Legislativo Municipal', representanteDaEntidade: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '107-4', naturezaJuridica: 'Órgão Público do Poder Judiciário Federal', representanteDaEntidade: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '108-2', naturezaJuridica: 'Órgão Público do Poder Judiciário Estadual', representanteDaEntidade: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '110-4', naturezaJuridica: 'Autarquia Federal', representanteDaEntidade: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Administração Pública', codigo: '111-2', naturezaJuridica: 'Autarquia Estadual ou do Distrito Federal', representanteDaEntidade: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Administração Pública', codigo: '112-0', naturezaJuridica: 'Autarquia Municipal', representanteDaEntidade: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Administração Pública', codigo: '113-9', naturezaJuridica: 'Fundação Federal', representanteDaEntidade: ['Presidente'], qualificacao: ['16'] },
    { tipo: 'Administração Pública', codigo: '114-7', naturezaJuridica: 'Fundação Estadual ou do Distrito Federal', representanteDaEntidade: ['Presidente'], qualificacao: ['16'] },
    { tipo: 'Administração Pública', codigo: '115-5', naturezaJuridica: 'Fundação Municipal', representanteDaEntidade: ['Presidente'], qualificacao: ['16'] },
    { tipo: 'Administração Pública', codigo: '116-3', naturezaJuridica: 'Órgão Público Autônomo Federal', representanteDaEntidade: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '117-1', naturezaJuridica: 'Órgão Público Autônomo Estadual ou do Distrito Federal', representanteDaEntidade: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '118-0', naturezaJuridica: 'Órgão Público Autônomo Municipal', representanteDaEntidade: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '119-8', naturezaJuridica: 'Comissão Polinacional', representanteDaEntidade: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '120-1', naturezaJuridica: 'Fundo Público', representanteDaEntidade: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '121-0', naturezaJuridica: 'Associação Pública', representanteDaEntidade: ['Presidente'], qualificacao: ['16'] },
    { tipo: 'Entidades Empresariais', codigo: '201-1', naturezaJuridica: 'Empresa Pública', representanteDaEntidade: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '203-8', naturezaJuridica: 'Sociedade de Economia Mista', representanteDaEntidade: ['Diretor', 'Presidente'], qualificacao: ['10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '204-6', naturezaJuridica: 'Sociedade Anônima Aberta', representanteDaEntidade: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '205-4', naturezaJuridica: 'Sociedade Anônima Fechada', representanteDaEntidade: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '206-2', naturezaJuridica: 'Sociedade Empresária Limitada', representanteDaEntidade: ['Administrador', 'Sócio-Administrador'], qualificacao: ['05', '49'] },
    { tipo: 'Entidades Empresariais', codigo: '207-0', naturezaJuridica: 'Sociedade Empresária em Nome Coletivo', representanteDaEntidade: ['Sócio-Administrador'], qualificacao: ['49'] },
    { tipo: 'Entidades Empresariais', codigo: '208-9', naturezaJuridica: 'Sociedade Empresária em Comandita Simples', representanteDaEntidade: ['Sócio Comanditado'], qualificacao: ['24'] },
    { tipo: 'Entidades Empresariais', codigo: '209-7', naturezaJuridica: 'Sociedade Empresária em Comandita por Ações', representanteDaEntidade: ['Diretor', 'Presidente'], qualificacao: ['10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '212-7', naturezaJuridica: 'Sociedade em Conta de Participação', representanteDaEntidade: ['Procurador', 'Sócio Ostensivo'], qualificacao: ['17', '31'] },
    { tipo: 'Entidades Empresariais', codigo: '213-5', naturezaJuridica: 'Empresário (Individual)', representanteDaEntidade: ['Empresário'], qualificacao: ['50'] },
    { tipo: 'Entidades Empresariais', codigo: '214-3', naturezaJuridica: 'Cooperativa', representanteDaEntidade: ['Diretor', 'Presidente'], qualificacao: ['10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '215-1', naturezaJuridica: 'Consórcio de Sociedades', representanteDaEntidade: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Empresariais', codigo: '216-0', naturezaJuridica: 'Grupo de Sociedades', representanteDaEntidade: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Empresariais', codigo: '217-8', naturezaJuridica: 'Estabelecimento, no Brasil, de Sociedade Estrangeira', representanteDaEntidade: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Empresariais', codigo: '219-4', naturezaJuridica: 'Estabelecimento, no Brasil, de Empresa Binacional Argentino-Brasileira', representanteDaEntidade: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Empresariais', codigo: '221-6', naturezaJuridica: 'Empresa Domiciliada no Exterior', representanteDaEntidade: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Empresariais', codigo: '222-4', naturezaJuridica: 'Clube/Fundo de Investimento', representanteDaEntidade: ['Responsável'], qualificacao: ['43'] },
    { tipo: 'Entidades Empresariais', codigo: '223-2', naturezaJuridica: 'Sociedade Simples Pura', representanteDaEntidade: ['Administrador', 'Sócio-Administrador'], qualificacao: ['05', '49'] },
    { tipo: 'Entidades Empresariais', codigo: '224-0', naturezaJuridica: 'Sociedade Simples Limitada', representanteDaEntidade: ['Administrador', 'Sócio-Administrador'], qualificacao: ['05', '49'] },
    { tipo: 'Entidades Empresariais', codigo: '225-9', naturezaJuridica: 'Sociedade Simples em Nome Coletivo', representanteDaEntidade: ['Sócio-Administrador'], qualificacao: ['49'] },
    { tipo: 'Entidades Empresariais', codigo: '226-7', naturezaJuridica: 'Sociedade Simples em Comandita Simples', representanteDaEntidade: ['Sócio Comanditado'], qualificacao: ['24'] },
    { tipo: 'Entidades Empresariais', codigo: '227-5', naturezaJuridica: 'Empresa Binacional', representanteDaEntidade: ['Diretor'], qualificacao: ['10'] },
    { tipo: 'Entidades Empresariais', codigo: '228-3', naturezaJuridica: 'Consórcio de Empregadores', representanteDaEntidade: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Empresariais', codigo: '229-1', naturezaJuridica: 'Consórcio Simples', representanteDaEntidade: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Empresariais', codigo: '230-5', naturezaJuridica: 'Empresa Individual de Responsabilidade Limitada (de Natureza Empresária)', representanteDaEntidade: ['Administrador', 'Procurador', 'Titular Pessoa Física Residente ou Domiciliado no Brasil'], qualificacao: ['05', '17', '65'] },
    { tipo: 'Entidades Empresariais', codigo: '231-3', naturezaJuridica: 'Empresa Individual de Responsabilidade Limitada (de Natureza Simples)', representanteDaEntidade: ['Administrador', 'Procurador', 'Titular Pessoa Física Residente ou Domiciliado no Brasil'], qualificacao: ['05', '17', '65'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '303-4', naturezaJuridica: 'Serviço Notarial e Registral (Cartório)', representanteDaEntidade: ['Tabelião ou Oficial de Registro'], qualificacao: ['32', '42'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '306-9', naturezaJuridica: 'Fundação Privada', representanteDaEntidade: ['Administrador', 'Diretor', 'Presidente', 'Fundador'], qualificacao: ['05', '10', '16', '54'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '307-7', naturezaJuridica: 'Serviço Social Autônomo', representanteDaEntidade: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '308-5', naturezaJuridica: 'Condomínio Edilício', representanteDaEntidade: ['Administrador ou Síndico (Condomínio)'], qualificacao: ['05', '19'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '310-7', naturezaJuridica: 'Comissão de Conciliação Prévia', representanteDaEntidade: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '311-5', naturezaJuridica: 'Entidade de Mediação e Arbitragem', representanteDaEntidade: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '312-3', naturezaJuridica: 'Partido Político', representanteDaEntidade: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '313-1', naturezaJuridica: 'Entidade Sindical', representanteDaEntidade: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '320-4', naturezaJuridica: 'Estabelecimento, no Brasil, de Fundação ou Associação Estrangeiras', representanteDaEntidade: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '321-2', naturezaJuridica: 'Fundação ou Associação domiciliada no exterior', representanteDaEntidade: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '322-0', naturezaJuridica: 'Organização Religiosa', representanteDaEntidade: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '323-9', naturezaJuridica: 'Comunidade Indígena', representanteDaEntidade: ['Responsável Indígena'], qualificacao: ['61'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '324-7', naturezaJuridica: 'Fundo Privado', representanteDaEntidade: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '399-9', naturezaJuridica: 'Associação Privada', representanteDaEntidade: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Pessoas Físicas', codigo: '401-4', naturezaJuridica: 'Empresa Individual Imobiliária', representanteDaEntidade: ['Titular'], qualificacao: ['34'] },
    { tipo: 'Pessoas Físicas', codigo: '408-1', naturezaJuridica: 'Contribuinte Individual', representanteDaEntidade: ['Produtor Rural'], qualificacao: ['59'] },
    { tipo: 'Pessoas Físicas', codigo: '409-0', naturezaJuridica: 'Candidato a Cargo Político Eletivo', representanteDaEntidade: ['Candidato a Cargo Político Eletivo'], qualificacao: ['51'] },
    { tipo: 'Instituições Extraterritoriais', codigo: '501-0', naturezaJuridica: 'Organização Internacional', representanteDaEntidade: ['Representante de Organização Internacional'], qualificacao: ['41'] },
    { tipo: 'Instituições Extraterritoriais', codigo: '502-9', naturezaJuridica: 'Representação Diplomática Estrangeira', representanteDaEntidade: ['Diplomata', 'Cônsul', 'Ministro de Estado das Relações Exteriores', 'Cônsul Honorário'], qualificacao: ['39', '40', '46', '60'] },
    { tipo: 'Instituições Extraterritoriais', codigo: '503-7', naturezaJuridica: 'Outras Instituições Extraterritoriais', representanteDaEntidade: ['Representante da Instituição Extraterritorial'], qualificacao: ['62'] }
];

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

module.exports.naturezasJuridicas = naturezasJuridicas;
module.exports.siglasDosEstados = siglasDosEstados;
module.exports.tabelaIbgeDeEstados = tabelaIbgeDeEstados;