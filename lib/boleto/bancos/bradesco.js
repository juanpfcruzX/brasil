var path = require('path'),
    gammautils = require('gammautils'),
    pad = gammautils.string.pad,
    insert = gammautils.string.insert,

    geradorDeDigitoPadrao = require('../geradorDeDigitoPadrao'),
    CodigoDeBarrasBuilder = require('../codigoDeBarrasBuilder');

var Bradesco = (function() {
    var NUMERO_CAIXA = '237',
        DIGITO_CAIXA = '2';

    function Bradesco() {

    }

    Bradesco.prototype.getTitulos = function() {
        return {
            instrucoes: 'Informações de responsabilidade do beneficiário',
            nomeDoPagador: 'Nome do Pagador',
            especie: 'Moeda',
            quantidade: 'Quantidade',
            valor: 'Valor'
        };
    };

    Bradesco.prototype.exibirReciboDoPagadorCompleto = function() {
        return true;
    };

    Bradesco.prototype.getGeradorDeDigito = function() {
        return geradorDeDigitoPadrao;
    }

    Bradesco.prototype.geraCodigoDeBarrasPara = function(boleto) {
        var beneficiario = boleto.getBeneficiario(),
            carteira = beneficiario.getCarteira(),
            contaCorrente = pad(beneficiario.getContaCorrente(), 6, '0'),
            digitoContaCorrente = pad(beneficiario.getDigitoContaCorrente(), 1, '0'),
            nossoNumeroFormatado = this.getNossoNumeroFormatado(beneficiario),
            campoLivre = [];

        if(carteira == '14' || carteira == '24') {
            // Carteira 24 é sem registro e carteira 14 é com registro
            // O número 1 significa com registro e o número 2 sem registro

            campoLivre.push(contaCorrente);
            campoLivre.push(beneficiario.getDigitoContaCorrente());
            campoLivre.push(nossoNumeroFormatado.substring(2, 5));
            campoLivre.push(nossoNumeroFormatado.substring(0, 1));
            campoLivre.push(nossoNumeroFormatado.substring(5, 8));
            campoLivre.push(nossoNumeroFormatado.substring(1, 2));
            campoLivre.push(nossoNumeroFormatado.substring(8));

            var digito = this.getGeradorDeDigito().mod11(campoLivre.join(''), {
                de: [0, 10, 11],
                para: 0
            });

            campoLivre.push(digito);
        } else {
            throw new Error('Carteira "', carteira, '" não implementada para o banco Bradesco');
        }

        return new CodigoDeBarrasBuilder(boleto).comCampoLivre(campoLivre);
    }

    Bradesco.prototype.getNumeroFormatadoComDigito = function() {
        return [ NUMERO_CAIXA, DIGITO_CAIXA ].join('-');
    }

    Bradesco.prototype.getCarteiraFormatado = function(beneficiario) {
        return pad(beneficiario.getCarteira(), 2, '0');
    }

    Bradesco.prototype.getCarteiraTexto = function(beneficiario) {
        return {
            1: 'RG',
            14: 'RG',
            2: 'SR',
            24: 'SR'
        }[beneficiario.getCarteira()];
    }

    Bradesco.prototype.getCodigoFormatado = function(beneficiario) {
        return pad(beneficiario.getCodigo(), 5, '0');
    }

    Bradesco.prototype.getImagem = function() {
        return path.join(__dirname, 'logotipos/bradesco.png');
    }

    Bradesco.prototype.getNossoNumeroFormatado = function(beneficiario) {
        return [
            pad(beneficiario.getCarteira(), 2, '0'),
            pad(beneficiario.getNossoNumero(), 15, '0')
        ].join('');
    }

    Bradesco.prototype.getNossoNumeroECodigoDocumento = function(boleto) {
        var beneficiario = boleto.getBeneficiario();

        return [
            this.getNossoNumeroFormatado(beneficiario),
            beneficiario.getDigitoNossoNumero()
        ].join('-');
    }

    Bradesco.prototype.getNumeroFormatado = function() {
        return NUMERO_CAIXA;
    }

    Bradesco.prototype.getNome = function() {
        return 'Bradesco';
    }

    Bradesco.prototype.getImprimirNome = function() {
        return false;
    }

    Bradesco.prototype.getAgenciaECodigoBeneficiario = function(boleto) {
        var beneficiario = boleto.getBeneficiario(),

            codigo = this.getCodigoFormatado(beneficiario),
            digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();

        if(digitoCodigo) {
            codigo += '-' + digitoCodigo;
        }

        return beneficiario.getAgenciaFormatada() + '/' + codigo;
    }

    Bradesco.novoBradesco = function() {
        return new Bradesco();
    }

    return Bradesco;
})();

module.exports = Bradesco;
