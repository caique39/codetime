(function (window, document) {
	"use strict";

	const iframe = document.querySelector(".result__window");
	const formatCodeButton = document.querySelector(".formatCode");
	const saveCompleteButton = document.querySelector(".saveComplete");
	const saveCSSButton = document.querySelector(".saveCSS");
	const saveJSButton = document.querySelector(".saveJS");
	const textArea = document.getElementById("code");
	const clearCode = document.querySelector(".clear");
	const openWindow = document.querySelector(".openWindow");
	const ifrw =
		iframe.contentWindow ||
		iframe.contentDocument.document ||
		iframe.contentDocument;

	const editor = CodeMirror.fromTextArea(textArea, {
		mode: "htmlmixed",
		extraKeys: {
			Tab: "emmetExpandAbbreviation",
		},
	});

	const editorValue = () => editor.getValue();

	const addContent = function addContent() {
		const value = editorValue();

		ifrw.document.open();
		ifrw.document.write(
			value ||
				'<h3 class="placeholder--default">O resultado ficará aqui...</h3>'
		);
		ifrw.document.close();
		localStorage.setItem("code", value);

		return value;
	};

	const formatCode = function formatCode() {
		const code = editorValue();
		const formatted = prettier.format(code, {
			parser: 'html',
			plugins: [prettierPlugins.html]
		});
		editor.setValue(formatted);
	};

	const saveComplete = function saveComplete() {
		const code = editorValue();

		if (code) {
			const nameFile = prompt("Digite o nome do arquivo (sem extensão):");
			const file = new Blob([code], {
				type: "text/plain; charset=utf-8",
			});

			if (nameFile) {
				saveAs(file, nameFile + ".html");
				alert("Arquivo criado com sucesso!");
			} else {
				alert("Arquivo não pode ser criado.");
			}
		} else {
			window.alert("Não foi possível criar arquivo vazio.");
		}
	};

	const saveCSS = function saveCSS() {
		const textValue = editorValue().trim();
		const regCss = new RegExp("<style>([^<]+)</style>");

		if (regCss.test(textValue)) {
			const file = new Blob([regCss.exec(textValue)[1].trim()], {
				type: "text/plain; charset=utf-8",
			});
			const nameFile = prompt("Digite o nome do arquivo (sem extensão):");
			if (nameFile) {
				saveAs(file, nameFile + ".css");
				alert("Arquivo criado com sucesso!");
			} else {
				alert("Arquivo não pode ser criado.");
			}
		} else {
			window.alert("Não encontramos nenhum estilo em seu código.");
		}
	};

	const saveJS = function saveJS() {
		const textValue = editorValue().trim();
		const regJs = new RegExp("<script>([^<]+)</script>");

		if (regJs.test(textValue)) {
			const nameFile = prompt("Digite o nome do arquivo (sem extensão):");
			const file = new Blob([regJs.exec(textValue)[1].trim()], {
				type: "text/plain; charset=utf-8",
			});

			if (nameFile) {
				saveAs(file, nameFile + ".js");
				alert("Arquivo criado com sucesso!");
			} else {
				alert("Arquivo não pode ser criado.");
			}
		} else {
			window.alert("Não encontramos nenhum script em seu código");
		}
	};

	const scroll = function scroll() {
		(document.body.scrollTop += 2) >=
		document.querySelector(".header").clientHeight
			? (document.body.scrollTop =
					document.querySelector(".header").clientHeight)
			: setTimeout(scroll, 10);
	};

	const contentWindowDefault = function contentWindowDefault() {
		ifrw.document.open();
		ifrw.document.write(
			'<h3 style="font-family: sans-serif; color: gray;">O resultado ficará aqui...</h3>'
		);
		ifrw.document.close();
	};

	const openNewWindow = function openNewWindow() {
		const myWindow = window.open("", "_blank");

		myWindow.document.write(addContent());
	};

	const handleClearCode = function handleClearCode() {
		editor.setValue("");
		editor.focus();
		contentWindowDefault();
		scroll();
	};

	const storageCode = function storageCode() {
		if (typeof Storage !== "undefined") {
			if (localStorage.getItem("code")) {
				editor.setValue(localStorage.getItem("code"));
			}
		}

		return;
	};

	document.addEventListener("DOMContentLoaded", storageCode);

	editor.on("change", addContent);
	clearCode.addEventListener("click", handleClearCode, false);
	openWindow.addEventListener("click", openNewWindow);
	formatCodeButton.addEventListener("click", formatCode, false);
	saveCompleteButton.addEventListener("click", saveComplete, false);
	saveCSSButton.addEventListener("click", saveCSS, false);
	saveJSButton.addEventListener("click", saveJS, false);

	contentWindowDefault();
})(window, document);
