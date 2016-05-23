;(function(window, document, undefined) {
	'use strict';

	var iframe = document.querySelector('.result__window'),
  	ifrw = iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument,
		saveCompleteButton = document.querySelector('.saveComplete'),
		saveCSSButton = document.querySelector('.saveCSS'),
		saveJSButton = document.querySelector('.saveJS'),
		textArea = document.querySelector('.code__field'),
		clearCode = document.querySelector('.clear'),
		openWindow = document.querySelector('.openWindow'),
		appCache = window.applicationCache,
		selector = '';

	var addContent = function addContent(e) {
		ifrw.document.open();
		ifrw.document.write(textArea.value || '<h3 style="font-family: sans-serif; color: gray;">O resultado ficará aqui...</h3>');
  	ifrw.document.close();
  	localStorage.setItem('code', textArea.value);
  	return textArea.value;
	};

	var saveComplete = function saveComplete() {
		if(textArea.value) {
			var file = new Blob([textArea.value], {type: 'text/plain; charset=utf-8'});
			var nameFile = prompt('Digite o nome do arquivo (sem extensão):');
			if(nameFile) {
				saveAs(file, nameFile + '.html');
				alert('Arquivo criado com sucesso!');
			} else {
				alert('Arquivo não pode ser criado.');
			}
		} else {
			window.alert('Não foi possível criar arquivo vazio.');
		}
	};

	var saveCSS = function saveCSS() {
		var textValue = textArea.value.trim();
		var regCss = new RegExp('<style>([^<]+)\</style>');
		if(regCss.test(textValue)) {
			var file = new Blob([regCss.exec(textValue)[1].trim()], {type: 'text/plain; charset=utf-8'});
			var nameFile = prompt('Digite o nome do arquivo (sem extensão):');
			if(nameFile) {
				saveAs(file, nameFile + '.css');
				alert('Arquivo criado com sucesso!');
			} else {
				alert('Arquivo não pode ser criado.');
			}
		} else {
			window.alert('Não encontramos nenhum estilo em seu código.');
		}
	};

	var saveJS = function saveJS() {
		var textValue = textArea.value.trim();
		var regJs = new RegExp('<script>([^<]+)\</script>');
		if(regJs.test(textValue)) {
			var file = new Blob([regJs.exec(textValue)[1].trim()], {type: 'text/plain; charset=utf-8'});
			var nameFile = prompt('Digite o nome do arquivo (sem extensão):');
			if(nameFile) {
				saveAs(file, nameFile + '.js');
				alert('Arquivo criado com sucesso!');
			} else {
				alert('Arquivo não pode ser criado.');
			}
		} else {
			window.alert('Não encontramos nenhum script em seu código');
		}
	};

	var scroll = function scroll() {
		(document.body.scrollTop += 2) >= document.querySelector('.header').clientHeight ?
			document.body.scrollTop = document.querySelector('.header').clientHeight : setTimeout(scroll, 10);
	};

	var contentWindowDefault = function contentWindowDefault() {
		ifrw.document.open();
		ifrw.document.write('<h3 style="font-family: sans-serif; color: gray;">O resultado ficará aqui...</h3>');
		ifrw.document.close();
	};

	var storageCode = function storageCode() {
		if (typeof(Storage) !== 'undefined') {
			if(localStorage.getItem('code')) {
				textArea.value = localStorage.getItem('code');
			}
		}
   	return;
	};

	document.addEventListener('DOMContentLoaded', storageCode);

	window.addEventListener('load', function(e) {
		appCache.addEventListener('updateready', function(e) {
			if (appCache.status == appCache.UPDATEREADY) {
				appCache.swapCache();
			}
		}, false);
	}, false);

	clearCode.addEventListener('click', function() {
 		textArea.value = '';
 		textArea.focus();
 		contentWindowDefault();
 		scroll();
	}, false);

	openWindow.addEventListener('click', function() {
		var myWindow = window.open('','_blank');
		myWindow.document.write(addContent());
	});

	emmet.require('textarea').setup({
		pretty_break: true,
		use_tab: true,
    pretty_break: true,
    use_tab: true
	});

	saveCompleteButton.addEventListener('click', saveComplete, false);
	saveCSSButton.addEventListener('click', saveCSS, false);
	saveJSButton.addEventListener('click', saveJS, false);
	textArea.addEventListener('click', scroll, false);
	textArea.addEventListener('keyup', addContent, false);

	contentWindowDefault();

})(window, document);
