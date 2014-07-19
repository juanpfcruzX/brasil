var request = require('request'),
	iconv = require('iconv-lite'),
    removerMascara = require('../../formatacoesUtils').removerMascara;

function executarParseDoHtml(html) {

    function obterRegExp(atributo) {
        atributo = atributo.replace(/\(/g, '\\(').replace(/\)/g, '\\)');

        return new RegExp('<span class="label_title">' + atributo + '</span>[\\s]*[<br>]*[\\s]*<span class="label_text">[\\s]*(.*)[\\s]*[<br>]*[\\s]*</span>', 'ig');
    }

    function extrair(atributo) {
        if(typeof atributo === 'string') {
            atributo = obterRegExp(atributo);
        } 

        var matches = atributo.exec(html),
            match = matches && matches.length ? matches.length > 1 ? matches[1] : matches[0] : '';

        return match.replace(/&nbsp;/g, ' ').trim();
    }

    var atividadeEconomica = extrair('Atividade Econ.mica:').split(' - ');

    //equalizar interface com o SEFAZ/DF
    //a ideia é que todas as consultas ao sefaz retornem a mesma interface
	return {
		nomeEmpresarial: extrair('Nome Empresarial:'),
		cnpj: removerMascara(extrair('CNPJ:')),
		inscricaoEstadual: removerMascara(extrair('Inscri..o Estadual - CCE :')),
		telefone: removerMascara(extrair('Telefone:')),
		atividadeEconomica: {
			codigo: atividadeEconomica.length > 0 ? atividadeEconomica[0] : '',
			descricao: atividadeEconomica.length > 1 ? atividadeEconomica[1] : ''
		},
		regimeDeApuracao: extrair('Regime de apura..o:'),
		dataDeCadastramento: extrair('Data de Cadastramento:'),
		situacaoCadastral: {
			data: extrair('SITUA..O CADASTRAL VIGENTE:'),
			descricao: extrair('DATA DESTA SITUA..O CADASTRAL:')
		},
		endereco: {
			logradouro: extrair('Logradouro:'),
			numero: extrair('N.mero:'),
			quadra: extrair('Quadra:'),
			lote: extrair('Lote:'),
			complemento: extrair('Complemento:'),
			bairro: extrair('Bairro:'),
			municipio: extrair('Munic.pio:'),
			uf: extrair('Uf:'),
			cep: removerMascara(extrair('Cep:')),
		},
		consulta: {
			dataEHora: extrair('Data da Consulta:')
		}
	};
}

function obterDados(registroNacional, callback) {
	
    request({
        method: 'POST',
        url: 'http://www.sefaz.go.gov.br/ccs/consultar.asp',
        encoding: null,
        form: {
            rTipoDoc: 2,
			tDoc: registroNacional,
			tCCE: '',
			tCNPJ: registroNacional,
			tCPF: '',
			btCGC: 'Consultar',
			'zion.SystemAction': 'consultarSintegra()',
			'zion.OnSubmited': '',
			'zion.FormElementPosted': 'zionFormID_0',
			'zion.PostMethod': '',
			'zion.RichValidator': true,
			'zion.PostTarget': '_self'
        }
    }, function(err, res, body) {
        if(err) {
            return callback(err);
        }

        body = iconv.decode(body, 'iso-8859-1');

        try {
            callback(null, executarParseDoHtml(body));
        } catch(err) {
            callback(err);
        }
    });
}

module.exports = {
	dados: obterDados
};