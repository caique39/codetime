// var app = (function() {
	// 	var _private = {};
	// 	var publik = {};
	// 	_private.setText = function(text, selector) {
	// 		var element = document.querySelector(selector),
	// 				finall = text.split(' '),
	// 				length = finall.length,
	// 				property,
	// 				propertyValue;
	// 		console.log(finall);
	// 		if(length > 1){
	// 			for(property = 0; property < length; property++) {
	// 				if(element.style.hasOwnProperty(finall[property])) {
	// 					element.style[finall[i]] = finall[i + 1];						
	// 				}
	// 			}
	// 		}
	// 	}

	// 	publik.verifyText = function(text, selector) {
	// 		selector = selector || 'body';
	// 		_private.setText(text, selector);
	// 	}
										
	// 	return publik;

	// })();