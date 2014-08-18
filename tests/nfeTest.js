var nfe = require("../brasil").nfe;

module.exports = {
	gerarChaveDeAcesso: {
		"Verifica geração de chave de acesso": function(test){
			var chave = nfe.gerarChaveDeAcesso({
				uf: "GO",
				dataDeEmissao: new Date(2013, 8),
				cnpj: "00132781000178",
				modelo: "55",
				serie: 100,
				numero: 20614,
				tipoDeEmissao: 1,
				numeroAleatorio: "50115201"
			});

			test.equal(chave, "52130900132781000178551000000206141501152010");
			test.done();
		},

		"Verifica que pode-se gerar a chave passando o codigo da UF": function(test){
			var chave = nfe.gerarChaveDeAcesso({
				uf: 52,
				dataDeEmissao: new Date(2013, 8),
				cnpj: "00132781000178",
				modelo: "55",
				serie: 100,
				numero: 20614,
				tipoDeEmissao: 1,
				numeroAleatorio: "50115201"
			});

			test.equal(chave, "52130900132781000178551000000206141501152010");
			test.done();
		},

		"Verifica que pode-se gerar a chave passando o nome da UF": function(test){
			var chave = nfe.gerarChaveDeAcesso({
				uf: "Goiás",
				dataDeEmissao: new Date(2013, 8),
				cnpj: "00132781000178",
				modelo: "55",
				serie: 100,
				numero: 20614,
				tipoDeEmissao: 1,
				numeroAleatorio: "50115201"
			});

			test.equal(chave, "52130900132781000178551000000206141501152010");
			test.done();
		}
	},

	formatarNumero: {
		"Verifica formatação do número da Nfe": function(test){
			test.equal(nfe.formatarNumero(15380), "000.015.380");
			test.equal(nfe.formatarNumero(215380), "000.215.380");
			test.equal(nfe.formatarNumero(1215380), "001.215.380");
			test.equal(nfe.formatarNumero(0), "000.000.000");
			test.equal(nfe.formatarNumero(1), "000.000.001");

			test.done();
		}
	},

	formatarSerie: {
		"Verifica formatação da série da Nfe": function(test){
			test.equal(nfe.formatarSerie(1), "001");
			test.equal(nfe.formatarSerie(100), "100");
			test.equal(nfe.formatarSerie(105), "105");
			test.equal(nfe.formatarSerie(50), "050");
			test.equal(nfe.formatarSerie(2), "002");

			test.done();
		}
	},

	formatarChaveDeAcesso: {
		"Verifica formatação da chave de acesso": function(test){
			test.equal(nfe.formatarChaveDeAcesso("52131000132781000178551000000153401000153408"), "5213 1000 1327 8100 0178 5510 0000 0153 4010 0015 3408");
			test.done();
		},

		"Verifica que devolve a mesma string passada caso não tenham 44 caracteres": function(test){
			test.equal(nfe.formatarChaveDeAcesso("5213100013278100017851000000153401000153408"), "5213100013278100017851000000153401000153408");
			test.done();
		},

		"Verifica que devolve a mesma string passada caso não tenham apenas números": function(test){
			test.equal(nfe.formatarChaveDeAcesso("5213100013278100017A551000000153401000153408"), "5213100013278100017A551000000153401000153408");
			test.done();
		}
	},

	validarChaveDeAcesso: {
		"Verifica que valida-se chaves validas": function(test){
			test.ok(nfe.validarChaveDeAcesso("52131000132781000178551000000153401000153408"));
			test.ok(nfe.validarChaveDeAcesso("52130900132781000178551000000206141501152010"));
			test.ok(nfe.validarChaveDeAcesso("52130900132781000178551000000207461000410105"));
			test.ok(nfe.validarChaveDeAcesso("52130900132781000178551000000213461000120002"));
			test.ok(nfe.validarChaveDeAcesso("52130900132781000178551000000208151879100705"));

			test.done();
		},

		"Verifica que não valida-se chaves inválidas": function(test){
			test.ok(!nfe.validarChaveDeAcesso("5213100013781000178551000000153401000153408"));
			test.ok(!nfe.validarChaveDeAcesso("52130900132781000178551000000206141501152011"));
			test.ok(!nfe.validarChaveDeAcesso("52130900132781000178551000000207461S00410105"));
			test.ok(!nfe.validarChaveDeAcesso("521309001327810001785510000002134610500120002"));
			test.ok(!nfe.validarChaveDeAcesso("52130900112781000178551000000208151879100705"));

			test.done();
		}
	},

	calcularDigitoVerificador: {
		"Verifica que digito é calculado corretamente": function(test){

			test.equal(nfe.calcularDigitoVerificador("5213100013278100017855100000015340100015340"), 8);
			test.equal(nfe.calcularDigitoVerificador("5213090013278100017855100000020614150115201"), 0);
			test.equal(nfe.calcularDigitoVerificador("5213090013278100017855100000020746100041010"), 5);
			test.equal(nfe.calcularDigitoVerificador("5213090013278100017855100000021346100012000"), 2);
			test.equal(nfe.calcularDigitoVerificador("5213090013278100017855100000020815187910070"), 5);

			test.done();
		},

		"Verifica que se não for uma string com 43 caracteres retorna 'false'": function(test){
			test.equal(nfe.calcularDigitoVerificador("52131000132781000178551000000153401000153403"), false);
			test.done();
		},

		"Verifica que se não for uma string não numérica retorna 'false'": function(test){
			test.equal(nfe.calcularDigitoVerificador("52130900132781000178A5100000020815187910070"), false);
			test.done();
		}
	},

	reduzirBaseDeCalculo: {
		'Verifica que calculo de reducao esta correto': function(test) {
			test.equal(nfe.reduzirBaseDeCalculo(100, 0.03, 0.17), 17.64705882352941);
			test.done();
		},
	},

	issqn: {
		'Verifica que quantidade de servicos esta correta': function(test) {
			test.equal(nfe.issqn.listaDeServicos('array').length, 193);
			test.equal(Object.keys(nfe.issqn.listaDeServicos('hash')).length, 193);
			test.done();
		},

		'Verifica que quantidade de tipos de tributação está correta': function(test) {
			test.equal(nfe.issqn.tiposDeTributacao.length, 4);
			test.done();
		}
	},

	icms: {
		'Verifica que retorna quantidade correta de STs para SIMPLES': function(test) {
			test.equal(nfe.icms.obterSituacoesTributarias('simples').length, 10);
			test.done();
		},

		'Verifica que retorna quantidade correta de STs para regime NORMAL': function(test) {
			test.equal(nfe.icms.obterSituacoesTributarias('normal').length, 11);
			test.done();
		},

		'Verifica que retorna quantidade correta de STs para ambos os regimes': function(test) {
			test.equal(nfe.icms.obterSituacoesTributarias().length, 21);
			test.done();
		},
	},

	pis: {
		'Verifica que retorna quantidade correta de STs': function(test) {
			test.equal(nfe.pis.obterSituacoesTributarias().length, 33);
			test.done();
		},
	},

	ipi: {
		'Verifica que retorna quantidade correta de STs': function(test) {
			test.equal(nfe.ipi.obterSituacoesTributarias().length, 14);
			test.done();
		},
	},

	cofins: {
		'Verifica que retorna quantidade correta de STs': function(test) {
			test.equal(nfe.cofins.obterSituacoesTributarias().length, 33);
			test.done();
		},
	}
};