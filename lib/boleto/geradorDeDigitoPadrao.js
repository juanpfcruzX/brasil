var gammautils = require('gammautils'),
	mod = gammautils.math.mod;

module.exports.mod10 = function(campo) {
	var digito = mod({
		value: campo,
		factors: [2, 1],
		divider: 10,
		direction: 'rightToLeft',
		cumplimentaryToDivider: true,
		reduceSummationTerms: true
	});

	return digito === 10 ? 0 : digito;
}

module.exports.mod11 = function(codigoDeBarras) {
	var digito = mod({
		value: codigoDeBarras,
		factors: [2, 9],
		cumplimentaryToDivider: true
	});

	if([0, 1, 10, 11].indexOf(digito) !== -1) {
		digito = 1;
	}

	return digito;
}