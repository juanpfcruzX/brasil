//browserify brasil.js -s brasil | uglifyjs > brasil.browser.js

module.exports = {
    nfe: require('./nfeUtils'),
    validacoes: require('./validacoesUtils'),
    dados: require('./dadosUtils'),
    formatacoes: require('./formatacoesUtils'),
    consultas: require('./consultasUtils'),
    bancos: require('./bancosUtils')
};