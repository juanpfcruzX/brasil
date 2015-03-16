var
	validacoes = require("./validacoesUtils"),
	dados = require("./dadosUtils"),
	sUtils = require("gammautils").string,
	mUtils = require("gammautils").math;

function formatarSerie(serie){
	return sUtils.pad(serie, 3, "0");
}
module.exports.formatarSerie = formatarSerie;

function formatarNumero(numero){
	return sUtils.pad(numero, 9, "0").split("").reduce(function(ultimo, atual, indice){
		if(indice % 3 === 0) {
			return ultimo + "." + atual;
		}

		return ultimo + atual;
	});
}
module.exports.formatarNumero = formatarNumero;

function formatarChaveDeAcesso(chave){
	if(!/^[0-9]{44}$/.test(chave)) return chave;

	return chave.split("").reduceRight(function(elemento, anterior){
		var temp = anterior + elemento;
	    if(temp.replace(/\s/g, "").length % 4 === 0) {
	    	return " " + temp;
	    }

	    return temp;
	}).substr(1);
}
module.exports.formatarChaveDeAcesso = formatarChaveDeAcesso;

function obterMensagensDeErroERejeicao() {
    // Manual de integracao do contribuinte 4.01 (NT2009.006) - Página 228

    return [
        { codigo: 108, descricao: 'Serviço Paralisado Momentaneamente (curto prazo)' },
        { codigo: 109, descricao: 'Serviço Paralisado sem Previsão' },
        { codigo: 124, descricao: 'DPEC recebido pelo Sistema de Contingência Eletrônica' },
        { codigo: 125, descricao: 'DPEC localizado' },
        { codigo: 126, descricao: 'Inexiste DPEC para o número de registro de DPEC informado' },
        { codigo: 127, descricao: 'Inexiste DPEC para a chave de acesso da NF-e informada' },
        { codigo: 203, descricao: 'Rejeição: Emissor não habilitado para emissão d NF-e' },
        { codigo: 207, descricao: 'Rejeição: CNPJ do emitente inválido' },
        { codigo: 208, descricao: 'Rejeição: CNPJ do destinatário inválido' },
        { codigo: 209, descricao: 'Rejeição: IE do emitente inválida' },
        { codigo: 213, descricao: 'Rejeição: CNPJ-Base do Emitente difere do CNPJ-Base do Certificado Digital' },
        { codigo: 214, descricao: 'Rejeição: Tamanho da mensagem excedeu o limite estabelecido' },
        { codigo: 215, descricao: 'Rejeição: Falha no schema XML' },
        { codigo: 238, descricao: 'Rejeição: Cabeçalho - Versão do arquivo XML superior a Versão vigente' },
        { codigo: 239, descricao: 'Rejeição: Cabeçalho - Versão do arquivo XML não suportada' },
        { codigo: 243, descricao: 'Rejeição: XML Mal Formado' },
        { codigo: 244, descricao: 'Rejeição: CNPJ do Certificado Digital difere do CNPJ da Matriz e do CNPJ do Emitente' },
        { codigo: 252, descricao: 'Rejeição: Ambiente informado diverge do Ambiente de recebimento' },
        { codigo: 280, descricao: 'Rejeição: Certificado Transmissor inválido' },
        { codigo: 281, descricao: 'Rejeição: Certificado Transmissor Data Validade' },
        { codigo: 282, descricao: 'Rejeição: Certificado Transmissor sem CNPJ' },
        { codigo: 283, descricao: 'Rejeição: Certificado Transmissor - erro Cadeia de Certificação' },
        { codigo: 284, descricao: 'Rejeição: Certificado Transmissor revogado' },
        { codigo: 285, descricao: 'Rejeição: Certificado Transmissor difere ICP-Brasil' },
        { codigo: 286, descricao: 'Rejeição: Certificado Transmissor erro no acesso a LCR' },
        { codigo: 290, descricao: 'Rejeição: Certificado Assinatura inválido' },
        { codigo: 291, descricao: 'Rejeição: Certificado Assinatura Data Validade' },
        { codigo: 292, descricao: 'Rejeição: Certificado Assinatura sem CNPJ' },
    ];
}
// module.exports.obterMensagensDeErroERejeicao = obterMensagensDeErroERejeicao;

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
module.exports.gerarChaveDeAcesso = gerarChaveDeAcesso;

function calcularDigitoVerificador(chaveDeAcesso){
	if(!/^[0-9]{43}$/.test(chaveDeAcesso)) {
		return false;
	}

	var resto = mUtils.mod(chaveDeAcesso, [2, 3, 4, 5, 6, 7, 8, 9]) % 11;
	var digito = resto < 2 ? 0 : 11 - resto;

	return digito;
};
module.exports.calcularDigitoVerificador = calcularDigitoVerificador;

function validarChaveDeAcesso(chaveDeAcesso){
	if(typeof chaveDeAcesso !== "string") {
		return false;
	}

	chaveDeAcesso = chaveDeAcesso.replace(/\W/g, "");

	if(chaveDeAcesso.length !== 44) {
		return false;
	}

	if(!validacoes.eCnpj(chaveDeAcesso.substr(6, 14))) {
		return false;
	}

	var base = chaveDeAcesso.substring(0, 43);
	var multiplicadores = [2, 3, 4, 5, 6, 7, 8, 9];

	var resto = mUtils.mod(base, multiplicadores) % 11;
	var digito = resto < 2 ? 0 : 11 - resto;

	return chaveDeAcesso === base + digito;
}
module.exports.validarChaveDeAcesso = validarChaveDeAcesso;

module.exports.obterProdutosEspecificos = function() {
	return [
		{ codigo: 'veiculo', descricao: 'Veículo' },
		{ codigo: 'medicamento', descricao: 'Medicamento' },
		{ codigo: 'armamento', descricao: 'Armamento' },
		{ codigo: 'combustivel', descricao: 'Combustível' },
	];
}

module.exports.obterOrigens = function() {
	return [
		{ codigo: '0', descricao: 'Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8' },
	    { codigo: '1', descricao: 'Estrangeira - Importação direta' },
	    { codigo: '2', descricao: 'Estrangeira - Adquirida no mercado interno' },
	    { codigo: '3', descricao: 'Nacional, mercadoria ou bem com conteúdo de importação superior a 40%' },
	    { codigo: '4', descricao: 'Nacional, cuja produção tenha sido feita em conformidade com a MP 252 (MP do BEM)' },
	    { codigo: '5', descricao: 'Nacional, mercadoria ou bem com conteúdo de importação inferior ou igual a 40%' },
	    { codigo: '6', descricao: 'Estrangeira - Importação direta, sem similar nacional, constante em lista de resolução CAMEX' },
	    { codigo: '7', descricao: 'Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista de resolução CAMEX' },
	    { codigo: '8', descricao: 'Nacional, mercadoria ou bem com conteúdo de importação superior a 70%' }
	];
}

function retornarCodigos(array) {
	return array.map(function(item) {
		return item.codigo;
	});
}

module.exports.issqn = {
	listaDeServicos: function(tipo) {
		if(tipo === 'array') {
			return require('./dados/servicos-array.json')
		} else if(tipo === 'hash') {
			return require('./dados/servicos-hash.json')
		}
	},

	tiposDeTributacao: [
		{ codigo: 'normal', descricao: 'Normal' },
		{ codigo: 'retida', descricao: 'Retida' },
		{ codigo: 'substituta', descricao: 'Sibstituta' },
		{ codigo: 'isenta', descricao: 'Isenta' }
	]
};

function obterSituacoesTributariasDoIcms(regime) {
	var sts = {
		normal: [
			{ codigo: '00', regime: 'normal', descricao: 'Tributada integralmente' },
	        { codigo: '10', regime: 'normal', descricao: 'Tributada e com cobrança do ICMS por substituição tributária' },
	        { codigo: '20', regime: 'normal', descricao: 'Com redução de base de cálculo' },
	        { codigo: '30', regime: 'normal', descricao: 'Isenta ou não tributada e com cobrança do ICMS por substituição tributária' },
	        { codigo: '40', regime: 'normal', descricao: 'Isenta' },
	        { codigo: '41', regime: 'normal', descricao: 'Não tributada' },
	        { codigo: '50', regime: 'normal', descricao: 'Suspensão' },
	        { codigo: '51', regime: 'normal', descricao: 'Diferimento' },
	        { codigo: '60', regime: 'normal', descricao: 'ICMS cobrado anteriormente por substituição tributária' },
	        { codigo: '70', regime: 'normal', descricao: 'Com redução de base de cálculo e cobrança do ICMS por substituição tributária' },
	        { codigo: '90', regime: 'normal', descricao: 'Outras' }
	    ],

	    simples: [
			{ codigo: '101', regime: 'simples', descricao: 'Tributada pelo Simples Nacional com permissão de crédito' },
			{ codigo: '102', regime: 'simples', descricao: 'Tributada pelo Simples Nacional sem permissão de crédito' },
			{ codigo: '103', regime: 'simples', descricao: 'Isenção do ICMS no Simples Nacional para faixa de receita bruta' },
			{ codigo: '201', regime: 'simples', descricao: 'Tributada pelo Simples Nacional com permissão de crédito e com cobrança do ICMS por substituição tributária' },
			{ codigo: '202', regime: 'simples', descricao: 'Tributada pelo Simples Nacional sem permissão de crédito e com cobrança do ICMS por substituição tributária' },
			{ codigo: '203', regime: 'simples', descricao: 'Isenção do ICMS no Simples Nacional para faixa de receita bruta e com cobrança do ICMS por substituição tributária' },
			{ codigo: '300', regime: 'simples', descricao: 'Imune' },
			{ codigo: '400', regime: 'simples', descricao: 'Não tributada pelo Simples Nacional' },
			{ codigo: '500', regime: 'simples', descricao: 'ICMS cobrado anteriormente por substituição tributária (substituído) ou por antecipação' },
			{ codigo: '900', regime: 'simples', descricao: 'Outros' }
	    ]
	}[regime];

	if(typeof sts === 'undefined') {
		return obterSituacoesTributariasDoIcms('normal').concat(obterSituacoesTributariasDoIcms('simples'));
	}

	return sts;
}

module.exports.reduzirBaseDeCalculo = function(baseDeCalculo, reducao, aliquota) {
	return baseDeCalculo * reducao / aliquota;
}

module.exports.icms = {
	obterSituacoesTributarias: obterSituacoesTributariasDoIcms,
	codigosDasSituacoesTributarias: retornarCodigos(obterSituacoesTributariasDoIcms()),
	obterModalidadeDeDeterminacaoDaBC: [
        { codigo: '0', descricao: 'Margem Valor Agregado' },
        { codigo: '1', descricao: 'Pauta (Valor)' },
        { codigo: '2', descricao: 'Preço Tabelado Máx. (Valor)' },
        { codigo: '3', descricao: 'Valor da Operação' }
	]
}

module.exports.ipi = {
	obterSituacoesTributarias: function() {
	    return [
		    { codigo: '0', descricao: 'Entrada com recuperação de crédito' },
		    { codigo: '1', descricao: 'Entrada tributada com alíquota zero' },
		    { codigo: '2', descricao: 'Entrada isenta' },
		    { codigo: '3', descricao: 'Entrada não-tributada' },
		    { codigo: '4', descricao: 'Entrada imune' },
		    { codigo: '5', descricao: 'Entrada com suspensão' },
		    { codigo: '49', descricao: 'Outras entradas' },
		    { codigo: '50', descricao: 'Saída tributada' },
		    { codigo: '51', descricao: 'Saída tributada com alíquota zero' },
		    { codigo: '52', descricao: 'Saída isenta' },
		    { codigo: '53', descricao: 'Saída não-tributada' },
		    { codigo: '54', descricao: 'Saída imune' },
		    { codigo: '55', descricao: 'Saída com suspensão' },
		    { codigo: '99', descricao: 'Outras saídas' }
		];
	}
};

module.exports.pis = {
	obterSituacoesTributarias: function() {
		return [
			{ codigo: '01', descricao: 'Operação Tributável com Alíquota Básica' },
			{ codigo: '02', descricao: 'Operação Tributável com Alíquota Diferenciada' },
			{ codigo: '03', descricao: 'Operação Tributável com Alíquota por Unidade de Medida de Produto' },
			{ codigo: '04', descricao: 'Operação Tributável Monofásica - Revenda a Alíquota Zero' },
			{ codigo: '05', descricao: 'Operação Tributável por Substituição Tributária' },
			{ codigo: '06', descricao: 'Operação Tributável a Alíquota zero' },
			{ codigo: '07', descricao: 'Operação Isenta da Contribuição' },
			{ codigo: '08', descricao: 'Operação sem Incidência da Contribuição' },
			{ codigo: '09', descricao: 'Operação com Suspensão da Contribuição' },
			{ codigo: '49', descricao: 'Outras Operações de Saída' },
			{ codigo: '50', descricao: 'Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno' },
			{ codigo: '51', descricao: 'Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno' },
			{ codigo: '52', descricao: 'Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação' },
			{ codigo: '53', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno' },
			{ codigo: '54', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '55', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Não Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '56', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '60', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno' },
			{ codigo: '61', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno' },
			{ codigo: '62', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação' },
			{ codigo: '63', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno' },
			{ codigo: '64', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '65', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '66', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '67', descricao: 'Crédito Presumido - Outras Operações' },
			{ codigo: '70', descricao: 'Operação de Aquisição sem Direito a Crédito' },
			{ codigo: '71', descricao: 'Operação de Aquisição com Isenção' },
			{ codigo: '72', descricao: 'Operação de Aquisição com Suspensão' },
			{ codigo: '73', descricao: 'Operação de Aquisição a Alíquota Zero' },
			{ codigo: '74', descricao: 'Operação de Aquisição sem Incidência da Contribuição' },
			{ codigo: '75', descricao: 'Operação de Aquisição por Substituição Tributária' },
			{ codigo: '98', descricao: 'Outras Operações de Entrada' },
			{ codigo: '99', descricao: 'Outras Operações' }
		];
	}
};

module.exports.cofins = {
	obterSituacoesTributarias: function() {
		return [
			{ codigo: '01', descricao: 'Operação Tributável com Alíquota Básica' },
			{ codigo: '02', descricao: 'Operação Tributável com Alíquota Diferenciada' },
			{ codigo: '03', descricao: 'Operação Tributável com Alíquota por Unidade de Medida de Produto' },
			{ codigo: '04', descricao: 'Operação Tributável Monofásica - Revenda a Alíquota Zero' },
			{ codigo: '05', descricao: 'Operação Tributável por Substituição Tributária' },
			{ codigo: '06', descricao: 'Operação Tributável a Alíquota zero' },
			{ codigo: '07', descricao: 'Operação Isenta da Contribuição' },
			{ codigo: '08', descricao: 'Operação sem Incidência da Contribuição' },
			{ codigo: '09', descricao: 'Operação com Suspensão da Contribuição' },
			{ codigo: '49', descricao: 'Outras Operações de Saída' },
			{ codigo: '50', descricao: 'Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno' },
			{ codigo: '51', descricao: 'Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno' },
			{ codigo: '52', descricao: 'Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação' },
			{ codigo: '53', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno' },
			{ codigo: '54', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '55', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Não Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '56', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '60', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno' },
			{ codigo: '61', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno' },
			{ codigo: '62', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação' },
			{ codigo: '63', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno' },
			{ codigo: '64', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '65', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '66', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '67', descricao: 'Crédito Presumido - Outras Operações' },
			{ codigo: '70', descricao: 'Operação de Aquisição sem Direito a Crédito' },
			{ codigo: '71', descricao: 'Operação de Aquisição com Isenção' },
			{ codigo: '72', descricao: 'Operação de Aquisição com Suspensão' },
			{ codigo: '73', descricao: 'Operação de Aquisição a Alíquota Zero' },
			{ codigo: '74', descricao: 'Operação de Aquisição sem Incidência da Contribuição' },
			{ codigo: '75', descricao: 'Operação de Aquisição por Substituição Tributária' },
			{ codigo: '98', descricao: 'Outras Operações de Entrada' },
			{ codigo: '99', descricao: 'Outras Operações' }
		];
	}
}