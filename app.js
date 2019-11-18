let $viewer = document.querySelector("#viewer");

let URL = "http://ajudeproject.herokuapp.com/api/v1";
let roteamentoCampanha = [];

let idToken = "idToken";

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
    });
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
        if (!!dados.token) {
            let token = dados.token;
            sessionStorage.setItem(idToken, token);
            hall();
        } else {
            alert("USUÁRIO NÃO CADASTRADO");
            home();
        }
    });
}

function cadastraCampanha() {
    let nomeCurto = document.querySelector("#nomeCurto").value;
    let descricao = document.querySelector("#descricao").value;
    let deadLine = document.querySelector("#deadLine").value;
    let meta = document.querySelector("#meta").value;

    let url = createURL(nomeCurto);

    if (!!sessionStorage.getItem(idToken)) {
        fetch(URL + "/campanha",
        {
            'method':'POST',
            'body':`{"nomeCurto":"${nomeCurto}", "descricao":"${descricao}", "deadLine":"${deadLine}", "meta":${meta}, "url":"${url}" }`,
            'headers':{'Content-Type':'appication/json', 'Autorization': 'Bearer' + sessionStorage.getItem(idToken)}
        })
        .then(response => response.json())
        .then(dados => {
            alert("CAMPANHA CADASTRADA COM SUCESSO!");
            hall();
        });
    } else {
        alert("USUÁRIO NÃO ESTÁ LOGADO!");
    }
}

function pesquisaCampanha() {
    let stringBusca = document.querySelector("#buscarCampanha").value;

    if (!!sessionStorage.getItem(idToken)) {
        fetch(URL + "",
        {
            'method':'GET',
            'body':`{"stringBusca":"${stringBusca}"}`,
            'headers':{'Content-Type':'appication/json', 'Autorization': 'Bearer' + sessionStorage.getItem(idToken)}
        })
        .then(response => response.json())
        .then(dados => {
            exibeResultadoBusca(dados);
        });
    } else {
        alert("USUÁRIO NÃO ESTÁ LOGADO!");
    }
}

function exibeResultadoBusca(dados) {
    document.getElementById('pesquisarCampanha').style.display = 'none';
    document.getElementById('resultadoBusca').style.display = 'inline';
    let $campanhas = document.querySelector("#resultadoBusca");
    $campanhas.innerHTML = '';

    dados.forEach(element => {
        let $p = document.createElement("p");
        $p.id = "resultadoBuscaCampanha";
        $campanhas.appendChild($p);
        $p.innerText = ("Campanha: " + element.nomeCurto + "\n" +
                        "Descrição: " + element.descricao + "\n" +
                        "DeadLine: " + element.deadLine + "\n" +
                        "Status " + element.status + "\n" +
                        "Meta: " + element.meta + "\n" +
                        "Doações: " + element.doacoes + "\n" +
                        "Dono: " + element.dono.primeiroNome + "\n" +
                        "URL: " + element.url);
        $p.href = element.url;
        let $br = document.createElement("br");
        $campanhas.appendChild($br);
    });

}

function createURL(nomeCurto) {
    let parsed = removeAcento(nomeCurto);
    parsed = removeDuploEspaco(parsed);
    parsed = trocaEspacoPorTraco(parsed);

    return URL + "/" + parsed;
}


function removeAcento(text) {       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃáàâã]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊéèê]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎíìî]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕóòôõ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛúùû]','gi'), 'u');
    text = text.replace(new RegExp('[Çç]','gi'), 'c');

	let parsed = text.replace(/([^a-z0-9])/gm, " ");
    return parsed;                 
}

function removeDuploEspaco(string) {
    let result = "";
    for (let i = 1; i <= string.length; i++) {
        if (!(string[i] === " " && string[i - 1] === " ")) {
            result += string[i - 1]; 
        }
    }

    return result;
}

function trocaEspacoPorTraco(string) {
    let result = "";
    for (let i = 0; i < string.length; i++) {
        result += string[i].replace(" ", "-");
    }

    return result;
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
    $viewer.innerHTML = "";

    let $buttonHome = document.querySelector("#imagem");
    let $buttonSingUp = document.querySelector("#singUp");
    let $buttonSingIn = document.querySelector("#singIn");

    $buttonHome.addEventListener('click', function () { home() } );
    $buttonSingUp.addEventListener('click', function () { cadastrarUsuario() });
    $buttonSingIn.addEventListener('click', function () { loginUsuario() });
}

function cadastrarUsuario() {
    let $template = templateCadastroUsuario;
    $viewer.innerHTML = $template.innerHTML;

    let $buttonCadastro = document.querySelector("#cadastro");
    $buttonCadastro.addEventListener('click', cadastro);
}

function loginUsuario() {
    let $template = templateLogin;
    $viewer.innerHTML = $template.innerHTML;

    let $buttonLogin = document.querySelector("#login");
    $buttonLogin.addEventListener('click', login);
}

function hall() {
    let $template = templateHall;
    $viewer.innerHTML = $template.innerHTML;

    let $buttonDesconectar = document.querySelector("#desconectar");
    let $buttonExibirCadastrarCampanha = document.querySelector("#exibirCadastraCampanha");

    $buttonDesconectar.addEventListener('click', function () { desconectar() });
    $buttonExibirCadastrarCampanha.addEventListener('click', function () { exibeCadastraCampanha() });

    document.getElementById("desconectar").style.display = 'inline';
}

function exibeCadastraCampanha() {
    let $template = templateCadastroCampanha;
    $viewer.innerHTML = $template.innerHTML;

    let $buttonCampanhaCadastro = document.querySelector('#campanhaCadastro');
    $buttonCampanhaCadastro.addEventListener('click', cadastraCampanha);


}

function exibePesquisarCampanha() {
    let $template = templatePesquisaCampanha;
    $viewer.innerHTML = $template.innerHTML;
}

function desconectar() {
    if (!!sessionStorage.getItem(idToken)) {
        sessionStorage.removeItem(idToken);
    }
    home();
}


(async function init() {
    let data = await Promise.all([fetchTemplates()]);

    let hash = location.hash;

    if ([""].includes(hash)) {
        home();
    } else if (["/login"].includes(hash)) {
        loginUsuario();
    } else if (["/cadastro"].includes(hash)) {
        cadastrarUsuario();
    }
    
}());

let templateCadastroUsuario, templateLogin, templateHall, templateCadastroCampanha, templatePesquisaCampanha;
async function fetchTemplates() {
    let htmlTemplates = await (fetch('templates.html').then(r => r.text()));
    let e = document.createElement("div");
    e.innerHTML= htmlTemplates;

    templateCadastroUsuario = e.querySelector("#cadastrar");
    templateLogin = e.querySelector("#entrar");
    templateHall = e.querySelector("#hall");
    templateCadastroCampanha = e.querySelector("#cadastrarCampanha");
    templatePesquisaCampanha = e.querySelector("#pesquisarCampanha");
}