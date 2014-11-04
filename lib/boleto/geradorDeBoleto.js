var path = require('path'),
	fs = require('fs'),
	EOL = require('os').EOL,

	gammautils = require('gammautils'),
	generateGuid = gammautils.string.generateGuid,
	merge = gammautils.object.merge,
	Pdf = require('pdfkit'),

	geradorDeLinhaDigitavel = require('./geradorDeLinhaDigitavel'),

	diretorioDeFontes = path.join(__dirname, '/fontes'),
	timesNewRoman = path.join(diretorioDeFontes, 'Times New Roman.ttf'),
	timesNewRomanNegrito = path.join(diretorioDeFontes, 'Times New Roman Bold.ttf'),
	timesNewRomanItalico = path.join(diretorioDeFontes, 'Times New Roman Italic.ttf'),
	timesNewRomanNegritoItalico = path.join(diretorioDeFontes, 'Times New Roman Bold Italic.ttf'),
	code25I = path.join(diretorioDeFontes, 'Code25I.ttf');

var GeradorDeBoleto = (function() {
	function GeradorDeBoleto(boletos) {
		if(!Array.isArray(boletos)) {
			boletos = [boletos];
		}

		this._boletos = boletos;
	}

	var pdfDefaults = {
		ajusteY: 0,
		ajusteX: 0,
		autor: '',
		titulo: '',
		criador: '',
		tamanhoDaFonteDoTitulo: 8,
		tamanhoDaFonte: 10,
		tamanhoDaLinhaDigitavel: 14,
		tamanhoDoCodigoDeBarras: 26,
		imprimirSequenciaDoBoleto: true,
		corDoLayout: 'black',
		alturaDaPagina: 595.44,
		larguraDaPagina: 841.68,
		creditos: 'Gammasoft Desenvolvimento de Software Ltda - http://www.gammasoft.com.br',
		template: path.join(__dirname, '/templates/template.pdf')
	};

	GeradorDeBoleto.prototype.gerarPDF = function(args, callback) {
		if(typeof args === 'function') {
			callback = args;
			args = pdfDefaults;
		}

		args = merge(pdfDefaults, args);

		var boletos = this._boletos,
			pdf = new Pdf({
				size: [
					args.alturaDaPagina,
					args.larguraDaPagina
				],
				info: {
					Author: args.autor,
					Title: args.titulo,
					Creator: args.criador,
					Producer: 'http://opensource.gammasoft.com.br/brasil'
				}
			});

		if(args.stream) {
			pdf.pipe(args.stream);
		}

		pdf.registerFont('normal', timesNewRoman);
		pdf.registerFont('negrito', timesNewRomanNegrito);
		pdf.registerFont('italico', timesNewRomanItalico);
		pdf.registerFont('negrito-italico', timesNewRomanNegritoItalico);
		pdf.registerFont('codigoDeBarras', code25I);

		boletos.forEach(function escreveOsDadosDoBoleto(boleto, indice) {
			//IMPRIMIR LAYOUT
			var espacoEntreLinhas = 23;

			var linha1 = 131;
			pdf.moveTo(27, linha1)
			    .lineTo(572, linha1)
			    .stroke(args.corDoLayout);

			var linha2 = linha1 + espacoEntreLinhas;
			pdf.moveTo(27, linha2)
			    .lineTo(572, linha2)
			    .stroke(args.corDoLayout);

			var linha3 = linha2 + espacoEntreLinhas;
			pdf.moveTo(27, linha3)
			    .lineTo(329, linha3)
			    .stroke(args.corDoLayout);

			var coluna1 = 27;
			pdf.moveTo(coluna1, linha1 - 0.5)
			    .lineTo(coluna1, linha3 + 0.5)
			    .stroke(args.corDoLayout);

			var coluna2 = 329;
			pdf.moveTo(coluna2, linha1)
			    .lineTo(coluna2, linha3 + 0.5)
			    .stroke(args.corDoLayout);

			var coluna3 = 178;
			pdf.moveTo(coluna3, linha2)
			    .lineTo(coluna3, linha3)
			    .stroke(args.corDoLayout);

			var coluna4 = 420;
			pdf.moveTo(coluna4, linha1)
			    .lineTo(coluna4, linha2)
			    .stroke(args.corDoLayout);

			var coluna5 = 572;
			pdf.moveTo(coluna5, linha1 - 0.5)
			    .lineTo(coluna5, linha2 + 0.5)
			    .stroke(args.corDoLayout);

			var coluna6 = coluna2 + 4;
			pdf.moveTo(coluna6, linha2 + 3.5)
			    .lineTo(coluna6, linha3 + 0.5)
			    .stroke(args.corDoLayout);

			var coluna7 = coluna5;
			pdf.moveTo(coluna7, linha2 + 3.5)
			    .lineTo(coluna7, linha3 + 0.5)
			    .stroke(args.corDoLayout);

			var linha4 = linha2 + 4;
			pdf.moveTo(coluna6, linha4)
			    .lineTo(coluna7, linha4)
			    .stroke(args.corDoLayout);

			//////////////////

			var margemDoSegundoBloco = 30,
				margemDoSegundoBlocoLayout = margemDoSegundoBloco - 4;

			var linha21 = 241;
			pdf.moveTo(margemDoSegundoBlocoLayout, linha21)
			    .lineTo(571, linha21)
			    .stroke(args.corDoLayout);

			var linha22 = linha21 + espacoEntreLinhas + 8;
			pdf.moveTo(margemDoSegundoBlocoLayout, linha22)
			    .lineTo(571, linha22)
			    .stroke(args.corDoLayout);

			var linha23 = linha22 + espacoEntreLinhas;
			pdf.moveTo(margemDoSegundoBlocoLayout, linha23)
			    .lineTo(571, linha23)
			    .stroke(args.corDoLayout);

			var linha24 = linha23 + espacoEntreLinhas;
			pdf.moveTo(margemDoSegundoBlocoLayout, linha24)
			    .lineTo(571, linha24)
			    .stroke(args.corDoLayout);

			var linha25 = linha24 + espacoEntreLinhas;
			pdf.moveTo(margemDoSegundoBlocoLayout, linha25)
			    .lineTo(571, linha25)
			    .stroke(args.corDoLayout);

		    var camposLaterais = 434,
				linha26 = linha25 + espacoEntreLinhas;

			pdf.moveTo(camposLaterais, linha26)
			    .lineTo(571, linha26)
			    .stroke(args.corDoLayout);

		    var linha27 = linha26 + espacoEntreLinhas;
			pdf.moveTo(camposLaterais, linha27)
			    .lineTo(571, linha27)
			    .stroke(args.corDoLayout);

		    var linha28 = linha27 + espacoEntreLinhas;
			pdf.moveTo(camposLaterais, linha28)
			    .lineTo(571, linha28)
			    .stroke(args.corDoLayout);

		    var linha28_2 = linha28 + 12.4;
			pdf.moveTo(margemDoSegundoBlocoLayout, linha28_2)
			    .lineTo(camposLaterais, linha28_2)
			    .stroke(args.corDoLayout);

		    var linha29 = linha28 + espacoEntreLinhas;
			pdf.moveTo(camposLaterais, linha29)
			    .lineTo(571, linha29)
			    .stroke(args.corDoLayout);

		    var linha211 = linha29 + espacoEntreLinhas + 0.4;
			pdf.moveTo(margemDoSegundoBlocoLayout, linha211)
			    .lineTo(571, linha211)
			    .stroke(args.corDoLayout);

		    var linha212 = linha211 + 56.6;
			pdf.moveTo(margemDoSegundoBlocoLayout, linha212)
			    .lineTo(571, linha212)
			    .stroke(args.corDoLayout);

			var coluna21 = margemDoSegundoBlocoLayout + 0.5;
			pdf.moveTo(coluna21, linha21)
			    .lineTo(coluna21, linha212)
			    .stroke(args.corDoLayout);

			var coluna22 = 571 - 0.5;
			pdf.moveTo(coluna22, linha21)
			    .lineTo(coluna22, linha212)
			    .stroke(args.corDoLayout);

			var coluna23 = camposLaterais;
			pdf.moveTo(coluna23, linha21)
			    .lineTo(coluna23, linha211)
			    .stroke(args.corDoLayout);

			var coluna24 = 93.5;
			pdf.moveTo(coluna24, linha23)
			    .lineTo(coluna24, linha24)
			    .stroke(args.corDoLayout);

			var coluna25 = coluna24 + 92.5;
			pdf.moveTo(coluna25, linha23)
			    .lineTo(coluna25, linha24)
			    .stroke(args.corDoLayout);

			var coluna26 = coluna25 + 84.5;
			pdf.moveTo(coluna26, linha23)
			    .lineTo(coluna26, linha24)
			    .stroke(args.corDoLayout);

			var coluna27 = coluna26 + 61;
			pdf.moveTo(coluna27, linha23)
			    .lineTo(coluna27, linha24)
			    .stroke(args.corDoLayout);

			var coluna28 = margemDoSegundoBlocoLayout + 106;
			pdf.moveTo(coluna28, linha24)
			    .lineTo(coluna28, linha25)
			    .stroke(args.corDoLayout);

			var coluna29 = coluna28 + 76.5;
			pdf.moveTo(coluna29, linha24)
			    .lineTo(coluna29, linha25)
			    .stroke(args.corDoLayout);

			var coluna210 = coluna29 + 77;
			pdf.moveTo(coluna210, linha24)
			    .lineTo(coluna210, linha25)
			    .stroke(args.corDoLayout);

			var coluna211 = coluna210 + 92;
			pdf.moveTo(coluna211, linha24)
			    .lineTo(coluna211, linha25)
			    .stroke(args.corDoLayout);

			var coluna212 = 154;
			pdf.moveTo(coluna212, 217.5)
			    .lineTo(coluna212, linha21)
			    .stroke(args.corDoLayout);

			var coluna213 = coluna212 + 1;
			pdf.moveTo(coluna213, 217.5)
			    .lineTo(coluna213, linha21)
			    .stroke(args.corDoLayout);

			var coluna214 = coluna213 + 1;
			pdf.moveTo(coluna214, 217.5)
			    .lineTo(coluna214, linha21)
			    .stroke(args.corDoLayout);

			var coluna215 = coluna214 + 41.5;
			pdf.moveTo(coluna215, 217.5)
			    .lineTo(coluna215, linha21)
			    .stroke(args.corDoLayout);

			var coluna216 = coluna215 + 1;
			pdf.moveTo(coluna216, 217.5)
			    .lineTo(coluna216, linha21)
			    .stroke(args.corDoLayout);

			var coluna217 = coluna216 + 1;
			pdf.moveTo(coluna217, 217.5)
			    .lineTo(coluna217, linha21)
			    .stroke(args.corDoLayout);

			var linhaSeparadora = 199;
			pdf.moveTo(27, linhaSeparadora)
			    .lineTo(572, linhaSeparadora)
			    .dash(3, { space: 5 })
			    .stroke(args.corDoLayout);

			var caminhoParaTesoura = path.join(__dirname, 'imagens/tesoura128.png');
			pdf.image(caminhoParaTesoura, margemDoSegundoBlocoLayout, 195.7, {
				width: 10
			});

			///IMPRIMIR LAYOUT

			var banco = boleto.getBanco(),
				pagador = boleto.getPagador(),
				beneficiario = boleto.getBeneficiario(),
				datas = boleto.getDatas();

			var zeroLinha = 105;

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('BENEFICIÁRIO:', 27, zeroLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(beneficiario.getIdentificacao().toUpperCase(), 27, zeroLinha + args.tamanhoDaFonte + 1.5, {
					lineBreak: false,
					width: 545,
					align: 'left'
				});

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('RECIBO DO PAGADOR', 278, zeroLinha, {
					lineBreak: false,
					width: 294,
					align: 'right'
				});

			var primeiraLinha = 142,
				diferencaEntreTituloEValor = 10,
				tituloDaPrimeiraLinha = primeiraLinha - diferencaEntreTituloEValor;

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Nome do Cliente', 32, tituloDaPrimeiraLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(pagador.getNome(), 32, primeiraLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			//pdf.rect(32, 242, 294, 8).fill('#CCCCCC');
			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Data de Vencimento', 332, tituloDaPrimeiraLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(datas.getVencimentoFormatado(), 332, primeiraLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Valor Cobrado', 424, tituloDaPrimeiraLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			//Acho que esse campo deve ficar em branco pois
			//varia de acordo com multa, desconto etc

			// pdf.font('normal')
			// 	.fontSize(args.tamanhoDaFonte)
			// 	.text(boleto.getValorFormatadoBRL(), 424, primeiraLinha, {
			// 		lineBreak: false,
			// 		width: 294,
			// 		align: 'left'
			// 	});

			var segundaLinha = primeiraLinha + espacoEntreLinhas,
				tituloDaSegundaLinha = segundaLinha - diferencaEntreTituloEValor;

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Agência / Código do Beneficiário', 32, tituloDaSegundaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(banco.getAgenciaECodigoBeneficiario(boleto), 32, segundaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Nosso Número', 181, tituloDaSegundaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(beneficiario.getNossoNumero(), 181, segundaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(7)
				.text('Autenticação Mecânica', 426, segundaLinha - 5, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			var segundaLinha2 = segundaLinha + 56,
				codigoDeBarras = banco.geraCodigoDeBarrasPara(boleto),
				linhaDigitavel = geradorDeLinhaDigitavel(codigoDeBarras, banco);

			var caminhoParaTesoura = path.join(__dirname, 'imagens/tesoura128.png');
			pdf.image(banco.getImagem(), margemDoSegundoBlocoLayout, segundaLinha2 - 5, {
				height: 23
			});

			banco.getImprimirNome() && pdf.font('negrito')
				.fontSize(args.tamanhoDaLinhaDigitavel)
				.text(banco.getNome(), margemDoSegundoBlocoLayout + 26, segundaLinha2, {
					lineBreak: false,
					width: 100,
					align: 'left'
				});

			pdf.font('negrito')
				.fontSize(args.tamanhoDaLinhaDigitavel)
				.text(banco.getNumeroFormatadoComDigito(), margemDoSegundoBlocoLayout + 133.5, segundaLinha2, {
					lineBreak: false,
					width: 50,
					align: 'left'
				});

			pdf.font('negrito')
				.fontSize(args.tamanhoDaLinhaDigitavel)
				.text(linhaDigitavel, margemDoSegundoBlocoLayout + 145, segundaLinha2, {
					lineBreak: false,
					width: 400,
					align: 'right'
				});

			function i25(text) { //extrair para o gammautils
			    if(text.length % 2 !== 0) {
			        throw new Error('Text must have an even number of characters');
			    }

			    var start = String.fromCharCode(201),
			        stop = String.fromCharCode(202);

			    return text.match(/.{2}/g).reduce(function(acc, part){
			      var value = parseInt(part, 10),
			          ascii;

			      if(value >= 0 && value <= 93) {
			          ascii = value + 33;
			      }

			      if(value >= 94 && value <= 99) {
			          ascii = value + 101;
			      }

			      return acc + String.fromCharCode(ascii);
			    }, start) + stop;
			}

			pdf.font('codigoDeBarras')
				.fontSize(args.tamanhoDoCodigoDeBarras)
				.text(i25(codigoDeBarras), margemDoSegundoBlocoLayout, linha212 + 3.5, {
					lineBreak: false,
					width: 310,
					align: 'left'
				});

			var terceiraLinha = segundaLinha + 95,
				tituloDaTerceiraLinha = terceiraLinha - diferencaEntreTituloEValor,
				tituloDaTerceiraLinhaLateral = terceiraLinha - diferencaEntreTituloEValor,
				colunaLateral = 440;

			var tituloLocalDoPagamento = margemDoSegundoBloco;
			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Local do Pagamento', tituloLocalDoPagamento, tituloDaTerceiraLinha - 7, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			boleto.getLocaisDePagamento().forEach(function(localDePagamento, indice) {
				if(indice > 1) {
					return;
				}

				pdf.font('normal')
					.fontSize(args.tamanhoDaFonteDoTitulo)
					.text(localDePagamento, margemDoSegundoBloco, (terceiraLinha + 2 - args.tamanhoDaFonte + (indice * args.tamanhoDaFonte)), {
						lineBreak: false,
						width: 400,
						align: 'left'
					});
			});

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Vencimento', colunaLateral, tituloDaTerceiraLinhaLateral - 7, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(datas.getVencimentoFormatado(), colunaLateral, terceiraLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			var quartaLinha = terceiraLinha + 24,
				tituloDaQuartaLinhaLateral = quartaLinha - diferencaEntreTituloEValor;

			var tituloBeneficiario = margemDoSegundoBloco;
			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Beneficiário', tituloBeneficiario, tituloDaQuartaLinhaLateral, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(beneficiario.getIdentificacao(), margemDoSegundoBloco, quartaLinha, {
					lineBreak: false,
					width: 400,
					align: 'left'
				});

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Agência / Código do Beneficiário', colunaLateral, tituloDaQuartaLinhaLateral, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(banco.getAgenciaECodigoBeneficiario(boleto), colunaLateral, quartaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			var quintaLinha = quartaLinha + espacoEntreLinhas,
				tituloDaQuintaLinha = quintaLinha - diferencaEntreTituloEValor,
				tituloDaQuintaLinhaLateral = quintaLinha - diferencaEntreTituloEValor;

			var tituloDataDocumento = margemDoSegundoBloco;
			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Data Documento', tituloDataDocumento, tituloDaQuintaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(datas.getDocumentoFormatado(), margemDoSegundoBloco, quintaLinha, {
					lineBreak: false,
					width: 61.5,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(boleto.getNumeroDoDocumentoFormatado(), margemDoSegundoBloco + 68, quintaLinha, {
					lineBreak: false,
					width: 84,
					align: 'left'
				});

			var tituloNumeroDoDocumento = tituloDataDocumento + 68;
			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Nº do Documento', tituloNumeroDoDocumento, tituloDaQuintaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			var tituloEspecieDoc = tituloNumeroDoDocumento + 90;
			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Espécie Doc.', tituloEspecieDoc, tituloDaQuintaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(boleto.getEspecieDocumento(), margemDoSegundoBloco + 68 + 90, quintaLinha, {
					lineBreak: false,
					width: 81,
					align: 'center'
				});

			var tituloAceite = tituloEspecieDoc + 86;
			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Aceite', tituloAceite, tituloDaQuintaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(boleto.getAceiteFormatado(), margemDoSegundoBloco + 68 + 90 + 86, quintaLinha, {
					lineBreak: false,
					width: 55,
					align: 'center'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(datas.getProcessamentoFormatado(), margemDoSegundoBloco + 68 + 90 + 86 + 61.5, quintaLinha, {
					lineBreak: false,
					width: 93.5,
					align: 'left'
				});

			var tituloDataProcessamento = tituloAceite + 61;
			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Data Processamento', tituloDataProcessamento, tituloDaQuintaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Nosso Número / Cód. do Documento', colunaLateral, tituloDaQuintaLinhaLateral, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(banco.getNossoNumeroECodigoDocumento(boleto), colunaLateral, quintaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			var sextaLinha = quintaLinha + espacoEntreLinhas,
				tituloDaSextaLinha = sextaLinha - diferencaEntreTituloEValor;

			var tituloUsoDoBancoX = margemDoSegundoBloco;
			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Uso do Banco', tituloUsoDoBancoX, tituloDaSextaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			var tituloCarteira = tituloUsoDoBancoX + 105;
			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Carteira', tituloCarteira, tituloDaSextaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(beneficiario.getCarteira(), margemDoSegundoBloco + 104.5, sextaLinha, {
					lineBreak: false,
					width: 71,
					align: 'center'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(boleto.getEspecieMoeda(), margemDoSegundoBloco + 104.5 + 77, sextaLinha, {
					lineBreak: false,
					width: 71,
					align: 'center'
				});

			var tituloEspecieMoeda = tituloCarteira + 77;
			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Espécie Moeda', tituloEspecieMoeda, tituloDaSextaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			var tituloQuantidadeMoeda = tituloEspecieMoeda + 77;
			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Quantidade Moeda', tituloQuantidadeMoeda, tituloDaSextaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			var tituloValorMoeda = tituloQuantidadeMoeda + 92;
			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Valor Moeda', tituloValorMoeda, tituloDaSextaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('(=) Valor do Documento', colunaLateral, tituloDaSextaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(boleto.getValorFormatadoBRL(), colunaLateral, sextaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			var setimaLinhaLateral = sextaLinha + espacoEntreLinhas,
				tituloDaSetimaLinha = tituloDaSextaLinha + espacoEntreLinhas,
				tituloDaSetimaLinhaLateral = setimaLinhaLateral - diferencaEntreTituloEValor;

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Instruções', margemDoSegundoBloco, tituloDaSetimaLinha, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			var instrucaoY = tituloDaSetimaLinha + 12;
			boleto.getInstrucoes().forEach(function(instrucao, indice) {
				pdf.font('normal')
					.fontSize(args.tamanhoDaFonte)
					.text(instrucao, margemDoSegundoBloco, instrucaoY + (indice * args.tamanhoDaFonte), {
						lineBreak: false,
						width: 400,
						align: 'left'
					});
			});

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Unidade Beneficiária', 30, tituloDaSetimaLinha + 70, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Pagador', 30, tituloDaSetimaLinha + 115, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(pagador.getIdentificacao(), 30, tituloDaSetimaLinha + 115 + 10, {
					lineBreak: false,
					width: 535,
					align: 'left'
				});

			var enderecoDoPagador = pagador.getEndereco();
			if(enderecoDoPagador) {
				var espacamento = args.tamanhoDaFonte;

				if(enderecoDoPagador.getPrimeiraLinha()) {
					pdf.font('normal')
						.fontSize(args.tamanhoDaFonte)
						.text(enderecoDoPagador.getPrimeiraLinha(), 30, tituloDaSetimaLinha + 115 + 10 + espacamento, {
							lineBreak: false,
							width: 535,
							align: 'left'
						});

					espacamento += espacamento;
				}

				if(enderecoDoPagador.getSegundaLinha()) {
					pdf.font('normal')
						.fontSize(args.tamanhoDaFonte)
						.text(enderecoDoPagador.getSegundaLinha(), 30, tituloDaSetimaLinha + 115 + 10 + espacamento, {
							lineBreak: false,
							width: 535,
							align: 'left'
						});
				}
			}

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Código de Baixa', 370, tituloDaSetimaLinha + 159, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('Autenticação Mecânica', 360, tituloDaSetimaLinha + 171.5, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo + 1)
				.text('FICHA DE COMPENSAÇÃO', 421, tituloDaSetimaLinha + 171.5, {
					lineBreak: false,
					width: 150,
					align: 'right'
				});

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('(-) Desconto / Abatimento', colunaLateral, tituloDaSetimaLinhaLateral, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(boleto.getValorDescontosFormatadoBRL(), colunaLateral, setimaLinhaLateral, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			var oitavaLinhaLateral = setimaLinhaLateral + espacoEntreLinhas,
				tituloDaOitavaLinhaLateral = oitavaLinhaLateral - diferencaEntreTituloEValor;

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('(-) Outras Deduções', colunaLateral, tituloDaOitavaLinhaLateral, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			pdf.font('normal')
				.fontSize(args.tamanhoDaFonte)
				.text(boleto.getValorDeducoesFormatadoBRL(), colunaLateral, oitavaLinhaLateral, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			var nonaLinhaLateral = oitavaLinhaLateral + espacoEntreLinhas,
				tituloDaNonaLinhaLateral = nonaLinhaLateral - diferencaEntreTituloEValor;

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('(+) Mora / Multa', colunaLateral, tituloDaNonaLinhaLateral, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			var decimaLinhaLateral = nonaLinhaLateral + espacoEntreLinhas,
				tituloDaDecimaLinhaLateral = decimaLinhaLateral - diferencaEntreTituloEValor;

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('(+) Outros Acréscimos', colunaLateral, tituloDaDecimaLinhaLateral, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			var decimaPrimLinhaLateral = decimaLinhaLateral + espacoEntreLinhas,
				tituloDaDecimaPrimLinhaLateral = decimaPrimLinhaLateral - diferencaEntreTituloEValor;

			pdf.font('negrito')
				.fontSize(args.tamanhoDaFonteDoTitulo)
				.text('(=) Valor Cobrado', colunaLateral, tituloDaDecimaPrimLinhaLateral, {
					lineBreak: false,
					width: 294,
					align: 'left'
				});

			args.creditos && pdf.font('italico')
				.fontSize(args.tamanhoDaFonte)
				.text(args.creditos, 3 + args.ajusteX, 700 + args.ajusteY, {
					width: 560,
					align: 'center'
				});

			args.imprimirSequenciaDoBoleto && pdf.font('italico')
				.fontSize(args.tamanhoDaFonte)
				.text('Boleto Nº ' + (indice + 1) + '/' + boletos.length, {
					width: 560,
					align: 'center'
				});

			if(indice < boletos.length - 1) {
				pdf.addPage();
			}
		})

		pdf.end();

		callback(null, pdf);
	}

	GeradorDeBoleto.prototype.gerarHTML = function() {

	}

	return GeradorDeBoleto;
})();

module.exports = GeradorDeBoleto;