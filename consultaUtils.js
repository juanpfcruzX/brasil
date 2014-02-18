var http = require('http');

function obterCaptcha(callback) {
    var hostReceitaFederal = 'www.receita.fazenda.gov.br',
        captchaUrlRegExp = /<img border='.*' id='imgcaptcha' alt='.*' src='(.*)'>/,
        viewStateRegExp = /<input type=hidden id=viewstate name=viewstate value='(.*)'>/,
        sessionIdCookieRegExp = /^(ASPSESSIONID.*=.*;).*$/;
    
    function obterUrlDoCaptcha() {
        http.get({
            host: hostReceitaFederal,
            path: '/PessoaJuridica/CNPJ/cnpjreva/cnpjreva_solicitacao2.asp'
        }, function(res) { 
            if(res.statusCode !== 200) {
                return callback(new Error('O request o código ' + res.statusCode + ', que não era esperado'));
            }
            
            var sessionId = res.headers['set-cookie'],
                body;
            
            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function() {
                var sessionIdMatches = res.headers['set-cookie'][0].match(sessionIdCookieRegExp),
                    viewStateMatches = body.match(viewStateRegExp),
                    captchaUrlMatches = body.match(captchaUrlRegExp);
                
                if(sessionIdMatches && viewStateMatches && captchaUrlMatches) {
                    obterBytesDoCaptcha(sessionIdMatches[1], viewStateMatches[1], captchaUrlMatches[1])
                } else {
                    return callback(new Error('Impossível encontrar o valor do sessionId, do viewState ou do captchaUrl'));
                }
                
            });
        });
    }
    
    function obterBytesDoCaptcha(sessionId, viewState, captchaUrl) {
        http.get({
            host: hostReceitaFederal,
            path: captchaUrl.replace(/amp;/g, ''),
            headers: {
                cookie: sessionId
            }
        }, function(res) {
            if(res.statusCode !== 200) {
                return callback(new Error('O request o código ' + res.statusCode + ', que não era esperado'));
            }
            
            var captchaEmBase64 = '';
            
            res.setEncoding('base64');
            
            res.on('data', function(chunk) {
                captchaEmBase64 += chunk;
            });
            
            res.on('end', function() {
                return callback(null, {
                    captchaEmBase64: captchaEmBase64,
                    contentType: res.headers['content-type'],
                    sessionId: sessionId,
                    viewState: viewState
                });
            });
        });
    }
    
    obterUrlDoCaptcha();
}

module.exports.cnpj = {
    obterCaptcha: obterCaptcha
};