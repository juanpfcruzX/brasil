//browserify brasil.js -s brasil | uglifyjs > brasil.browser.js

module.exports = {
    nfe: require('./lib/nfeUtils'),
    validacoes: require('./lib/validacoesUtils'),
    dados: require('./lib/dadosUtils'),
    formatacoes: require('./lib/formatacoesUtils'),
    consultas: require('./lib/consultasUtils'),
    bancos: require('./lib/bancosUtils')
};