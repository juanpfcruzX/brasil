var boleto = require('../../../lib/boletoUtils.js'),
	Itau = require('../../../lib/boleto/bancos/itau.js'),

	Datas = boleto.Datas,
	Beneficiario = boleto.Beneficiario,
	Pagador = boleto.Pagador,
	Boleto = boleto.Boleto,

	boleto,
	beneficiario;

module.exports = {
	setUp: function(done) {

		var datas = Datas.novasDatas()
							.comDocumento(20, 3, 2013)
							.comProcessamento(20, 3, 2013)
							.comVencimento(1, 4, 2013),

			pagador = Pagador.novoPagador()
								.comNome('Paulo Silveira'),

			beneficiario = Beneficiario.novoBeneficiario()
										.comNome('Rodrigo Turini')
										.comAgencia('167')
										.comCarteira('157')
										.comCodigo('45145')
										.comNossoNumero('21897666')
										.comDigitoNossoNumero('6');

			boleto = Boleto.novoBoleto()
								.comDatas(datas)
								.comBeneficiario(beneficiario)
								.comBanco(new Itau())
								.comPagador(pagador)
								.comValorBoleto(2680.16)
								.comNumeroDoDocumento(575)


		done();
	},
}