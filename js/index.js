;(function(window, document) {
	'use strict';
	var app = (function() {
		var _private = {};
		var publik = {};
		_private.setText = function(text, selector) {
			var finall = text.split(' '),
					element = document.querySelector(selector),
					length = finall.length,
					i;
			console.log(finall);
			if(finall){
				for(i = 0; i < length; i++){
					element.style[finall[i]] = finall[i + 1];
				}
			}
		}

		publik.verifyText = function(text, selector) {
			if(text && selector){
				_private.setText(text, selector);
			}
		}
										
		return publik;
	})();
	var textArea = document.querySelector('textarea');
	var selector = prompt('Digite o campo que quer editar:');
	textArea.addEventListener('keyup', function(){
		if(textArea.value === 'mod'){
			selector = prompt('Digite o campo que quer editar:');
		}
		app.verifyText(textArea.value, selector);
	});
})(window, document);