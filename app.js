let $mensagem = document.querySelector("#mensagem");

function cadastro() {
    let pNome = document.querySelector('#pnome').value;
    let uNome = document.querySelector('#unome').value;
    let email = document.querySelector('#email').value;
    let cartao = document.querySelector('#cartao').value;
    let senha = document.querySelector('#senha').value;

    fetch(URL + "/usuarios", 
    {
        'method':'POST',
        'body':`{"primeiro nome":"${pNome}", "ultimo nome":"${uNome}", "email":"${email}", "cartao":"${cartao}", "senha":"${senha}"}`,
        'headers':{'Content-Type':'application/json'}
    })
    .then(response => response.json())
    .then(dados => {
        $mensagem.innerText = "Cadastro realizado com sucesso!";
    })
}

(function init() {
    let $button = document.querySelector("#cadastro");
    $button.addEventListener('click', cadastro);
}());