var request = require('request'),
	iconv = require('iconv-lite'),
    removerMascara = require('../../formatacoesUtils').removerMascara;

function executarParseDoHtml(html) {
	return html;
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