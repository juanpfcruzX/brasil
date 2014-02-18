var path = require('path');

module.exports.regioes = path.join(__dirname, './dados/regioes.json');
module.exports.municipiosDicionario = path.join(__dirname, './dados/municipios-dicionario.json');
module.exports.municipiosArray = path.join(__dirname, './dados/municipios-array.json');
module.exports.cfopsDicionario = path.join(__dirname, './dados/cfops-dicionario.json');
module.exports.cfopsArray = path.join(__dirname, './dados/cfops-array.json');

var naturezasJuridicas = [
    //fonte: http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/tabelas/natjurqualificaresponsavel.htm
    { tipo: 'Administração Pública', codigo: '101-5', descricao: 'Órgão Público do Poder Executivo Federal', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '102-3', descricao: 'Órgão Público do Poder Executivo Estadual ou do Distrito Federal', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '103-1', descricao: 'Órgão Público do Poder Executivo Municipal', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '104-0', descricao: 'Órgão Público do Poder Legislativo Federal', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '105-8', descricao: 'Órgão Público do Poder Legislativo Estadual ou do Distrito Federal', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '106-6', descricao: 'Órgão Público do Poder Legislativo Municipal', representante: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '107-4', descricao: 'Órgão Público do Poder Judiciário Federal', representante: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '108-2', descricao: 'Órgão Público do Poder Judiciário Estadual', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '110-4', descricao: 'Autarquia Federal', representante: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Administração Pública', codigo: '111-2', descricao: 'Autarquia Estadual ou do Distrito Federal', representante: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Administração Pública', codigo: '112-0', descricao: 'Autarquia Municipal', representante: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Administração Pública', codigo: '113-9', descricao: 'Fundação Federal', representante: ['Presidente'], qualificacao: ['16'] },
    { tipo: 'Administração Pública', codigo: '114-7', descricao: 'Fundação Estadual ou do Distrito Federal', representante: ['Presidente'], qualificacao: ['16'] },
    { tipo: 'Administração Pública', codigo: '115-5', descricao: 'Fundação Municipal', representante: ['Presidente'], qualificacao: ['16'] },
    { tipo: 'Administração Pública', codigo: '116-3', descricao: 'Órgão Público Autônomo Federal', representante: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '117-1', descricao: 'Órgão Público Autônomo Estadual ou do Distrito Federal', representante: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '118-0', descricao: 'Órgão Público Autônomo Municipal', representante: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '119-8', descricao: 'Comissão Polinacional', representante: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '120-1', descricao: 'Fundo Público', representante: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '121-0', descricao: 'Associação Pública', representante: ['Presidente'], qualificacao: ['16'] },
    { tipo: 'Entidades Empresariais', codigo: '201-1', descricao: 'Empresa Pública', representante: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '203-8', descricao: 'Sociedade de Economia Mista', representante: ['Diretor', 'Presidente'], qualificacao: ['10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '204-6', descricao: 'Sociedade Anônima Aberta', representante: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '205-4', descricao: 'Sociedade Anônima Fechada', representante: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '206-2', descricao: 'Sociedade Empresária Limitada', representante: ['Administrador', 'Sócio-Administrador'], qualificacao: ['05', '49'] },
    { tipo: 'Entidades Empresariais', codigo: '207-0', descricao: 'Sociedade Empresária em Nome Coletivo', representante: ['Sócio-Administrador'], qualificacao: ['49'] },
    { tipo: 'Entidades Empresariais', codigo: '208-9', descricao: 'Sociedade Empresária em Comandita Simples', representante: ['Sócio Comanditado'], qualificacao: ['24'] },
    { tipo: 'Entidades Empresariais', codigo: '209-7', descricao: 'Sociedade Empresária em Comandita por Ações', representante: ['Diretor', 'Presidente'], qualificacao: ['10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '212-7', descricao: 'Sociedade em Conta de Participação', representante: ['Procurador', 'Sócio Ostensivo'], qualificacao: ['17', '31'] },
    { tipo: 'Entidades Empresariais', codigo: '213-5', descricao: 'Empresário (Individual)', representante: ['Empresário'], qualificacao: ['50'] },
    { tipo: 'Entidades Empresariais', codigo: '214-3', descricao: 'Cooperativa', representante: ['Diretor', 'Presidente'], qualificacao: ['10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '215-1', descricao: 'Consórcio de Sociedades', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Empresariais', codigo: '216-0', descricao: 'Grupo de Sociedades', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Empresariais', codigo: '217-8', descricao: 'Estabelecimento, no Brasil, de Sociedade Estrangeira', representante: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Empresariais', codigo: '219-4', descricao: 'Estabelecimento, no Brasil, de Empresa Binacional Argentino-Brasileira', representante: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Empresariais', codigo: '221-6', descricao: 'Empresa Domiciliada no Exterior', representante: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Empresariais', codigo: '222-4', descricao: 'Clube/Fundo de Investimento', representante: ['Responsável'], qualificacao: ['43'] },
    { tipo: 'Entidades Empresariais', codigo: '223-2', descricao: 'Sociedade Simples Pura', representante: ['Administrador', 'Sócio-Administrador'], qualificacao: ['05', '49'] },
    { tipo: 'Entidades Empresariais', codigo: '224-0', descricao: 'Sociedade Simples Limitada', representante: ['Administrador', 'Sócio-Administrador'], qualificacao: ['05', '49'] },
    { tipo: 'Entidades Empresariais', codigo: '225-9', descricao: 'Sociedade Simples em Nome Coletivo', representante: ['Sócio-Administrador'], qualificacao: ['49'] },
    { tipo: 'Entidades Empresariais', codigo: '226-7', descricao: 'Sociedade Simples em Comandita Simples', representante: ['Sócio Comanditado'], qualificacao: ['24'] },
    { tipo: 'Entidades Empresariais', codigo: '227-5', descricao: 'Empresa Binacional', representante: ['Diretor'], qualificacao: ['10'] },
    { tipo: 'Entidades Empresariais', codigo: '228-3', descricao: 'Consórcio de Empregadores', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Empresariais', codigo: '229-1', descricao: 'Consórcio Simples', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Empresariais', codigo: '230-5', descricao: 'Empresa Individual de Responsabilidade Limitada (de Natureza Empresária)', representante: ['Administrador', 'Procurador', 'Titular Pessoa Física Residente ou Domiciliado no Brasil'], qualificacao: ['05', '17', '65'] },
    { tipo: 'Entidades Empresariais', codigo: '231-3', descricao: 'Empresa Individual de Responsabilidade Limitada (de Natureza Simples)', representante: ['Administrador', 'Procurador', 'Titular Pessoa Física Residente ou Domiciliado no Brasil'], qualificacao: ['05', '17', '65'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '303-4', descricao: 'Serviço Notarial e Registral (Cartório)', representante: ['Tabelião ou Oficial de Registro'], qualificacao: ['32', '42'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '306-9', descricao: 'Fundação Privada', representante: ['Administrador', 'Diretor', 'Presidente', 'Fundador'], qualificacao: ['05', '10', '16', '54'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '307-7', descricao: 'Serviço Social Autônomo', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '308-5', descricao: 'Condomínio Edilício', representante: ['Administrador ou Síndico (Condomínio)'], qualificacao: ['05', '19'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '310-7', descricao: 'Comissão de Conciliação Prévia', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '311-5', descricao: 'Entidade de Mediação e Arbitragem', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '312-3', descricao: 'Partido Político', representante: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '313-1', descricao: 'Entidade Sindical', representante: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '320-4', descricao: 'Estabelecimento, no Brasil, de Fundação ou Associação Estrangeiras', representante: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '321-2', descricao: 'Fundação ou Associação domiciliada no exterior', representante: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '322-0', descricao: 'Organização Religiosa', representante: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '323-9', descricao: 'Comunidade Indígena', representante: ['Responsável Indígena'], qualificacao: ['61'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '324-7', descricao: 'Fundo Privado', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '399-9', descricao: 'Associação Privada', representante: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Pessoas Físicas', codigo: '401-4', descricao: 'Empresa Individual Imobiliária', representante: ['Titular'], qualificacao: ['34'] },
    { tipo: 'Pessoas Físicas', codigo: '408-1', descricao: 'Contribuinte Individual', representante: ['Produtor Rural'], qualificacao: ['59'] },
    { tipo: 'Pessoas Físicas', codigo: '409-0', descricao: 'Candidato a Cargo Político Eletivo', representante: ['Candidato a Cargo Político Eletivo'], qualificacao: ['51'] },
    { tipo: 'Instituições Extraterritoriais', codigo: '501-0', descricao: 'Organização Internacional', representante: ['Representante de Organização Internacional'], qualificacao: ['41'] },
    { tipo: 'Instituições Extraterritoriais', codigo: '502-9', descricao: 'Representação Diplomática Estrangeira', representante: ['Diplomata', 'Cônsul', 'Ministro de Estado das Relações Exteriores', 'Cônsul Honorário'], qualificacao: ['39', '40', '46', '60'] },
    { tipo: 'Instituições Extraterritoriais', codigo: '503-7', descricao: 'Outras Instituições Extraterritoriais', representante: ['Representante da Instituição Extraterritorial'], qualificacao: ['62'] }
];

var siglasDosEstados = [
    'RO', 'AC', 'AM',
    'RR', 'PA', 'AP',
    'TO', 'MA', 'PI', 
    'CE', 'RN', 'PB',
    'PE', 'AL', 'SE',
    'BA', 'MG', 'ES',
    'RJ', 'SP', 'PR',
    'SC', 'RS', 'MS',
    'MT', 'GO', 'DF'
];

var tabelaIbgeDeEstados = [
    { codigo: 11, regiao: 'Norte', nome: 'Rondônia', abreviacao: 'RO' },
    { codigo: 12, regiao: 'Norte', nome: 'Acre', abreviacao: 'AC' },
    { codigo: 13, regiao: 'Norte', nome: 'Amazonas', abreviacao: 'AM' },
    { codigo: 14, regiao: 'Norte', nome: 'Roraima', abreviacao: 'RR' },
    { codigo: 15, regiao: 'Norte', nome: 'Pará', abreviacao: 'PA' },
    { codigo: 16, regiao: 'Norte', nome: 'Amapá', abreviacao: 'AP' },
    { codigo: 17, regiao: 'Norte', nome: 'Tocantins', abreviacao: 'TO' },
    { codigo: 21, regiao: 'Nordeste', nome: 'Maranhão', abreviacao: 'MA' },
    { codigo: 22, regiao: 'Nordeste', nome: 'Piauí', abreviacao: 'PI' },
    { codigo: 23, regiao: 'Nordeste', nome: 'Ceará', abreviacao: 'CE' },
    { codigo: 24, regiao: 'Nordeste', nome: 'Rio Grande do Norte', abreviacao: 'RN' },
    { codigo: 25, regiao: 'Nordeste', nome: 'Paraíba', abreviacao: 'PB' },
    { codigo: 26, regiao: 'Nordeste', nome: 'Pernambuco', abreviacao: 'PE' },
    { codigo: 27, regiao: 'Nordeste', nome: 'Alagoas', abreviacao: 'AL' },
    { codigo: 28, regiao: 'Nordeste', nome: 'Sergipe', abreviacao: 'SE' },
    { codigo: 29, regiao: 'Nordeste', nome: 'Bahia', abreviacao: 'BA' },
    { codigo: 31, regiao: 'Sudeste', nome: 'Minas Gerais', abreviacao: 'MG' },
    { codigo: 32, regiao: 'Sudeste', nome: 'Espírito Santo', abreviacao: 'ES' },
    { codigo: 33, regiao: 'Sudeste', nome: 'Rio de Janeiro', abreviacao: 'RJ' },
    { codigo: 35, regiao: 'Sudeste', nome: 'São Paulo', abreviacao: 'SP' },
    { codigo: 41, regiao: 'Sul', nome: 'Paraná', abreviacao: 'PR' },
    { codigo: 42, regiao: 'Sul', nome: 'Santa Catarina', abreviacao: 'SC' },
    { codigo: 43, regiao: 'Sul', nome: 'Rio Grande do Sul', abreviacao: 'RS' },
    { codigo: 50, regiao: 'Centro-Oeste', nome: 'Mato Grosso do Sul', abreviacao: 'MS' },
    { codigo: 51, regiao: 'Centro-Oeste', nome: 'Mato Grosso', abreviacao: 'MT' },
    { codigo: 52, regiao: 'Centro-Oeste', nome: 'Goiás', abreviacao: 'GO' },
    { codigo: 53, regiao: 'Centro-Oeste', nome: 'Distrito Federal', abreviacao: 'DF' }
];

module.exports.obterEstadosPorRegiao = function(regiao){
    var estados = [];
    tabelaIbgeDeEstados.forEach(function(estado){
        if(estado.regiao.toLowerCase() === regiao.toLowerCase()) 
            estados.push(estado);
    });
    
    return estados;
};

module.exports.obterEstado = obterEstado;
function obterEstado(id){
    if(typeof id === 'number' || !isNaN(parseInt(id, 10))){
        id = parseInt(id, 10);
        for(var estado in tabelaIbgeDeEstados){
            if(tabelaIbgeDeEstados.hasOwnProperty(estado)){
                estado = tabelaIbgeDeEstados[estado];
                if(estado.codigo === id)
                    return estado;
            };
        }
    }
    else if(typeof id === 'string'){
        for(var estado in tabelaIbgeDeEstados){
            if(tabelaIbgeDeEstados.hasOwnProperty(estado)){
                estado = tabelaIbgeDeEstados[estado];
                if(estado.nome.toLowerCase() === id.toLowerCase() || estado.abreviacao.toLowerCase() === id.toLowerCase())
                    return estado;
            };
        }
    }
    
    return null;
};

module.exports.naturezasJuridicas = naturezasJuridicas;
module.exports.siglasDosEstados = siglasDosEstados;
module.exports.tabelaIbgeDeEstados = tabelaIbgeDeEstados;