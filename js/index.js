;(function(window, document) {
	'use strict';

	/** Criando variáveis de cache */
	var iframe = document.querySelector('.result__window'),
  		ifrw = iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument,
			button = document.querySelector('#save'),
			textArea = document.querySelector('.code__field'),
			selector = '';

	/** Função para salvar aqui */
	function save() {
		var blob = new Blob([textArea.value], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "dados.html");
	};

	/** Função que adiciona contéudo ao iframe */
	function addContent() {
			ifrw.document.open();
  		ifrw.document.write(textArea.value);  
  		ifrw.document.close();
	};

	/** Chamada da função para salvar arquivo */
	button.addEventListener('click', save); 
	
	/** Chamada da função para adicionar conteúdo ao iframe */
	textArea.addEventListener('keyup', addContent);

})(window, document);
