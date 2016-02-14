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
			selector = '';
	var addContent = function addContent(e) {
		ifrw.document.open();
		ifrw.document.write(textArea.value || '<h3 style="font-family: sans-serif; color: gray;">O resultado ficará aqui...</h3>'); 
  	ifrw.document.close();
  	return textArea.value;
	};
	var saveComplete = function saveComplete() {
		if(textArea.value) {
			var file = new Blob([textArea.value], {type: 'text/plain; charset=utf-8'});
			saveAs(file, 'dados.html');
		} else {
			window.alert('Não foi possível criar arquivo vazio.');
		}
	};
	var saveCSS = function saveCSS() {
		var content = textArea.value.split('style>')[1];
		if(content) {
			var file = new Blob([content.replace('</', '').trim()], {type: 'text/plain; charset=utf-8'});
			saveAs(file, 'style.css');
		} else {
			window.alert('Não encontramos nenhum estilo em seu código.');
		}
	};
	var saveJS = function saveJS() {
		var content = textArea.value.split('script>')[1];
		if(content) {
			this.style.display = 'block';
			var file = new Blob([content.replace('</', '').trim()], {type: 'text/plain; charset=utf-8'});
			saveAs(file, "script.js");
		}else {
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
	contentWindowDefault();
	saveCompleteButton.addEventListener('click', saveComplete, false);
	saveCSSButton.addEventListener('click', saveCSS, false);
	saveJSButton.addEventListener('click', saveJS, false);
	textArea.addEventListener('keyup', addContent, false);
	// textArea.addEventListener('keydown', tabIndent, false);
	textArea.addEventListener('click', scroll, false);
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
    use_tab: true       
	});
})(window, document);

