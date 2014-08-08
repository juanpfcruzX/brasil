var validacoes = require("../brasil").validacoes;

module.exports = {
	ePlaca: {
		"Valida-se placas válidas com ou sem máscara": function(test){
			test.ok(validacoes.ePlaca("abc1234"));
			test.ok(validacoes.ePlaca("abc-1234"));

			test.ok(validacoes.ePlaca("jjd0931"));
			test.ok(validacoes.ePlaca("jjd-0931"));

			test.ok(validacoes.ePlaca("ddw1177"));
			test.ok(validacoes.ePlaca("ddw-1177"));

			test.done();
		},

		"Placas inválidas não são validadas": function(test){
			test.ok(!validacoes.ePlaca("ddwd1177"));
			test.ok(!validacoes.ePlaca("ddw11772"));
			test.ok(!validacoes.ePlaca("ddw-a772"));
			test.ok(!validacoes.ePlaca("1dw-3772"));
			test.ok(!validacoes.ePlaca("foo bar"));
			test.ok(!validacoes.ePlaca(new Date()));
			test.ok(!validacoes.ePlaca(12345));

			test.done();
		}
	},

	eDDD: {
		'Valida DDDs conhecidos, tanto em strings quanto números': function(test) {
			test.ok(validacoes.eDDD(61));
			test.ok(validacoes.eDDD('61'));

			test.ok(validacoes.eDDD(11));
			test.ok(validacoes.eDDD('11'));

			test.ok(validacoes.eDDD(99));
			test.ok(validacoes.eDDD('99'));

			test.done();
		},

		'Não valida DDDs desconhecidos': function(test) {
			test.equal(validacoes.eDDD(100), false);
			test.equal(validacoes.eDDD('gammasoft'), false);
			test.equal(validacoes.eDDD(/asdf/g), false);
			test.equal(validacoes.eDDD('0'), false);

			test.done();
		},
	},

	eTelefone: {
		"Valida-se telefones válidos com ou sem máscara": function(test){
			test.ok(validacoes.eTelefone("(61) 9982-3577"));
			test.ok(validacoes.eTelefone("(61)9982-3577"));
			test.ok(validacoes.eTelefone("(61)99982-3577"));
			test.ok(validacoes.eTelefone("6199982-3577"));
			test.ok(validacoes.eTelefone("61999823577"));
			test.ok(validacoes.eTelefone("61 9982-3577"));
			test.ok(validacoes.eTelefone("61 99823577"));

			test.done();
		},

		'Valida-se telefones sem DDD': function(test) {
			test.ok(validacoes.eTelefone("9982-3577"));
			test.ok(validacoes.eTelefone("9982-3577"));
			test.ok(validacoes.eTelefone("99982-3577"));
			test.ok(validacoes.eTelefone("99982-3577"));
			test.ok(validacoes.eTelefone("999823577"));
			test.ok(validacoes.eTelefone("9982-3577"));
			test.ok(validacoes.eTelefone("99823577"));

			test.done();
		},

		"Telefones inválidos não são validados": function(test){
			test.ok(!validacoes.eTelefone(" (61) 9982-3577 "));
			test.ok(!validacoes.eTelefone("61-9982-3577"));
			test.ok(!validacoes.eTelefone("(61)09982-3577"));
			test.ok(!validacoes.eTelefone("610982-3577"));
			test.ok(!validacoes.eTelefone("(61) 99982.3577"));

			test.done();
		},

		"Telefones com DDD inválidos não são validados": function(test){
			test.ok(!validacoes.eTelefone("(00) 9982-3577"));
			test.ok(!validacoes.eTelefone("(60) 9982-3577"));
			test.ok(!validacoes.eTelefone("(70) 9982-3577"));

			test.done();
		},

		'É possível passar uma flag para ignorar a validação de DDD': function(test){
			test.ok(validacoes.eTelefone("(00) 9982-3577", false));
			test.ok(validacoes.eTelefone("(60) 9982-3577", false));
			test.ok(validacoes.eTelefone("(70) 9982-3577", false));

			test.done();
		},
	},

	eCep: {
		"Valida-se ceps válidos com ou sem máscara": function(test){
			test.ok(validacoes.eCep("71530070"));
			test.ok(validacoes.eCep("71530-070"));
			test.ok(validacoes.eCep("71.530070"));
			test.ok(validacoes.eCep("71.530-070"));

			test.done();
		},

		"Ceps inválidos não são validados": function(test){
			test.ok(!validacoes.eCep("71530a070"));
			test.ok(!validacoes.eCep("71530-0709"));
			test.ok(!validacoes.eCep("771.530070"));
			test.ok(!validacoes.eCep(" 71.530-070"));

			test.done();
		}
	},

	eRegistroNacional: {
		"Verifica que é possível validar cpfs": function(test) {
			test.equal(validacoes.eRegistroNacional("227.175.903-07"), "cpf");
			test.equal(validacoes.eRegistroNacional("16511762645"), "cpf");
			test.equal(validacoes.eRegistroNacional("434.803.222-04"), "cpf");
			test.equal(validacoes.eRegistroNacional("82647731330"), "cpf");
			test.equal(validacoes.eRegistroNacional(" 711.477.475-39 "), "cpf");
			test.equal(validacoes.eRegistroNacional("711.477.475-39"), "cpf");

			test.done();
		},


		"Verifica que é possível validar cnpjs": function(test) {
			test.equal(validacoes.eRegistroNacional("16.555.517/0001-87"), "cnpj");
			test.equal(validacoes.eRegistroNacional("14638632000190"), "cnpj");
			test.equal(validacoes.eRegistroNacional(" 88.142.322/0001-16 "), "cnpj");
			test.equal(validacoes.eRegistroNacional("88.142.322/0001-16"), "cnpj");
			test.equal(validacoes.eRegistroNacional("28716876000158"), "cnpj");
			test.equal(validacoes.eRegistroNacional("13.381.462/0001-48"), "cnpj");

			test.done();
		},

		"Verifica que é possível especificar tipo de registro nacional a ser validado": function(test) {
			test.ok(!validacoes.eRegistroNacional("227.175.903-07", "cnpj"));
			test.ok(!validacoes.eRegistroNacional("16511762645", "cnpj"));
			test.ok(!validacoes.eRegistroNacional("434.803.222-04", "cnpj"));
			test.ok(!validacoes.eRegistroNacional("82647731330", "cnpj"));
			test.ok(!validacoes.eRegistroNacional(" 711.477.475-39 ", "cnpj"));
			test.ok(!validacoes.eRegistroNacional("711.477.475-39", "cnpj"));

			test.ok(!validacoes.eRegistroNacional("16.555.517/0001-87", "cpf"));
			test.ok(!validacoes.eRegistroNacional("14638632000190", "cpf"));
			test.ok(!validacoes.eRegistroNacional(" 88.142.322/0001-16 ", "cpf"));
			test.ok(!validacoes.eRegistroNacional("88.142.322/0001-16", "cpf"));
			test.ok(!validacoes.eRegistroNacional("28716876000158", "cpf"));
			test.ok(!validacoes.eRegistroNacional("13.381.462/0001-48", "cpf"));

			test.equal(validacoes.eRegistroNacional("227.175.903-07", "cpf"), "cpf");
			test.equal(validacoes.eRegistroNacional("16511762645", "cpf"), "cpf");
			test.equal(validacoes.eRegistroNacional("434.803.222-04", "cpf"), "cpf");
			test.equal(validacoes.eRegistroNacional("82647731330", "cpf"), "cpf");
			test.equal(validacoes.eRegistroNacional(" 711.477.475-39 ", "cpf"), "cpf");
			test.equal(validacoes.eRegistroNacional("711.477.475-39", "cpf"), "cpf");

			test.equal(validacoes.eRegistroNacional("16.555.517/0001-87", "cnpj"), "cnpj");
			test.equal(validacoes.eRegistroNacional("14638632000190", "cnpj"), "cnpj");
			test.equal(validacoes.eRegistroNacional(" 88.142.322/0001-16 ", "cnpj"), "cnpj");
			test.equal(validacoes.eRegistroNacional("88.142.322/0001-16", "cnpj"), "cnpj");
			test.equal(validacoes.eRegistroNacional("28716876000158", "cnpj"), "cnpj");
			test.equal(validacoes.eRegistroNacional("13.381.462/0001-48", "cnpj"), "cnpj");

			test.done();
		},

		"Retorna 'false' caso não seja nem cpf nem cnpj": function(test) {
			test.equal(validacoes.eRegistroNacional("foo bar"), false);
			test.equal(validacoes.eRegistroNacional("14.638.632/0001-9"), false);
			test.equal(validacoes.eRegistroNacional("434.803.222-05"), false);
			test.equal(validacoes.eRegistroNacional("13.555.517/0001-87"), false);
			test.equal(validacoes.eRegistroNacional("165.117.626-455"), false);

			test.done();
		}
	},

	eCnpj: {
		"Verifica que é possível validar cnpjs": function(test) {
			test.ok(validacoes.eCnpj("16.555.517/0001-87"));
			test.ok(validacoes.eCnpj("14638632000190"));
			test.ok(validacoes.eCnpj(" 88.142.322/0001-16  "));
			test.ok(validacoes.eCnpj("88.142.322/0001-16"));
			test.ok(validacoes.eCnpj("28716876000158"));
			test.ok(validacoes.eCnpj("13.381.462/0001-48"));

			test.done();
		},

		"Retorna false para cnpj inválido": function(test) {
			test.ok(!validacoes.eCnpj("16.55.517/0001-87"));
			test.ok(!validacoes.eCnpj("146386320001901"));
			test.ok(!validacoes.eCnpj("foo bar"));
			test.ok(!validacoes.eCnpj("2328716876000158"));
			test.ok(!validacoes.eCnpj("a1 3.381.462/0001-48"));

			test.done();
		}
	},

	eMatriz: {
		"Verifica que é possivel identificar uma matriz pelo CNPJ": function(test) {

			test.ok(validacoes.eMatriz('00.132.781/0001-78'));
			test.ok(validacoes.eMatriz('00.000.000/0001-91'));
			test.ok(validacoes.eMatriz('19950366000150'));

			test.equal(validacoes.eMatriz('00123123000209'), false);
			test.equal(validacoes.eMatriz('00123432000513'), false);
			test.equal(validacoes.eMatriz('12123432009982'), false);

			test.done();
		},

		"Verifica que retorna nulo caso não seja passado um CNPJ": function(test) {
			test.equal(validacoes.eMatriz('123456'), null);
			test.equal(validacoes.eMatriz('testando'), null);

			test.done();
		}
	},

	eFilial: {
		"Verifica que é possível identificar uma filial pelo CNPJ, e que o seu número é retornado": function(test) {

			test.equal(validacoes.eFilial('00.132.781/0001-78'), false);
			test.equal(validacoes.eFilial('00.000.000/0001-91'), false);
			test.equal(validacoes.eFilial('19950366000150'), false);

			test.equal(validacoes.eFilial('00123123000209'), 2);
			test.equal(validacoes.eFilial('00123432000513'), 5);
			test.equal(validacoes.eFilial('12123432009982'), 99);

			test.done();
		},

		"Verifica que retorna nulo caso não seja passado um CNPJ": function(test) {
			test.equal(validacoes.eFilial('123456'), null);
			test.equal(validacoes.eFilial('testando'), null);

			test.done();
		}
	},

	eCpf: {
		"Verifica que é possível validar cpfs": function(test) {
			test.ok(validacoes.eCpf("  227.175.903-07   "));
			test.ok(validacoes.eCpf("227.175.903-07"));
			test.ok(validacoes.eCpf("16511762645"));
			test.ok(validacoes.eCpf("434.803.222-04"));
			test.ok(validacoes.eCpf("82647731330"));
			test.ok(validacoes.eCpf("711.477.475-39"));

			test.done();
		},

		"Retorna false para cpf inválido": function(test) {
			test.ok(!validacoes.eCpf("227.175.903-08"));
			test.ok(!validacoes.eCpf("16511762645u"));
			test.ok(!validacoes.eCpf("foo bar"));
			test.ok(!validacoes.eCpf("826471731330"));
			test.ok(!validacoes.eCpf("731.477.475-39"));

			test.done();
		}
	}
};