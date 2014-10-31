var boleto = require('../../../lib/boletoUtils.js'),
	Itau = require('../../../lib/boleto/bancos/itau.js'),

	Datas = boleto.Datas,
	Beneficiario = boleto.Beneficiario,
	Pagador = boleto.Pagador,
	Boleto = boleto.Boleto,

	banco,
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

		banco = new Itau();

		boleto = Boleto.novoBoleto();
		boleto.comDatas(datas);
		boleto.comBeneficiario(beneficiario);
		boleto.comBanco(banco);
		boleto.comPagador(pagador);
		boleto.comValorBoleto(2680.16);
		boleto.comNumeroDoDocumento(575);

		done();
	},

	'Nosso número formatado deve ter oito digitos': function(test) {
		var beneficiario = Beneficiario.novoBeneficiario().comNossoNumero('9000206'),
			numeroFormatado = banco.getNossoNumeroFormatado(beneficiario);

		test.equals(8, numeroFormatado.length);
		test.equals('09000206', numeroFormatado);
		test.done();
	},

	'Carteira formatado deve ter três dígitos': function(test) {
		var beneficiario = Beneficiario.novoBeneficiario().comCarteira('1'),
			numeroFormatado = banco.getCarteiraFormatado(beneficiario);

		test.equals(3, numeroFormatado.length);
		test.equals('001', numeroFormatado);
		test.done();
	},

	'Conta corrente formatada deve ter cinco dígitos': function(test) {
		var numeroFormatado = banco.getCodigoFormatado(beneficiario);

		test.equals(5, numeroFormatado.length);
		test.equals('45145', numeroFormatado);
		test.done();
	},

	'Verifica linha digitável': function(test) {

		test.done();
	},
}