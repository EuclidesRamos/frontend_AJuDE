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

function login() {
    let email = document.querySelector('#emailLogin').value;
    let senha = document.querySelector('#senhaLogin').value;

    fetch(URL + "/login/usuarios", 
    {
        'method':'POST',
        'body':`{"email":"${email}", "senha":"${senha}"}`,
        'headers':{'Content-Type':'application/json'}
    })
}

function mudarEstado(divExibir, divOcultar) {
    var display = document.getElementById(divExibir).style.display;
    if(display == "none")
        document.getElementById(el).style.display = 'block';
    else
        document.getElementById(el).style.display = 'none';
}

(function init() {
    let $buttonCadastro = document.querySelector("#cadastro");
    let $buttonSingUp = document.querySelector("#singUp");
    let $buttonSingIn = document.querySelector("#singIn");
    let $buttonLogin = document.querySelector("#login");

    $buttonSingUp.addEventListener('click', mudarEstado('cadastrar', 'entrar'));
    $buttonSingIn.addEventListener('click', mudarEstado('entrar', 'cadastrar'));
    $buttonCadastro.addEventListener('click', cadastro);
    $buttonLogin.addEventListener('click', login);
}());