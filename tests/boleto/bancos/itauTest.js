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
		var datas = Datas.novasDatas();
		datas.comDocumento(20, 3, 2013);
		datas.comProcessamento(20, 3, 2013);
		datas.comVencimento(1, 4, 2013);

		pagador = Pagador.novoPagador();
		pagador.comNome('Paulo Silveira');

		beneficiario = Beneficiario.novoBeneficiario();
		beneficiario.comNome('Rodrigo Turini');
		beneficiario.comAgencia('167');
		beneficiario.comCarteira('157');
		beneficiario.comCodigo('45145');
		beneficiario.comNossoNumero('21897666');
		beneficiario.comDigitoNossoNumero('6');

		boleto = Boleto.novoBoleto();
		boleto.comDatas(datas);
		boleto.comBeneficiario(beneficiario);
		boleto.comBanco(new Itau());
		boleto.comPagador(pagador);
		boleto.comValorBoleto(2680.16);
		boleto.comNumeroDoDocumento(575);

		done();
	},
}