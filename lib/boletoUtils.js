//Este submodulo de boletos é inspirado no Stella-Boletos, da Caelum
//https://github.com/caelum/caelum-stella
var gammautils = require('gammautils'),
	pad = gammautils.string.pad;

var Pagador = (function() {
	function Pagador() {

	}

	Pagador.prototype.getNome = function() {
		return this._nome;
	}

	Pagador.prototype.comNome = function(_nome) {
		this._nome = _nome;
		return this;
	}

	Pagador.prototype.getDocumento = function() {
		return this._documento;
	}

	Pagador.prototype.comDocumento = function(_documento) {
		this._documento = _documento;
		return this;
	}

	Pagador.prototype.getEndereco = function() {
		return this._endereco;
	}

	Pagador.prototype.comEndereco = function(_endereco) {
		this._endereco = _endereco;
		return this;
	}

	Pagador.novoPagador = function() {
		return new Pagador().comEndereco(Endereco.novoEndereco());
	}

	return Pagador;
})();

module.exports.Pagador = Pagador;

var Beneficiario = (function() {
	function Beneficiario() {

	}

	Beneficiario.prototype.getAgencia = function() {
		return this._agencia;
	}

	Beneficiario.prototype.comAgencia = function(_agencia) {
		this._agencia = _agencia;
		return this;
	}

	Beneficiario.prototype.getDigitoAgencia = function() {
		return this._digitoAgencia;
	}

	Beneficiario.prototype.comDigitoAgencia = function(_digitoAgencia) {
		this._digitoAgencia = _digitoAgencia;
		return this;
	}

	Beneficiario.prototype.getContaCorrente = function() {
		return this._codigo;
	}

	Beneficiario.prototype.getCodigo = function() {
		return this._codigo;
	}

	Beneficiario.prototype.comContaCorrente = function(_codigo) {
		//É um alias para código
		this._codigo = _codigo;
		return this;
	}

	Beneficiario.prototype.comCodigo = function(_codigo) {
		this._codigo = _codigo;
		return this;
	}

	Beneficiario.prototype.getDigitoCodigoBeneficiario = function() {
		return this._digitoCodigoBeneficiario;
	}

	Beneficiario.prototype.comDigitoCodigoBeneficiario = function(_digitoCodigoBeneficiario) {
		this._digitoCodigoBeneficiario = _digitoCodigoBeneficiario;
		return this;
	}

	Beneficiario.prototype.getCarteira = function() {
		return this._carteira;
	}

	Beneficiario.prototype.comCarteira = function(_carteira) {
		this._carteira = _carteira;
		return this;
	}

	Beneficiario.prototype.getNossoNumero = function() {
		return this._nossoNumero;
	}

	Beneficiario.prototype.comNossoNumero = function(_nossoNumero) {
		this._nossoNumero = _nossoNumero;
		return this;
	}

	Beneficiario.prototype.getDigitoNossoNumero = function() {
		return this._digitoNossoNumero;
	}

	Beneficiario.prototype.comDigitoNossoNumero = function(_digitoNossoNumero) {
		this._digitoNossoNumero = _digitoNossoNumero;
		return this;
	}

	Beneficiario.prototype.getNome = function() {
		return this._nome;
	}

	Beneficiario.prototype.comNome = function(_nomeBeneficiario) {
		this._nome = _nomeBeneficiario;
		return this;
	}

	Beneficiario.prototype.getEndereco = function() {
		return this._endereco;
	}

	Beneficiario.prototype.comEndereco = function(_endereco) {
		this._endereco = _endereco;
		return this;
	}

	Beneficiario.prototype.getNumeroConvenio = function() {
		return this._numeroConvenio;
	}

	Beneficiario.prototype.comNumeroConvenio = function(_numeroConvenio) {
		this._numeroConvenio = _numeroConvenio;
		return this;
	}

	Beneficiario.prototype.getDocumento = function() {
		return this._documento;
	}

	Beneficiario.prototype.comDocumento = function(_documento) {
		this._documento = _documento;
		return this;
	}

	Beneficiario.prototype.novoBeneficiario = function() {
		return new Beneficiario().comEndereco(Endereco.novoEndereco());
	}

	Beneficiario.novoBeneficiario = function() {
		return new Beneficiario();
	}

	return Beneficiario;
})();

module.exports.Beneficiario = Beneficiario;

var Datas = (function() {
	function removerHoras(data) {
		data.setHours(0);
		data.setMinutes(0);
		data.setSeconds(0);
		data.setMilliseconds(0);

		return data;
	}

	function validarData(data) {
		var ano = data.getFullYear();
		return ano >= 1997 && ano < 2024;
	}

	function Datas() {

	}

	Datas.prototype.comDocumento = function(_documento) {
		if(arguments.length > 1) {
			_documento = new Date(arguments[2], arguments[1] - 1, arguments[0]);
		}

		if(!validarData(_documento)) {
			throw new Error('O ano do documento deve ser maior que 1997 e menor que 2024');
		}

		this._documento = removerHoras(_documento);
		return this;
	}

	Datas.prototype.getDocumento = function() {
		if(!this._documento) {
			this.comDocumento(new Date());
		}

		return this._documento;
	}

	Datas.prototype.comProcessamento = function(_processamento) {
		if(arguments.length > 1) {
			_processamento = new Date(arguments[2], arguments[1] - 1, arguments[0]);
		}

		if(!validarData(_processamento)) {
			throw new Error('O ano do documento deve ser maior que 1997 e menor que 2024');
		}

		this._processamento = removerHoras(_processamento);
		return this;
	}

	Datas.prototype.getProcessamento = function() {
		if(!this._processamento) {
			this.comProcessamento(new Date());
		}

		return this._processamento;
	}

	Datas.prototype.comVencimento = function(_vencimento) {
		if(arguments.length > 1) {
			_vencimento = new Date(arguments[2], arguments[1] - 1, arguments[0]);
		}

		if(!validarData(_vencimento)) {
			throw new Error('O ano do documento deve ser maior que 1997 e menor que 2024');
		}

		this._vencimento = removerHoras(_vencimento);
		return this;
	}

	Datas.prototype.getVencimento = function() {
		if(!this._vencimento) {
			this.comVencimento(new Date());
		}

		return this._vencimento;
	}

	Datas.novasDatas = function() {
		return new Datas();
	}

	return Datas;
})();

module.exports.Datas = Datas;

var Endereco = (function() {
	function Endereco() {

	}

	Endereco.prototype.getLogradouro = function() {
		return this._logradouro || '';
	}

	Endereco.prototype.comLogradouro = function(_logradouro) {
		this._logradouro = _logradouro;
		return this;
	}

	Endereco.prototype.getBairro = function() {
		return this._bairro || '';
	}

	Endereco.prototype.comBairro = function(_bairro) {
		this._bairro = _bairro;
		return this;
	}

	Endereco.prototype.getCep = function() {
		return this._cep || '';
	}

	Endereco.prototype.comCep = function(_cep) {
		this._cep = _cep;
		return this;
	}

	Endereco.prototype.getCidade = function() {
		return this._cidade || '';
	}

	Endereco.prototype.comCidade = function(_cidade) {
		this._cidade = _cidade;
		return this;
	}

	Endereco.prototype.getUf = function() {
		return this._uf || '';
	}

	Endereco.prototype.comUf = function(_uf) {
		this._uf = _uf;
		return this;
	}

	Endereco.prototype.getEnderecoCompleto = function() {
		var enderecoCompleto = [];

		this.getLogradouro() && enderecoCompleto.push(this.getLogradouro());
		this.getBairro() && enderecoCompleto.push(this.getBairro());
		this.getCep() && enderecoCompleto.push(this.getCep());
		this.getCidade() && enderecoCompleto.push(this.getCidade());
		this.getUf() && enderecoCompleto.push(this.getUf());

		return enderecoCompleto.join(' ');
	}

	Endereco.novoEndereco = function() {
		return new Endereco();
	}

	return Endereco;
})();

module.exports.Endereco = Endereco;

var Boleto = (function() {
	var DATA_BASE = new Date(1997, 10 - 1, 7);

	function Boleto() {

	}

	Boleto.prototype.getFatorVencimento = function() {
		var vencimento = this.getDatas().getVencimento(),
			diferencaEmDias = (vencimento - DATA_BASE) / (1000 * 60 * 60 * 24);

		if(diferencaEmDias > 9999) {
			throw new Error('Data fora do formato aceito');
		}

		return Math.floor(diferencaEmDias).toString();
	}

	Boleto.prototype.comEspecieMoeda = function(_especieMoeda) {
		this._especieMoeda = _especieMoeda;
		return this;
	}

	Boleto.prototype.getEspecieMoeda = function() {
		return this._especieMoeda;
	}

	Boleto.prototype.getCodigoEspecieMoeda = function() {
		return this._codigoEspecieMoeda;
	}

	Boleto.prototype.comCodigoEspecieMoeda = function(_codigoEspecieMoeda) {
		this._codigoEspecieMoeda = _codigoEspecieMoeda;
		return this;
	}

	Boleto.prototype.getAceite = function() {
		return this._aceite;
	}

	Boleto.prototype.comAceite = function(_aceite) {
		this._aceite = _aceite;
		return this;
	}

	Boleto.prototype.getEspecieDocumento = function() {
		return this._especieDocumento;
	}

	Boleto.prototype.comEspecieDocumento = function(_especieDocumento) {
		this._especieDocumento = _especieDocumento;
		return this;
	}

	Boleto.prototype.getDatas = function() {
		return this._datas;
	}

	Boleto.prototype.comDatas = function(_datas) {
		this._datas = _datas;
		return this;
	}

	Boleto.prototype.getValorFormatado = function() {
		var valor = this._valorBoleto.toString().split('.'),
			inteiros = valor[0],
			decimais = valor.length > 1 ? valor[1] : '00';

		decimais = pad(decimais, 2, '0', 'right').substr(0, 2);

		return pad(inteiros + decimais, 10, '0');
	}

	Boleto.prototype.getValorBoleto = function() {
		return this._valorBoleto;
	}

	Boleto.prototype.comValorBoleto = function(_valorBoleto) {
		if(_valorBoleto < 0) {
			throw new Error('Valor deve ser maior ou igual a zero');
		}

		this._valorBoleto = _valorBoleto;
		return this;
	}

	Boleto.prototype.getNumeroDoDocumentoFormatado = function() {
		return pad(this._numeroDoDocumento || '', 4, '0');
	}

	Boleto.prototype.getNumeroDoDocumento = function() {
		return this._numeroDoDocumento || '';
	}

	Boleto.prototype.comNumeroDoDocumento = function(_numeroDoDocumento) {
		this._numeroDoDocumento = _numeroDoDocumento;
		return this;
	}

	Boleto.prototype.getInstrucoes = function() {
		return this._instrucoes || [];
	}

	Boleto.prototype.comInstrucoes = function(_instrucoes) {
		if(arguments.length > 1) {
			_instrucoes = Array.prototype.slice.call(arguments, 0);
		}

		if(typeof _instrucoes === 'string') {
			_instrucoes = [_instrucoes];
		}

		if(_instrucoes.length > 5) {
			throw new Error('Máximo de cinco instruções permitidas');
		}

		this._instrucoes = _instrucoes;
		return this;
	}

	Boleto.prototype.getDescricoes = function() {
		return this._descricoes || [];
	}

	Boleto.prototype.comDescricoes = function(_descricoes) {
		if(arguments.length > 1) {
			_descricoes = Array.prototype.slice.call(arguments, 0);
		}

		if(typeof _descricoes === 'string') {
			_descricoes = [_descricoes];
		}

		if(_descricoes.length > 5) {
			throw new Error('Máximo de cinco instruções permitidas');
		}

		this._descricoes = _descricoes;
		return this;
	},

	Boleto.prototype.getLocaisDePagamento = function() {
		return this._locaisDePagamento || [];
	}

	Boleto.prototype.comLocaisDepagamento = function(_locaisDePagamento) {
		if(arguments.length > 1) {
			_locaisDePagamento = Array.prototype.slice.call(arguments, 0);
		}

		if(typeof _locaisDePagamento === 'string') {
			_locaisDePagamento = [_locaisDePagamento];
		}

		if(_locaisDePagamento.length > 2) {
			throw new Error('Máximo de dois locais de pagamento permitidos');
		}

		this._locaisDePagamento = _locaisDePagamento;
		return this;
	}

	Boleto.prototype.getQuantidadeDeMoeda = function() {
		return this._quantidadeDeMoeda;
	}

	Boleto.prototype.comQuantidadeDeMoeda = function(_quantidadeDeMoeda) {
		this._quantidadeDeMoeda = _quantidadeDeMoeda;
		return this;
	}

	Boleto.prototype.getBanco = function() {
		return this._banco;
	}

	Boleto.prototype.comBanco = function(_banco) {
		this._banco = _banco;
		return this;
	}

	Boleto.prototype.getPagador = function() {
		return this._pagador;
	}

	Boleto.prototype.comPagador = function(_pagador) {
		this._pagador = _pagador;
		return this;
	}

	Boleto.prototype.getBeneficiario = function() {
		return this._beneficiario;
	}

	Boleto.prototype.comBeneficiario = function(_beneficiario) {
		this._beneficiario = _beneficiario;
		return this;
	}

	Boleto.prototype.getValorDescontos = function() {
		return this._valorDescontos || 0;
	}

	Boleto.prototype.comValorDescontos = function(_valorDescontos) {
		this._valorDescontos = _valorDescontos;
		return this;
	}

	Boleto.prototype.getValorDeducoes = function() {
		return this._valorDeducoes || 0;
	}

	Boleto.prototype.comValorDeducoes = function(_valorDeducoes) {
		this._valorDeducoes = _valorDeducoes;
		return this;
	}

	Boleto.prototype.getValorMulta = function() {
		return this._valorMulta || 0;
	}

	Boleto.prototype.comValorMulta = function(_valorMulta) {
		this._valorMulta = _valorMulta;
		return this;
	}

	Boleto.prototype.getValorAcrescimos = function() {
		return this._valorAcrescimos || 0;
	}

	Boleto.prototype.comValorAcrescimos = function(_valorAcrescimos) {
		this._valorAcrescimos = _valorAcrescimos;
		return this;
	}

	Boleto.novoBoleto = function() {
		return new Boleto()
					.comEspecieMoeda('R$')
					.comCodigoEspecieMoeda(9)
					.comAceite(false)
					.comEspecieDocumento('DV');
	}

	return Boleto;
})();

module.exports.Boleto = Boleto;