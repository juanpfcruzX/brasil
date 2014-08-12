var request = require('request'),
	iconv = require('iconv-lite'),
    removerMascara = require('../../formatacoesUtils').removerMascara;

function executarParseDoHtml(html) {

	if(/Não foi encontrado/.test(html)) {
		return null;
	}

	function quebrarLinha(atributo) {
		var texto = '<td><b>' + atributo + '</b></td>';
		html = html.replace(texto, '\n' + texto);
	}

	quebrarLinha('Número');
	quebrarLinha('Complemento');
	quebrarLinha('Bairro');
	quebrarLinha('Município');
	quebrarLinha('UF');
	quebrarLinha('CEP');
	quebrarLinha('Telefone');
	quebrarLinha('Atividade Secundária');

	function obterAtividade(tipo) {

		function popularAtividade(codigo, descricao) {
			if(typeof codigo !== 'string') {
				codigo = '';
			}

			if(typeof descricao !== 'string') {
				descricao = '';
			}

			return {
				codigo: codigo.trim(),
				descricao: descricao.trim()
			};
		}

		var r = new RegExp('<td><b>Atividade ' + tipo + '</b></td>[\\s]*<td colspan="3">[\\s]*<div align="justify">[\\s]*[^]*?[\\s]*</div></td></tr>', 'ig'),
			matches = r.exec(html);
          
        if(tipo === 'Principal ') {
	        if(matches && matches.length && matches.length >= 1) {
				matches = new RegExp('<td><b>Atividade Principal </b></td>[\\s]*<td colspan="3">[\\s]*<div align="justify"><b>[\\s]*(.*) - </b>[\\s]*(.*)</div>', 'ig').exec(matches[0]);
				if(matches.length > 2) {
					return popularAtividade(matches[1], matches[2]);
				} else {
					return popularAtividade();
				}
	        } else {
		        return popularAtividade();
	        }
        } else {
        	if(matches && matches.length && matches.length >= 1) {
        		var atividade,
        			r = new RegExp('<b>(.*)</b>- (.*)', 'ig'),
					resultado = [];
					string = matches[0].replace(/<br>/g, '\n');

				while(atividade = r.exec(string)) {
					if(atividade.length > 2) {
						resultado.push(popularAtividade(atividade[1], atividade[2].replace('</div></td></tr>', '')));
					}
				}

				return resultado;
        	} else {
        		return [];
        	}
        }
	}

	function obterRegExp(atributo) {
        atributo = atributo.replace(/\(/g, '\\(').replace(/\)/g, '\\)');

        return new RegExp('<td.*><.*>' + atributo + '</.*></td>[\\s]*<td.*>(.*)</td>[\\s]*', 'ig');
    }

    function extrair(atributo) {
        if(typeof atributo === 'string') {
            atributo = obterRegExp(atributo);
        } 

        var matches = atributo.exec(html),
            match = matches && matches.length ? matches.length > 1 ? matches[1] : matches[0] : '';

        return match.replace(/&nbsp;/g, ' ').trim();
    }

    var telefone = removerMascara(extrair('Telefone'));
    if(telefone.length && telefone.length > 0 && telefone[0] === '0') {
    	telefone = telefone.substr(1);
    }

    return {
    	registro: {
    		nacional: removerMascara(extrair('CNPJ/CPF')),
    		estadual: removerMascara(extrair('CF/DF')),
    	},
    	nome: {
    		empresarial: extrair('Razão Social'),
    		fantasia: extrair('Nome Fantasia')
    	},
    	regimeDeApuracao: extrair('Regime de Apura&ccedil;&atilde;o'),
    	situacaoCadastral: {
    		data: extrair('Data desta Situa&ccedil;&atilde;o Cadastral'),
    		descricao: extrair('Situa..o Cadastral') + ' - Situação SINTEGRA: ' + extrair('Situa&ccedil;&atilde;o SINTEGRA ')
    	},
    	atividadesEconomicas: {
    		principal: obterAtividade('Principal '),
    		secundarias: [obterAtividade('Secundária')]
    	},
    	telefone: telefone,
    	endereco: {
    		logradouro: extrair('Logradouro'),
    		numero: extrair('N.mero'),
    		quadra: '',
    		lote: '',
    		complemento: extrair('Complemento'),
    		bairro: extrair('Bairro'),
    		municipio: extrair('Munic.pio'),
    		uf: extrair('UF'),
    		cep: removerMascara(extrair('CEP'))
    	},
    	consulta: {
    		data: new Date()
    	}
    };
};

function obterDados(registroNacional, callback) {
	
	var jar = request.jar();

	request({
		method: 'GET',
		url: 'http://www.fazenda.df.gov.br/area.cfm?id_area=110',
		jar: jar
	}, function(err, res, body) {
		if(err) {
			return callback(err);
		}

	    request({
	        method: 'POST',
	        url: 'http://www.fazenda.df.gov.br//aplicacoes/sintegra/sintegra_acao_cfi.cfm?id_menu=4',
	        jar: jar,
	        encoding: null,
	        form: {
	            sefp: 1,
	            estado: 'DF',
	            CGC: removerMascara(registroNacional)
	        }
	    }, function(err, res, body) {
	        if(err) {
	            return callback(err);
	        }

	        body = iconv.decode(body, 'utf8');

	        try {
	            callback(null, executarParseDoHtml(body));
	        } catch(err) {
	            callback(err);
	        }
	    });
	});
}

obterDados(process.argv[2], function(err, dados) {
	if(err) {
		throw err;
	}

	console.log(JSON.stringify(dados, null, 4));
});

module.exports = {
	dados: obterDados
};