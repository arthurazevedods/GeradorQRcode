$(document).ready(function () {
    let qrcode = new QRCode("qrcode");
    let textURL = document.getElementById("placement");
    let qrcodeContainer = document.getElementById("qrcode");

    qrcodeContainer.classList.add("hide");

    function isValidURL(url) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // Protocolo
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domínio
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // Ou IP (v4) 
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Porta e caminho
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // Parâmetros de consulta
            '(\\#[-a-z\\d_]*)?$', 'i'); // Fragmento
        return !!pattern.test(url);
    }

    function makeCode() {
        let url = textURL.value.trim(); // Remove espaços em branco no início e no fim

        if (!isValidURL(url)) {
            alertURL("URL inválida. Por favor, insira uma URL válida.");
            textURL.focus();
            qrcodeContainer.classList.add("hide");
            return;
        } else {
            qrcodeContainer.classList.remove("hide");
        }


        qrcode.makeCode(url);
    }

    $("#generate").click(function () {
        makeCode();
    });

    function alertURL(message) {
        let alertElement = document.getElementById("alert");
        alertElement.textContent = message;
        alertElement.classList.remove("hide");

        // Adicionando o botão de fechar ao alerta
        let closeButton = document.createElement("span");
        closeButton.className = "closebtn";
        closeButton.textContent = "X";
        closeButton.onclick = function () {
            alertElement.classList.add("hide");
        };
        alertElement.appendChild(closeButton);

        setTimeout(function () {
            alertElement.classList.add("hide");
        }, 3000);
    }
});
