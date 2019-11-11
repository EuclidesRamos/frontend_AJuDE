let $mensagemCadastro = document.querySelector("#mensagemCadastro");
let $mensagemLogin = document.querySelector("#mensagemLogin");
let $mensagemCadastroCampanha = document.querySelector('#mensagemCadastroCampanha');

let URL = "http://ajudeproject.herokuapp.com/api/v1";

let idToken;

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
        alert("CADASTRO REALIZADO COM SUCESSO!");
        home();
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
        let token = dados.token;
        sessionStorage.setItem(email, token);
        idToken = email;
        hall();
    }) 
}

function cadastraCampanha() {
    let nomeCurto = document.querySelector("#nomeCurto").value;
    let descricao = document.querySelector("#descricao").value;
    let deadLine = document.querySelector("#deadLine").value;
    let meta = document.querySelector("#meta").value;

    if (!!sessionStorage.getItem(idToken)) {
        fetch(URL + "/campanha",
        {
            'method':'POST',
            'body':`{"nomeCurto":"${nomeCurto}", "descricao":"${descricao}", "deadLine":"${deadLine}", "meta":"${meta}" }`,
            'headers':{'Content-Type':'appication/json', 'Autorization': 'Bearer' + sessionStorage.getItem(idToken)}
        })
        .then(response => response.json())
        .then(dados => {
            
        })
    } else {
        alert("USUÁRIO NÃO ESTÁ LOGADO!");
    }
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
    if (document.getElementById('cadastrar').style.display !== 'none') {
        document.getElementById('cadastrar').style.display = 'none';
        document.getElementById('entrar').style.display = 'none';
        
        document.getElementById('singUp').style.display = 'inline';
        document.getElementById('singIn').style.display = 'inline';
    
        document.getElementById('hall').style.display = 'none';
        document.getElementById('desconectar').style.display = 'none';
        document.getElementById('cadastrarCampanha').style.display = 'none';
    }
}

function hall() {
    document.getElementById('cadastrar').style.display = 'none';
    document.getElementById('entrar').style.display = 'none';
    document.getElementById('singUp').style.display = 'none';
    document.getElementById('singIn').style.display = 'none';

    document.getElementById('hall').style.display = 'block';
    document.getElementById('desconectar').style.display = 'inline';
}

function exibeCadastraCampanha() {
    document.getElementById('hall').style.display = 'none';
    document.getElementById('cadastrarCampanha').style.display = 'block';
}



function desconectar() {
    if (!!sessionStorage.getItem(idToken)) {
        sessionStorage.removeItem(idToken);
    }
    home();
}



(function init() {
    let $buttonCadastro = document.querySelector("#cadastro");
    let $buttonLogin = document.querySelector("#login");
    let $buttonHome = document.querySelector("#imagem");

    let $buttonSingUp = document.querySelector("#singUp");
    let $buttonSingIn = document.querySelector("#singIn");

    let $buttonExibirCadastrarCampanha = document.querySelector("#exibirCadastraCampanha");
    let $buttonDesconectar = document.querySelector("#desconectar");
    let $buttonCampanhaCadastro = document.querySelector('#campanhaCadastro');

    $buttonCadastro.addEventListener('click', cadastro);
    $buttonLogin.addEventListener('click', login);
    $buttonCampanhaCadastro.addEventListener('click', function () { cadastraCampanha });


    $buttonHome.addEventListener('click', function () { home() });
    $buttonSingUp.addEventListener('click', function () { mudarEstado('cadastrar', 'entrar') });
    $buttonSingIn.addEventListener('click', function () { mudarEstado('entrar', 'cadastrar') });
    $buttonExibirCadastrarCampanha.addEventListener('click', function () { exibeCadastraCampanha() });

    $buttonDesconectar.addEventListener('click', function () { desconectar() });


    
}());