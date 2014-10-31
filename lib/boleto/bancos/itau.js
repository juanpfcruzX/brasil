var gammautils = require('gammautils'),
	pad = gammautils.string.pad;

var Itau = (function() {
	var NUMERO_ITAU = '341',
		DIGITO_ITAU = '7';

	function Itau() {

	}

	Itau.prototype.geraCodigoDeBarrasPara = function(boleto) {
		var beneficiario = boleto.getBeneficiario(),
			campoLivre = [];

	}

	Itau.prototype.getNumeroFormatadoComDigito = function() {
		return [NUMERO_ITAU, DIGITO_ITAU].join('-');
	}

	Itau.prototype.getCarteiraFormatado = function(beneficiario) {
		return pad(beneficiario.getCarteira(), 3, '0');
	}

	Itau.prototype.getCodigoBeneficiarioFormatado = function() {

	}

	Itau.prototype.getImagem = function() {

	}

	Itau.prototype.getNossoNumeroFormatado = function() {

	}

	Itau.prototype.getNossoNumeroECodigoDocumento = function() {

	}

	Itau.prototype.getNumeroFormatado = function() {

	}

	Itau.prototype.getAgenciaECodigoBeneficiario = function() {

	}

	Itau.novoItau = function() {
		return new Itau();
	}

	return Itau;
})();

module.exports = Itau;
