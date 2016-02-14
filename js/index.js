;(function(window, document, undefined) {
	'use strict';

	var iframe = document.querySelector('.result__window'),
  		ifrw = iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument,
			saveCompleteButton = document.querySelector('.saveComplete'),
			saveCSSButton = document.querySelector('.saveCSS'),
			saveJSButton = document.querySelector('.saveJS'),
			textArea = document.querySelector('.code__field'),
			selector = '';
	var addContent = function addContent() {
			ifrw.document.open();
  		ifrw.document.write(textArea.value);  
  		ifrw.document.close();
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
			var file = new Blob([content.replace('</', '').trim()], {type: 'text/plain; charset=utf-8'});
			saveAs(file, "script.js");
		}else {
			window.alert('Não encontramos nenhum script em seu código');
		}
	};
	var tabIndent = function tabIndent(e) {
		if(e.keyCode == 9 || e.which == 9){
	   	e.preventDefault();
	  	var start = this.selectionStart;
	  	var end = this.selectionEnd;
	   	this.value = this.value.substring(0, start) + "   " + this.value.substring(end);
	   	end = start + 1; 
		}
	};  
	saveCompleteButton.addEventListener('click', saveComplete, false);
	saveCSSButton.addEventListener('click', saveCSS, false);
	saveJSButton.addEventListener('click', saveJS, false);
	textArea.addEventListener('keyup', addContent, false);
	textArea.addEventListener('keydown', tabIndent, false);

})(window, document);

