var formatacoes = require('../brasil').formatacoes;

module.exports = {

	removerMascara: {
		'Remove mascaras de Cnpj': function(test) {
			test.equal(formatacoes.removerMascara('18.028.400/0001-70'), '18028400000170');
			test.done();
		},
		'Remove mascaras de Cpf': function(test) {
			test.equal(formatacoes.removerMascara('934.621.219-52'), '93462121952');
			test.done();
		},
		'Remove mascaras de Telefone': function(test) {
			test.equal(formatacoes.removerMascara('(61) 8633-3051'), '6186333051');
			test.done();
		},
		'Remove mascaras de Placa': function(test) {
			test.equal(formatacoes.removerMascara('ABC-2366'), 'ABC2366');
			test.done();
		},
		'Remove mascaras de Cep': function(test) {
			test.equal(formatacoes.removerMascara('71.530-070'), '71530070');
			test.done();
		},

		'Remove espaços em branco no começo e no final': function(test) {
			test.equal(formatacoes.removerMascara('    71.420-070  \t'), '71420070');
			test.done();
		},

		'Se for passado algo que não é uma string então o mesmo é retornado': function(test) {
			test.equal(formatacoes.removerMascara(null), null);
			test.equal(formatacoes.removerMascara({}.devolvaUndefined), undefined);
			test.equal(formatacoes.removerMascara(123), 123);
			test.done();
		}
	},

	cnpj: {
		'Verifica que a máscara é aplicada corretamente': function(test) {

			test.equal(formatacoes.cnpj('18028400000170'), '18.028.400/0001-70');
			test.equal(formatacoes.cnpj(' 18028400000170 '), '18.028.400/0001-70');

			test.done();
		},

		'Se passa algo que não era cnpj retorna o que foi passado anteriormente': function(test) {

			test.equal(formatacoes.cnpj('18028400000171'), '18028400000171');
			test.equal(formatacoes.cnpj('a8028400000170'), 'a8028400000170');

			test.done();
		}
	},

	cpf: {
		'Verifica que a máscara é aplicada corretamente': function(test) {

			test.equal(formatacoes.cpf('93462121952'), '934.621.219-52');
			test.equal(formatacoes.cpf(' 93462121952 '), '934.621.219-52');

			test.done();
		},

		'Se passa algo que não era cpf retorna o que foi passado anteriormente': function(test) {

			test.equal(formatacoes.cnpj('foo bar'), 'foo bar');
			test.equal(formatacoes.cnpj('93462121953'), '93462121953');

			test.done();
		}
	},

	registroNacional: {
		'Verifica que a máscara é aplicada corretamente': function(test) {

			test.equal(formatacoes.registroNacional('18028400000170'), '18.028.400/0001-70');
			test.equal(formatacoes.registroNacional(' 18028400000170 '), '18.028.400/0001-70');

			test.equal(formatacoes.registroNacional('93462121952'), '934.621.219-52');
			test.equal(formatacoes.registroNacional(' 93462121952 '), '934.621.219-52');

			test.done();
		}
	},

	telefone: {
		'Verifica que a máscara é aplicada corretamente': function(test) {
			test.equal(formatacoes.telefone('6186333051'), '(61) 8633-3051');
			test.equal(formatacoes.telefone('61986333051'), '(61) 98633-3051');

			test.done();
		},

		'Verifica que retorna a mesma coisa quando texto não é telefone': function(test) {
			test.equal(formatacoes.telefone('6a86333051'), '6a86333051');
			test.equal(formatacoes.telefone('foo'), 'foo');

			test.done();
		}
	},

	placa: {
		'Verifica que máscara é aplicada corretamente': function(test) {
			test.equal(formatacoes.placa('abc2366'), 'ABC-2366');
			test.equal(formatacoes.placa('abc-2343'), 'ABC-2343');

			test.done();
		},

		'Verifica que retorna a mesma coisa quando texto não é placa': function(test) {
			test.equal(formatacoes.placa('abcd-2366'), 'abcd-2366');
			test.equal(formatacoes.placa('foo'), 'foo');

			test.done();
		}
	},

	cep: {
		'Verifica que máscara é aplicada corretamente': function(test) {
			test.equal(formatacoes.cep('71530070'), '71.530-070');
			test.equal(formatacoes.cep('71.530070'), '71.530-070');
			test.equal(formatacoes.cep('71530-070'), '71.530-070');

			test.done();
		},

		'Verifica que retorna a mesma coisa quando texto não é cep': function(test) {
			test.equal(formatacoes.cep('715300700'), '715300700');
			test.equal(formatacoes.cep('foo'), 'foo');

			test.done();
		}
	}
};