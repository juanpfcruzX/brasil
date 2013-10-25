var formatacoes = require("../formatacoesUtils");

module.exports = {
	cnpj: {
		"Verifica que a máscara é aplicada corretamente": function(test){
			
			test.equal(formatacoes.cnpj("18028400000170"), "18.028.400/0001-70");
			test.equal(formatacoes.cnpj(" 18028400000170 "), "18.028.400/0001-70");
			
			test.done();
		},
		
		"Se passa algo que não era cnpj retorna o que foi passado anteriormente": function(test){
			
			test.equal(formatacoes.cnpj("18028400000171"), "18028400000171");
			test.equal(formatacoes.cnpj("a8028400000170"), "a8028400000170");
			
			test.done();
		}
	},
	
	cpf: {
		"Verifica que a máscara é aplicada corretamente": function(test){
			
			test.equal(formatacoes.cpf("93462121952"), "934.621.219-52");
			test.equal(formatacoes.cpf(" 93462121952 "), "934.621.219-52");
			
			test.done();
		},
		
		"Se passa algo que não era cpf retorna o que foi passado anteriormente": function(test){
			
			test.equal(formatacoes.cnpj("foo bar"), "foo bar");
			test.equal(formatacoes.cnpj("93462121953"), "93462121953");
			
			test.done();
		}
	},
	
	registroNacional: {
		"Verifica que a máscara é aplicada corretamente": function(test){

			test.equal(formatacoes.registroNacional("18028400000170"), "18.028.400/0001-70");
			test.equal(formatacoes.registroNacional(" 18028400000170 "), "18.028.400/0001-70");
			
			test.equal(formatacoes.registroNacional("93462121952"), "934.621.219-52");
			test.equal(formatacoes.registroNacional(" 93462121952 "), "934.621.219-52");
			
			test.done();
		}
	},
	
	telefone: {
		"Verifica que a máscara é aplicada corretamente": function(test){
			test.equal(formatacoes.telefone("6186333051"), "(61) 8633-3051");
			test.equal(formatacoes.telefone("61986333051"), "(61) 98633-3051");
			
			test.done();
		},
		
		"Verifica que retorna a mesma coisa quando texto não é telefone": function(test){
			test.equal(formatacoes.telefone("6a86333051"), "6a86333051");
			test.equal(formatacoes.telefone("foo"), "foo");
			
			test.done();
		}
	},
	
	placa: {
		"Verifica que máscara é aplicada corretamente": function(test){
			test.equal(formatacoes.placa("abc2366"), "ABC-2366");
			test.equal(formatacoes.placa("abc-2343"), "ABC-2343");
			
			test.done();
		},
		
		"Verifica que retorna a mesma coisa quando texto não é placa": function(test){
			test.equal(formatacoes.telefone("abcd-2366"), "abcd-2366");
			test.equal(formatacoes.telefone("foo"), "foo");
			
			test.done();
		}
	}
};