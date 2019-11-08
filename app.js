let $mensagemCadastro = document.querySelector("#mensagemCadastro");
let $mensagemLogin = document.querySelector("#mensagemLogin");
let URL = "http://ajudeproject.herokuapp.com/api/v1";

function cadastro() {
    let primeiroNome = document.querySelector('#primeiroNome').value;
    let ultimoNome = document.querySelector('#ultimoNome').value;
    let email = document.querySelector('#email').value;
    let cartao = document.querySelector('#cartao').value;
    let senha = document.querySelector('#senha').value;

    fetch(URL + "/usuarios", 
    {
        'method':'POST',
        'body':`{"primeiroNome":"${primeiroNome}", "ultimoNome":"${ultimoNome}", "email":"${email}", "numCartao":"${cartao}", "senha":"${senha}"}`,
        'headers':{'Content-Type':'application/json'}
    })
    .then(response => response.json())
    .then(dados => {
        $mensagemCadastro.innerText = "Cadastro realizado com sucesso!";
    })
}

function login() {
    let email = document.querySelector('#emailLogin').value;
    let senha = document.querySelector('#senhaLogin').value;

    fetch(URL + "/login", 
    {
        'method':'POST',
        'body':`{"email":"${email}", "senha":"${senha}"}`, // Verificar se essa é a melhor forma de manipular senha
        'headers':{'Content-Type':'application/json'}
    })
    .then(response => response.json())
    .then(dados => {
        $mensagemLogin.innerText = "Login realizado com sucesso!";
    })
}

function mudarEstado(divExibir, divOcultar) {
    var display = document.getElementById(divExibir).style.display;
    if(display == "none") {
        document.getElementById(divExibir).style.display = 'block';
        document.getElementById(divOcultar).style.display = 'none';
    } else {
        document.getElementById(divExibir).style.display = 'block';
        document.getElementById(divOcultar).style.display = 'none';
    }
}

function home() {
    document.getElementById('cadastrar').style.display = 'none';
    document.getElementById('entrar').style.display = 'none';
}

(function init() {
    let $buttonCadastro = document.querySelector("#cadastro");
    let $buttonLogin = document.querySelector("#login");
    let $buttonHome = document.querySelector("#imagem");

    let $buttonSingUp = document.querySelector("#singUp");
    let $buttonSingIn = document.querySelector("#singIn");

    $buttonCadastro.addEventListener('click', cadastro);
    $buttonLogin.addEventListener('click', login);

    $buttonSingUp.addEventListener('click', function () {mudarEstado('cadastrar', 'entrar')});
    $buttonSingIn.addEventListener('click', function () {mudarEstado('entrar', 'cadastrar')});
    $buttonHome.addEventListener('click', function () {home()});
    
}());