// let URL = "https://ajudeproject.herokuapp.com/api/v1";
let URL = "http://localhost:8080/api/v1";

let bufferTime = null;

function cadastro() {
    let primeiroNome = document.querySelector('#primeiroNome').value;
    let ultimoNome = document.querySelector('#ultimoNome').value;
    let email = document.querySelector('#email').value;
    let cartao = document.querySelector('#cartao').value;
    let senha = document.querySelector('#senha').value;

    if (!validaEmail(email)) {
        alert("Email invalido. Por favor, certifique-se que informou corretamente e tente novamente.");
        throw new Error("Email invalido. Por favor, certifique-se que informou corretamente e tente novamente.");
    } else if (!validaSenha(senha)) {
        alert("Senha menor que 8 caracteres. Por favor, tente com uma senha diferente");
        throw new Error("Senha menor que 8 caracteres. Por favor, tente com uma senha diferente");
    }
    fetch(URL + "/usuarios", 
    {
        'method':'POST',
        'body':`{"primeiroNome":"${primeiroNome}", "ultimoNome":"${ultimoNome}", "email":"${email}", "numCartao":"${cartao}", "senha":"${senha}"}`,
        'headers':{'Content-Type':'application/json'}
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Cadastro não realizado. Certifique-se que colocou as informações corretamente e tente novamente."); 
        } else {
            return response.json();
        }
    })
    .then(dados => {
        alert("Cadastro realizado com sucesso!");
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
        if (!response.ok) {
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
            console.log(response);
            if (!response.ok) {
                tokenExpirado(response);
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
    console.log(stringBusca);

    let urlMethod = "/campanha/busca/" + stringBusca;
    fetch(URL + urlMethod,
    {
        'method':'GET',
        'headers':{'Content-Type':'text/plain'}
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
    });
}

function getCampanha(urlCampanha) {
    if (!!sessionStorage.getItem(idToken)) {
        fetch(URL + "/campanha/" + urlCampanha,
        {
            'method':'GET',
            'headers': {'Authorization': 'Bearer ' + sessionStorage.getItem(idToken)}
        })
        .then(response => {
            if (!response.ok) {
                tokenExpirado(response);
                throw new Error("Pesquisa não realizada. Certifique-se que colocou as informações corretamente e tente novamente.")
            } else {
                return response.json();
            }
        })
        .then(dados => {
            exibeCampanha(urlCampanha, dados);
        })
        .catch(error => {
            alert(error);
        });
    } else {
        alert("É necessário realizar login para continuar.");
    }
}

function like() {
    urlCampanha = location.hash.substring(1);

    if (!!sessionStorage.getItem(idToken)) {
        fetch(URL + "/" + urlCampanha + "/like",
        {
            'method':'POST',
            'body': {},
            'headers': {'Content-Type':'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem(idToken)}
        })
        .then(response => {
            if (!response.ok) {
                tokenExpirado(response);
                throw new ("Não foi possível dar like. Por favor, tente novamente.");
            } else {
                return response.json();
            }
        })
        .then(dados => {

        })
        .catch(error => {
            alert(error);
        });
    }
}

function comentario() {
    comentario = document.querySelector("#inputComentario").value;
    urlCampanha = location.hash.substring(1);

    if (!!sessionStorage.getItem(idToken)) {
        fetch(URL + "/" + urlCampanha + "/comentario", 
        {
            'method':'POST',
            'body': `{"comentario: "${comentario}"}`,
            'headers': {'Content-Type':'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem(idToken)}
        })
        .then(response => {
            if (!response.ok) {
                tokenExpirado(response);
                throw new ("Não foi possível comentar. Por favor, tente novamente.");
            } else {
                return response.json();
            }
        })
        .then(dados => {
            alert("Comentario enviado.");
            getCampanha(urlCampanha);
        })
        .catch(error => {
            alert(error);
        })
    }
}

function exibeResultadoBusca(dados, stringBusca) {

    // location.hash = "/busca=" + stringBusca;
    $viewer.innerHTML = '';
    
    let $h1 = document.createElement("h1");
    $viewer.appendChild($h1);
    $h1.innerText = "Resultado da busca para - " + stringBusca + " -";

    let $div = document.createElement("div");
    $div.id = "result";
    $viewer.appendChild($div);

    $div.innerHTML = '';

    dados.forEach(element => {
        let $divQuadrado = document.createElement("div");
        $divQuadrado.id = "quadrado";
        $div.appendChild($divQuadrado);

        let $p = document.createElement("p");
        $p.id = "resultadoBuscaCampanha";
        $divQuadrado.appendChild($p);

        $p.innerText = element.nomeCurto;
        $p.href = element.url;
        
        $p.addEventListener('click', function () { getCampanha(element.url); });
    });
}


function exibeCampanha(urlCampanha, dados) {
    
    location.hash = urlCampanha;
    $viewer.innerHTML = '';
    
    $p = document.createElement("p");
    $viewer.appendChild($p);
    $p.id = "divCampanha";

    
    $p.innerText = "Campanha: " + dados.nomeCurto + "\n\n" +
    "Descrição: " + dados.descricao + "\n \n" +
    "DeadLine: " + dados.deadLine + "\n" +
    "Meta: " + dados.meta + "\n \n" +
    "Autor: " + dados.autor + "\n";
    
    $buttonComentario = document.createElement("button");
    $buttonLike = document.createElement("button");

    criaBotoes($p);
}

function criaBotoes($div) {
    $buttonComentario = document.createElement("button");
    $buttonLike = document.createElement("button");

    $div.appendChild($buttonComentario);
    $div.appendChild($buttonLike);

    $buttonComentario.id = "buttonComentario";
    $buttonLike.id = "buttonLike";

    $buttonComentario.innerText = "COMENTAR";
    $buttonLike.innerText = "CURTIR";
        
    $buttonComentario.addEventListener('click', function () { adicionarComentario($div); });
    $buttonLike.addEventListener('click', like);
}

function adicionarComentario($div) {
    $div.appendChild(document.createElement("br"));

    $input = document.createElement("input");
    $buttonSend = document.createElement("button");
    $buttonSend.id = "buttonSend";
    
    $div.appendChild($input);
    $div.appendChild(document.createElement("br"));
    $div.appendChild($buttonSend);

    $input.id = "inputComentario";

    $input.placeholder = "Escreva seu comentário aqui";
    $buttonSend.innerText = "ENVIAR!";

    $buttonSend.addEventListener('click', comentario);
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

    return parsed;
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
    
    sessionStorage.clear();

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
    } else {
        home();
    }
    
}());

let templateCadastroUsuario, templateLogin, templateHall, templateCadastroCampanha, templateResultadoBusca;
async function fetchTemplates() {
    let htmlTemplates = await (fetch('templates.html').then(r => r.text()));
    let e = document.createElement("div");
    e.innerHTML= htmlTemplates;

    templateCadastroUsuario = e.querySelector("#cadastrar");
    templateLogin = e.querySelector("#entrar");
    templateHall = e.querySelector("#hall");
    templateCadastroCampanha = e.querySelector("#cadastrarCampanha");
    templateResultadoBusca = e.querySelector("#resultadoBusca");
}