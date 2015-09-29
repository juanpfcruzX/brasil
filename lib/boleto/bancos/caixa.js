var path = require('path'),
    gammautils = require('gammautils'),
    pad = gammautils.string.pad,
    insert = gammautils.string.insert,

    geradorDeDigitoPadrao = require('../geradorDeDigitoPadrao'),
    CodigoDeBarrasBuilder = require('../codigoDeBarrasBuilder');

var Caixa = (function() {
    var NUMERO_CAIXA = '104',
        DIGITO_CAIXA = '0';

    function Caixa() {

    }

    Caixa.prototype.getGeradorDeDigito = function() {
        return geradorDeDigitoPadrao;
    }

    Caixa.prototype.geraCodigoDeBarrasPara = function(boleto) {
        var beneficiario = boleto.getBeneficiario(),
            carteira = beneficiario.getCarteira(),
            campoLivre = [];

        if(carteira === '1') {
            campoLivre.push(carteira);
            campoLivre.push(pad(beneficiario.getContaCorrente(), 6, '0'));
            campoLivre.push(this.getNossoNumeroFormatado(beneficiario));
        }

        if(carteira === '2' || carteira === '24') {
            var nossoNumeroFormatado = this.getNossoNumeroFormatado(beneficiario),
                digito;

            campoLivre.push(pad(beneficiario.getContaCorrente(), 6, '0'));
            campoLivre.push(beneficiario.getDigitoContaCorrente());

            campoLivre.push(nossoNumeroFormatado.substring(2, 5));
            campoLivre.push(nossoNumeroFormatado.substring(0, 1));
            campoLivre.push(nossoNumeroFormatado.substring(5, 8));
            campoLivre.push(nossoNumeroFormatado.substring(1, 2));
            campoLivre.push(nossoNumeroFormatado.substring(8));

            if(carteira ===  '2') {
                digito = this.getGeradorDeDigito().mod11(campoLivre.join(''));
            }

            if(carteira === '24') {
                digito = this.getGeradorDeDigito().mod11(campoLivre.join(''), {
                    de: [0, 10, 11],
                    para: 0
                });
            }

            campoLivre.push(digito);
        }

        return new CodigoDeBarrasBuilder(boleto).comCampoLivre(campoLivre);
    }

    Caixa.prototype.getNumeroFormatadoComDigito = function() {
        return [NUMERO_CAIXA, DIGITO_CAIXA].join('-');
    }

    Caixa.prototype.getCarteiraFormatado = function(beneficiario) {
        return pad(beneficiario.getCarteira(), 2, '0');
    }

    Caixa.prototype.getCodigoFormatado = function(beneficiario) {
        return pad(beneficiario.getCodigo(), 5, '0');
    }

    Caixa.prototype.getImagem = function() {
        return path.join(__dirname, 'logotipos/caixa-economica-federal.png');
    }

    Caixa.prototype.getNossoNumeroFormatado = function(beneficiario) {
        return pad(beneficiario.getNossoNumero(), 17, '0');
    }

    Caixa.prototype.getNossoNumeroECodigoDocumento = function(boleto) {
        var beneficiario = boleto.getBeneficiario();

        return [
            beneficiario.getCarteira(),
            this.getNossoNumeroFormatado(beneficiario),
        ].join('/') + '-' + beneficiario.getDigitoNossoNumero();
    }

    Caixa.prototype.getNumeroFormatado = function() {
        return NUMERO_CAIXA;
    }

    Caixa.prototype.getNome = function() {
        return 'Caixa Econômica Federal S/A';
    }

    Caixa.prototype.getImprimirNome = function() {
        return false;
    }

    Caixa.prototype.getAgenciaECodigoBeneficiario = function(boleto) {
        var beneficiario = boleto.getBeneficiario(),

            codigo = this.getCodigoFormatado(beneficiario),
            digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();

        if(digitoCodigo) {
            codigo += '-' + digitoCodigo;
        }

        return beneficiario.getAgenciaFormatada() + '/' + codigo;
    }

    Caixa.novoCaixa = function() {
        return new Caixa();
    }

    return Caixa;
})();

module.exports = Caixa;
