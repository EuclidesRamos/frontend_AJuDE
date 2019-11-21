let $viewer = document.querySelector("#viewer");

let URL = "http://ajudeproject.herokuapp.com/api/v1";
// let URL = "http://localhost:8080/api/v1";

let idToken = "idToken";

let bufferTime = null;

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
    .then(response => {
        if (!!response.ok) {
            throw new Error("Cadastro não realizado. Certifique-se que colocou as informações corretamente e tente novamente."); 
        } else {
            return response.json();
        }
    })
    .then(dados => {
        alert("CADASTRO REALIZADO COM SUCESSO!");
        home();
    })
    .catch(error => {
        alert(error);
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
    .then(response => {
        if (!!response.ok) {
            throw new Error("Login não realizado. Certifique-se que colocou as informações corretamente e tente novamente."); 
        } else {
            return response.json();
        }
    })
    .then(dados => {
        let token = dados.token;
        sessionStorage.setItem(idToken, token);
        hall();
    })
    .catch(error => {
        alert(error);
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
            'headers':{'Content-Type':'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem(idToken)}
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Cadastro de Campanha não realizado. Certifique-se que colocou as informações corretamente e tente novamente.");
            } else {
                return response.json();
            }
        })
        .then(dados => {
            alert("Campanha cadastrada com sucesso!");
            hall();
        })
        .catch(error => {
            alert(error);
        });
    } else {
        alert("USUÁRIO NÃO ESTÁ LOGADO!");
    }
}

function pesquisaCampanha() {
    let stringBusca = document.querySelector("#search").value;

    fetch(URL + "",
    {
        'method':'GET',
        'body':`{"stringBusca":"${stringBusca}"}`,
        'headers':{'Content-Type':'application/json'}
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Pesquisa não realizada. Certifique-se que colocou as informações corretamente e tente novamente.")
        } else {
            return response.json();
        }
    })
    .then(dados => {
        exibeResultadoBusca(dados, stringBusca);   
    })
    .catch(error => {
        alert(error);
    })
}

function exibeResultadoBusca(dados, stringBusca) {

    // location.hash = "/busca=" + stringBusca;
    $viewer.innerHTML = '';

    document.getElementById('pesquisarCampanha').style.display = 'none';
    
    let $h1 = document.createElement("h1");
    $viewer.appendChild($h1);
    $h1.innerText = "Resultado da busca para - " + stringBusca + " -";

    let $div = document.createElement(div);
    $viewer.appendChild($div);

    $div.innerHTML = '';

    dados.forEach(element => {
        let $p = document.createElement("p");
        $p.id = "resultadoBuscaCampanha";
        $div.appendChild($p);

        $p.innerText = "Campanha: " + element.nomeCurto + "\n";
        $p.href = element.url;
        $p.addEventListener('click', function () { exibeCampanha(element.url); });

        let $br = document.createElement("br");
        $div.appendChild($br);
    });
}

function exibeCampanha(url) {

    location.hash = url;
    $viewer.innerHTML = '';
    // em andamento

}

function buscarCampanha() {
    if (bufferTime != null) {
        clearTimeout(bufferTime);
    }

    bufferTime = setTimeout(pesquisaCampanha, 400);
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

function home() {

    location.hash = "";

    $viewer.innerHTML = "";

    let $buttonHome = document.querySelector("#imagem");
    let $buttonSingUp = document.querySelector("#singUp");
    let $buttonSingIn = document.querySelector("#singIn");

    $buttonHome.addEventListener('click', function () { home() } );
    $buttonSingUp.addEventListener('click', function () { cadastrarUsuario() });
    $buttonSingIn.addEventListener('click', function () { loginUsuario() });
}

function cadastrarUsuario() {
    location.hash = "/cadastro";

    let $template = templateCadastroUsuario;
    $viewer.innerHTML = $template.innerHTML;

    let $buttonCadastro = document.querySelector("#cadastro");
    $buttonCadastro.addEventListener('click', cadastro);
}

function loginUsuario() {
    location.hash = "/login";

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

    ajustaBotoesHeader('inline', 'none');
}

function ajustaBotoesHeader(desconectarBotao, botaoHome) {
    document.getElementById("desconectar").style.display = desconectarBotao;
    document.getElementById("singUp").style.display = botaoHome;
    document.getElementById("singIn").style.display = botaoHome;

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
    ajustaBotoesHeader('none', 'inline');
    home();
}


(async function init() {
    await Promise.all([fetchTemplates()]);

    let $campoBusca = document.querySelector("#search");
    $campoBusca.addEventListener('keyup', function () { buscarCampanha(); })

    let hash = location.hash;
    

    if (["", "#"].includes(hash)) {
        home();
    } else if (["#/login"].includes(hash)) {
        home();
        loginUsuario();
    } else if (["#/cadastro"].includes(hash)) {
        home();
        cadastrarUsuario();
    }
    
}());

let templateCadastroUsuario, templateLogin, templateHall, templateCadastroCampanha, templatePesquisaCampanha, templateResultadoBusca;
async function fetchTemplates() {
    let htmlTemplates = await (fetch('templates.html').then(r => r.text()));
    let e = document.createElement("div");
    e.innerHTML= htmlTemplates;

    templateCadastroUsuario = e.querySelector("#cadastrar");
    templateLogin = e.querySelector("#entrar");
    templateHall = e.querySelector("#hall");
    templateCadastroCampanha = e.querySelector("#cadastrarCampanha");
    templatePesquisaCampanha = e.querySelector("#pesquisarCampanha");
    templateResultadoBusca = e.querySelector("#resultadoBusca");
}