//browserify brasil.js -s brasil | uglifyjs > ./dist/brasil.browser.js

module.exports = {
    nfe: require('./lib/nfeUtils'),
    validacoes: require('./lib/validacoesUtils'),
    dados: require('./lib/dadosUtils'),
    formatacoes: require('./lib/formatacoesUtils'),
    consultas: require('./lib/consultasUtils'),
    bancos: require('./lib/bancosUtils'),
    boleto: require('./lib/boletoUtils')
};