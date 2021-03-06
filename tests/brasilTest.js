var 
	fs = require("fs"),
	utils = require("../brasil");

var existsSync = (process.version.indexOf("v0.6") !== -1 ? require("path").existsSync : existsSync = fs.existsSync);

module.exports = {
	"Verifica que todos os submodulos estão disponíveis": function(test){
		fs.readdirSync(__dirname + "/..").forEach(function(file){
			var match = file.match(/(.*)Utils.js/);
			
			if(match){
				//console.log(match[1] + " / " + typeof utils[match[1]]);
				test.ok(utils[match[1]]);
			}
		});
		
		test.done();
	},
	
	"Verifica que para cada submodulo existe um arquivo de teste": function(test){
		fs.readdirSync(__dirname + "/..").forEach(function(file){
			var match = file.match(/(.*)Utils.js/);
			
			if(match){
				var exists = existsSync(__dirname + "/" + match[1] + "Test.js");
				//console.log(match[1] + " / " + exists);
				test.ok(exists);
			}
		});
		
		test.done();
	},
	
	"Verifica que para cada propriedade exposta por um submodulo existe um conjunto de testes": function(test){
		fs.readdirSync(__dirname + "/..").forEach(function(file){
			var match = file.match(/(.*)Utils.js/);
			
			if(match){
				var testFilePath = __dirname + "/" + match[1] + "Test.js";
				var exists = existsSync(testFilePath);
				if(exists){
					var submoduleTest = require(testFilePath);
					var submodule = require(__dirname + "/../" + file);
					
					//console.log(match[1] + " / " + file);

					for(var property in submodule){
						if(submodule.hasOwnProperty(property)){
							var temTeste = property in submoduleTest; 
							//console.log("	" + property + " > " + temTeste);
							test.ok(temTeste);
						}
					}
					
				}
			}
		});
		
		test.done();
	}
};