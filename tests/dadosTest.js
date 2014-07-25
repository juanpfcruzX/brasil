var dados = require('../brasil').dados;

var existsSync = (process.version.indexOf('v0.6') !== -1 ? require('path').existsSync : existsSync = require('fs').existsSync);

module.exports = {
    naturezasJuridicas: {
        'Verifica que existe o número correto de naturezas jurídicas': function(test){
            test.equal(dados.naturezasJuridicas.length, 66);
            
            test.done();
        },
        
        'Verifica que todas as naturezas jurídicas são dos únicos 5 tipos possíveis': function(test) {
            var tiposDeNaturezaJuridica = ['Administração Pública', 
                                           'Entidades Empresariais', 
                                           'Entidades Sem Fins Lucrativos', 
                                           'Pessoas Físicas',
                                           'Instituições Extraterritoriais'];
            
            dados.naturezasJuridicas.forEach(function(naturezaJuridica) {
                test.notEqual(tiposDeNaturezaJuridica.indexOf(naturezaJuridica.tipo), -1);
            });
            
            test.done();
        },
        
        'Verifica que o código de todas as naturezas jurídicas seguem o mesmo padrão': function(test) {
            var padraoDoCodigo = /^\d\d\d\-\d$/;
            
            dados.naturezasJuridicas.forEach(function(naturezaJuridica) {
                test.ok(padraoDoCodigo.test(naturezaJuridica.codigo));
            });
            
            test.done();
        }
    },
    regioes: {
        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test){
            test.equal(typeof dados.regioes, 'string');
            test.ok(existsSync(dados.regioes));
            
            test.done();
        }
    },
    
    municipiosDicionario: {
        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test){
            test.equal(typeof dados.municipiosDicionario, 'string');
            test.ok(existsSync(dados.municipiosDicionario));
            
            test.done();
        }
    },
    
    municipiosArray: {
        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test){
            test.equal(typeof dados.municipiosArray, 'string');
            test.ok(existsSync(dados.municipiosArray));
            
            test.done();
        }
    },
    
    cfopsDicionario: {
        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test){
            test.equal(typeof dados.cfopsDicionario, 'string');
            test.ok(existsSync(dados.cfopsDicionario));
            
            test.done();
        }
    },
    
    cfopsArray: {
        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test){
            test.equal(typeof dados.cfopsArray, 'string');
            test.ok(existsSync(dados.cfopsArray));
            
            test.done();
        }
    },
        
    tabelaIbgeDeEstados: {
        'Verifica que existem 27 estados': function(test){
            test.equal(dados.tabelaIbgeDeEstados.length, 27);
            test.done();
        }
    },
    
    obterEstadosPorRegiao: {
        'Verifica que estados corretos são retornados': function(test){
            test.deepEqual(dados.obterEstadosPorRegiao('norte'), 
                    [
                        { codigo: 12, regiao: 'Norte', nome: 'Acre', abreviacao: 'AC' },
                        { codigo: 16, regiao: 'Norte', nome: 'Amapá', abreviacao: 'AP' },
                        { codigo: 13, regiao: 'Norte', nome: 'Amazonas', abreviacao: 'AM' },
                        { codigo: 15, regiao: 'Norte', nome: 'Pará', abreviacao: 'PA' },
                        { codigo: 11, regiao: 'Norte', nome: 'Rondônia', abreviacao: 'RO' },
                        { codigo: 14, regiao: 'Norte', nome: 'Roraima', abreviacao: 'RR' },
                        { codigo: 17, regiao: 'Norte', nome: 'Tocantins', abreviacao: 'TO' }
                    ]);
            
            test.deepEqual(dados.obterEstadosPorRegiao('nordeste'), 
                    [
                        { codigo: 27, regiao: 'Nordeste', nome: 'Alagoas', abreviacao: 'AL' },
                        { codigo: 29, regiao: 'Nordeste', nome: 'Bahia', abreviacao: 'BA' },
                        { codigo: 23, regiao: 'Nordeste', nome: 'Ceará', abreviacao: 'CE' },
                        { codigo: 21, regiao: 'Nordeste', nome: 'Maranhão', abreviacao: 'MA' },
                        { codigo: 25, regiao: 'Nordeste', nome: 'Paraíba', abreviacao: 'PB' },
                        { codigo: 26, regiao: 'Nordeste', nome: 'Pernambuco', abreviacao: 'PE' },
                        { codigo: 22, regiao: 'Nordeste', nome: 'Piauí', abreviacao: 'PI' },
                        { codigo: 24, regiao: 'Nordeste', nome: 'Rio Grande do Norte', abreviacao: 'RN' },
                        { codigo: 28, regiao: 'Nordeste', nome: 'Sergipe', abreviacao: 'SE' },
                    ]);    
        
            test.deepEqual(dados.obterEstadosPorRegiao('sudeste'), 
                    [
                        { codigo: 32, regiao: 'Sudeste', nome: 'Espírito Santo', abreviacao: 'ES' },
                        { codigo: 31, regiao: 'Sudeste', nome: 'Minas Gerais', abreviacao: 'MG' },
                        { codigo: 33, regiao: 'Sudeste', nome: 'Rio de Janeiro', abreviacao: 'RJ' },
                        { codigo: 35, regiao: 'Sudeste', nome: 'São Paulo', abreviacao: 'SP' }
                    ]);    
        
            test.deepEqual(dados.obterEstadosPorRegiao('sul'), 
                    [
                        { codigo: 41, regiao: 'Sul', nome: 'Paraná', abreviacao: 'PR' },
                        { codigo: 43, regiao: 'Sul', nome: 'Rio Grande do Sul', abreviacao: 'RS' },
                        { codigo: 42, regiao: 'Sul', nome: 'Santa Catarina', abreviacao: 'SC' }
                    ]);    
            
            test.deepEqual(dados.obterEstadosPorRegiao('centro-Oeste'), 
                    [
                        { codigo: 53, regiao: 'Centro-Oeste', nome: 'Distrito Federal', abreviacao: 'DF' },
                        { codigo: 52, regiao: 'Centro-Oeste', nome: 'Goiás', abreviacao: 'GO' },
                        { codigo: 51, regiao: 'Centro-Oeste', nome: 'Mato Grosso', abreviacao: 'MT' },
                        { codigo: 50, regiao: 'Centro-Oeste', nome: 'Mato Grosso do Sul', abreviacao: 'MS' }
                    ]);    
            
            test.done();
        }
    },
    
    siglasDosEstados: {
        'Verifica que contém 27 siglas': function(test){
            test.equal(dados.siglasDosEstados.length, 27);

            test.done();
        }
    },
    
    obterEstado: {
        'Verifica que pode-se obter o estado pelo código ibge': function(test){
            test.deepEqual(dados.obterEstado(11), { codigo: 11, regiao: 'Norte', nome: 'Rondônia', abreviacao: 'RO' });
            test.deepEqual(dados.obterEstado(12), { codigo: 12, regiao: 'Norte', nome: 'Acre', abreviacao: 'AC' });
            test.deepEqual(dados.obterEstado(13), { codigo: 13, regiao: 'Norte', nome: 'Amazonas', abreviacao: 'AM' });
            test.deepEqual(dados.obterEstado(14), { codigo: 14, regiao: 'Norte', nome: 'Roraima', abreviacao: 'RR' });
            test.deepEqual(dados.obterEstado(15), { codigo: 15, regiao: 'Norte', nome: 'Pará', abreviacao: 'PA' });
            test.deepEqual(dados.obterEstado(16), { codigo: 16, regiao: 'Norte', nome: 'Amapá', abreviacao: 'AP' });
            test.deepEqual(dados.obterEstado(17), { codigo: 17, regiao: 'Norte', nome: 'Tocantins', abreviacao: 'TO' });
            test.deepEqual(dados.obterEstado(21), { codigo: 21, regiao: 'Nordeste', nome: 'Maranhão', abreviacao: 'MA' });
            test.deepEqual(dados.obterEstado(22), { codigo: 22, regiao: 'Nordeste', nome: 'Piauí', abreviacao: 'PI' });
            test.deepEqual(dados.obterEstado(23), { codigo: 23, regiao: 'Nordeste', nome: 'Ceará', abreviacao: 'CE' });
            test.deepEqual(dados.obterEstado(24), { codigo: 24, regiao: 'Nordeste', nome: 'Rio Grande do Norte', abreviacao: 'RN' });
            test.deepEqual(dados.obterEstado(25), { codigo: 25, regiao: 'Nordeste', nome: 'Paraíba', abreviacao: 'PB' });
            test.deepEqual(dados.obterEstado(26), { codigo: 26, regiao: 'Nordeste', nome: 'Pernambuco', abreviacao: 'PE' });
            test.deepEqual(dados.obterEstado(27), { codigo: 27, regiao: 'Nordeste', nome: 'Alagoas', abreviacao: 'AL' });
            test.deepEqual(dados.obterEstado(28), { codigo: 28, regiao: 'Nordeste', nome: 'Sergipe', abreviacao: 'SE' });
            test.deepEqual(dados.obterEstado(29), { codigo: 29, regiao: 'Nordeste', nome: 'Bahia', abreviacao: 'BA' });
            test.deepEqual(dados.obterEstado(31), { codigo: 31, regiao: 'Sudeste', nome: 'Minas Gerais', abreviacao: 'MG' });
            test.deepEqual(dados.obterEstado(32), { codigo: 32, regiao: 'Sudeste', nome: 'Espírito Santo', abreviacao: 'ES' });
            test.deepEqual(dados.obterEstado(33), { codigo: 33, regiao: 'Sudeste', nome: 'Rio de Janeiro', abreviacao: 'RJ' });
            test.deepEqual(dados.obterEstado(35), { codigo: 35, regiao: 'Sudeste', nome: 'São Paulo', abreviacao: 'SP' });
            test.deepEqual(dados.obterEstado(41), { codigo: 41, regiao: 'Sul', nome: 'Paraná', abreviacao: 'PR' });
            test.deepEqual(dados.obterEstado(42), { codigo: 42, regiao: 'Sul', nome: 'Santa Catarina', abreviacao: 'SC' });
            test.deepEqual(dados.obterEstado(43), { codigo: 43, regiao: 'Sul', nome: 'Rio Grande do Sul', abreviacao: 'RS' });
            test.deepEqual(dados.obterEstado(50), { codigo: 50, regiao: 'Centro-Oeste', nome: 'Mato Grosso do Sul', abreviacao: 'MS' });
            test.deepEqual(dados.obterEstado(51), { codigo: 51, regiao: 'Centro-Oeste', nome: 'Mato Grosso', abreviacao: 'MT' });
            test.deepEqual(dados.obterEstado(52), { codigo: 52, regiao: 'Centro-Oeste', nome: 'Goiás', abreviacao: 'GO' });
            test.deepEqual(dados.obterEstado(53), { codigo: 53, regiao: 'Centro-Oeste', nome: 'Distrito Federal', abreviacao: 'DF' });
            
            test.done();
        },
        
        'Verifica que pode-se obter o estado pela abreviação do uf': function(test){
            test.deepEqual(dados.obterEstado('RO'), { codigo: 11, regiao: 'Norte', nome: 'Rondônia', abreviacao: 'RO' });
            test.deepEqual(dados.obterEstado('AC'), { codigo: 12, regiao: 'Norte', nome: 'Acre', abreviacao: 'AC' });
            test.deepEqual(dados.obterEstado('AM'), { codigo: 13, regiao: 'Norte', nome: 'Amazonas', abreviacao: 'AM' });
            test.deepEqual(dados.obterEstado('RR'), { codigo: 14, regiao: 'Norte', nome: 'Roraima', abreviacao: 'RR' });
            test.deepEqual(dados.obterEstado('PA'), { codigo: 15, regiao: 'Norte', nome: 'Pará', abreviacao: 'PA' });
            test.deepEqual(dados.obterEstado('AP'), { codigo: 16, regiao: 'Norte', nome: 'Amapá', abreviacao: 'AP' });
            test.deepEqual(dados.obterEstado('TO'), { codigo: 17, regiao: 'Norte', nome: 'Tocantins', abreviacao: 'TO' });
            test.deepEqual(dados.obterEstado('MA'), { codigo: 21, regiao: 'Nordeste', nome: 'Maranhão', abreviacao: 'MA' });
            test.deepEqual(dados.obterEstado('PI'), { codigo: 22, regiao: 'Nordeste', nome: 'Piauí', abreviacao: 'PI' });
            test.deepEqual(dados.obterEstado('CE'), { codigo: 23, regiao: 'Nordeste', nome: 'Ceará', abreviacao: 'CE' });
            test.deepEqual(dados.obterEstado('RN'), { codigo: 24, regiao: 'Nordeste', nome: 'Rio Grande do Norte', abreviacao: 'RN' });
            test.deepEqual(dados.obterEstado('PB'), { codigo: 25, regiao: 'Nordeste', nome: 'Paraíba', abreviacao: 'PB' });
            test.deepEqual(dados.obterEstado('PE'), { codigo: 26, regiao: 'Nordeste', nome: 'Pernambuco', abreviacao: 'PE' });
            test.deepEqual(dados.obterEstado('AL'), { codigo: 27, regiao: 'Nordeste', nome: 'Alagoas', abreviacao: 'AL' });
            test.deepEqual(dados.obterEstado('SE'), { codigo: 28, regiao: 'Nordeste', nome: 'Sergipe', abreviacao: 'SE' });
            test.deepEqual(dados.obterEstado('BA'), { codigo: 29, regiao: 'Nordeste', nome: 'Bahia', abreviacao: 'BA' });
            test.deepEqual(dados.obterEstado('MG'), { codigo: 31, regiao: 'Sudeste', nome: 'Minas Gerais', abreviacao: 'MG' });
            test.deepEqual(dados.obterEstado('ES'), { codigo: 32, regiao: 'Sudeste', nome: 'Espírito Santo', abreviacao: 'ES' });
            test.deepEqual(dados.obterEstado('RJ'), { codigo: 33, regiao: 'Sudeste', nome: 'Rio de Janeiro', abreviacao: 'RJ' });
            test.deepEqual(dados.obterEstado('SP'), { codigo: 35, regiao: 'Sudeste', nome: 'São Paulo', abreviacao: 'SP' });
            test.deepEqual(dados.obterEstado('PR'), { codigo: 41, regiao: 'Sul', nome: 'Paraná', abreviacao: 'PR' });
            test.deepEqual(dados.obterEstado('SC'), { codigo: 42, regiao: 'Sul', nome: 'Santa Catarina', abreviacao: 'SC' });
            test.deepEqual(dados.obterEstado('RS'), { codigo: 43, regiao: 'Sul', nome: 'Rio Grande do Sul', abreviacao: 'RS' });
            test.deepEqual(dados.obterEstado('MS'), { codigo: 50, regiao: 'Centro-Oeste', nome: 'Mato Grosso do Sul', abreviacao: 'MS' });
            test.deepEqual(dados.obterEstado('MT'), { codigo: 51, regiao: 'Centro-Oeste', nome: 'Mato Grosso', abreviacao: 'MT' });
            test.deepEqual(dados.obterEstado('GO'), { codigo: 52, regiao: 'Centro-Oeste', nome: 'Goiás', abreviacao: 'GO' });
            test.deepEqual(dados.obterEstado('DF'), { codigo: 53, regiao: 'Centro-Oeste', nome: 'Distrito Federal', abreviacao: 'DF' });
            
            test.done();
        },
        
        'Verifica que pode-se obter o estado pelo nome': function(test){
            test.deepEqual(dados.obterEstado('Rondônia'), { codigo: 11, regiao: 'Norte', nome: 'Rondônia', abreviacao: 'RO' });
            test.deepEqual(dados.obterEstado('Acre'), { codigo: 12, regiao: 'Norte', nome: 'Acre', abreviacao: 'AC' });
            test.deepEqual(dados.obterEstado('Amazonas'), { codigo: 13, regiao: 'Norte', nome: 'Amazonas', abreviacao: 'AM' });
            test.deepEqual(dados.obterEstado('Roraima'), { codigo: 14, regiao: 'Norte', nome: 'Roraima', abreviacao: 'RR' });
            test.deepEqual(dados.obterEstado('Pará'), { codigo: 15, regiao: 'Norte', nome: 'Pará', abreviacao: 'PA' });
            test.deepEqual(dados.obterEstado('Amapá'), { codigo: 16, regiao: 'Norte', nome: 'Amapá', abreviacao: 'AP' });
            test.deepEqual(dados.obterEstado('Tocantins'), { codigo: 17, regiao: 'Norte', nome: 'Tocantins', abreviacao: 'TO' });
            test.deepEqual(dados.obterEstado('Maranhão'), { codigo: 21, regiao: 'Nordeste', nome: 'Maranhão', abreviacao: 'MA' });
            test.deepEqual(dados.obterEstado('Piauí'), { codigo: 22, regiao: 'Nordeste', nome: 'Piauí', abreviacao: 'PI' });
            test.deepEqual(dados.obterEstado('Ceará'), { codigo: 23, regiao: 'Nordeste', nome: 'Ceará', abreviacao: 'CE' });
            test.deepEqual(dados.obterEstado('Rio Grande do Norte'), { codigo: 24, regiao: 'Nordeste', nome: 'Rio Grande do Norte', abreviacao: 'RN' });
            test.deepEqual(dados.obterEstado('Paraíba'), { codigo: 25, regiao: 'Nordeste', nome: 'Paraíba', abreviacao: 'PB' });
            test.deepEqual(dados.obterEstado('Pernambuco'), { codigo: 26, regiao: 'Nordeste', nome: 'Pernambuco', abreviacao: 'PE' });
            test.deepEqual(dados.obterEstado('Alagoas'), { codigo: 27, regiao: 'Nordeste', nome: 'Alagoas', abreviacao: 'AL' });
            test.deepEqual(dados.obterEstado('Sergipe'), { codigo: 28, regiao: 'Nordeste', nome: 'Sergipe', abreviacao: 'SE' });
            test.deepEqual(dados.obterEstado('Bahia'), { codigo: 29, regiao: 'Nordeste', nome: 'Bahia', abreviacao: 'BA' });
            test.deepEqual(dados.obterEstado('Minas Gerais'), { codigo: 31, regiao: 'Sudeste', nome: 'Minas Gerais', abreviacao: 'MG' });
            test.deepEqual(dados.obterEstado('Espírito Santo'), { codigo: 32, regiao: 'Sudeste', nome: 'Espírito Santo', abreviacao: 'ES' });
            test.deepEqual(dados.obterEstado('Rio de Janeiro'), { codigo: 33, regiao: 'Sudeste', nome: 'Rio de Janeiro', abreviacao: 'RJ' });
            test.deepEqual(dados.obterEstado('São Paulo'), { codigo: 35, regiao: 'Sudeste', nome: 'São Paulo', abreviacao: 'SP' });
            test.deepEqual(dados.obterEstado('Paraná'), { codigo: 41, regiao: 'Sul', nome: 'Paraná', abreviacao: 'PR' });
            test.deepEqual(dados.obterEstado('Santa Catarina'), { codigo: 42, regiao: 'Sul', nome: 'Santa Catarina', abreviacao: 'SC' });
            test.deepEqual(dados.obterEstado('Rio Grande do Sul'), { codigo: 43, regiao: 'Sul', nome: 'Rio Grande do Sul', abreviacao: 'RS' });
            test.deepEqual(dados.obterEstado('Mato Grosso do Sul'), { codigo: 50, regiao: 'Centro-Oeste', nome: 'Mato Grosso do Sul', abreviacao: 'MS' });
            test.deepEqual(dados.obterEstado('Mato Grosso'), { codigo: 51, regiao: 'Centro-Oeste', nome: 'Mato Grosso', abreviacao: 'MT' });
            test.deepEqual(dados.obterEstado('Goiás'), { codigo: 52, regiao: 'Centro-Oeste', nome: 'Goiás', abreviacao: 'GO' });
            test.deepEqual(dados.obterEstado('Distrito Federal'), { codigo: 53, regiao: 'Centro-Oeste', nome: 'Distrito Federal', abreviacao: 'DF' });
            
            test.done();
        }
    }
};