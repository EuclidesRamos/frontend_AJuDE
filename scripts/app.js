// const URL = "https://ajudeproject.herokuapp.com/api/v1";
const URL = "http://localhost:8080/api/v1";
let bufferTime = null;

function cadastro() {
    let primeiroNome = document.querySelector('#primeiroNome').value;
    let ultimoNome = document.querySelector('#ultimoNome').value;
    let email = document.querySelector('#email').value;
    let cartao = document.querySelector('#cartao').value;
    let senha = document.querySelector('#senha').value;

    let urlUser = createURL(primeiroNome + " " + ultimoNome);

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
        'body':`{"primeiroNome":"${primeiroNome}", "ultimoNome":"${ultimoNome}", "email":"${email}", "numCartao":"${cartao}", "senha":"${senha}", "urlUser":"${urlUser}"}`,
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
        console.log(dados);
        roteamentoUser.push("#/" + dados.URLUser);
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
        sessionStorage.setItem("email", email);
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
                tokenExpirado(response);
                throw new Error("Cadastro de Campanha não realizado. Certifique-se que colocou as informações corretamente e tente novamente.");
            } else {
                return response.json();
            }
        })
        .then(dados => {
            roteamentoCampanha.push("#/" + dados.url);
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

function pesquisaCampanha(stringBusca) {

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
        .then(async (response) => {
            if (!response.ok) {
                await tokenExpirado(response);
                throw new Error("Não foi possível exibir a Campanha. Tente novamente mais tarde.")
            } else {
                return response.json();
            }
        })
        .then(dadosCampanha => {
            exibeCampanha(urlCampanha, dadosCampanha);
        })
        .catch(error => {
            alert(error);
        });
    } else {
        alert("É necessário realizar login para continuar.");
    }
}

function like() {
    let urlCampanha = location.hash.substring(2);

    if (!!sessionStorage.getItem(idToken)) {
        fetch(URL + "/campanha/" + urlCampanha + "/like",
        {
            'method':'POST',
            'body': {},
            'headers': {'Content-Type':'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem(idToken)}
        })
        .then(response => {
            if (!response.ok) {
                tokenExpirado(response);
                throw new Error("Não foi possível dar like. Por favor, tente novamente.");
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
    }
}

function comentar() {
    let textoComentario = document.querySelector("#inputComentario").value;
    let urlCampanha = location.hash.substring(2);

    if (!!sessionStorage.getItem(idToken)) {
        fetch(URL + "/campanha/" + urlCampanha + "/comentario", 
        {
            'method':'POST',
            'body': `{"textoComentario":"${textoComentario}"}`,
            'headers': {'Content-Type':'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem(idToken)}
        })
        .then(response => {
            if (!response.ok) {
                tokenExpirado(response);
                throw new Error("Não foi possível comentar. Por favor, tente novamente.");
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

function comentarioDelete(donoComentario, idComent) {
    let urlCampanha = location.hash.substring(2);

    if (!!sessionStorage.getItem(idToken)) {
        if (donoComentario.email === sessionStorage.getItem("email")) {
            fetch(URL + "/campanha/" + urlCampanha + "/apagarComentario/"  + idComent,
        {
            'method':'POST',
            'body': {},
            'headers': {'Content-Type':'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem(idToken)}
        })
        .then(response => {
            if (!response.ok) {
                tokenExpirado(response);
                throw new Error("Não foi possível Apagar o Comentario. Por favor, tente novamente.");
            } else {
                return response.json();
            }
        })
        .then(dados => {
            alert("Comentário apagado com sucesso!");
            getCampanha(urlCampanha);
        })
        .catch(error => {
            alert(error);
        });
        }
        else {
            throw new Error("Você não tem permissão para Apagar esse Comentário.");
        }
    }
}

function responder(idComent) {
    let textoResposta = document.querySelector("#inputResposta" + idComent).value;
    let urlCampanha = location.hash.substring(2);

    if (!!sessionStorage.getItem(idToken)) {
        fetch(URL + "/campanha/" + urlCampanha + "/comentario/" + idComent, 
        {
            'method':'POST',
            'body':`{"textoResposta":"${textoResposta}"}`,
            'headers': {'Content-Type':'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem(idToken)}
        })
        .then(response => {
            if (!response.ok) {
                tokenExpirado(response);
                throw new Error("Não foi possível responder. Por favor, tente novamente.");
            } else {
                return response.json();
            }
        })
        .then(dados => {
            alert("Resposta enviada.");
            getCampanha(urlCampanha);
        })
        .catch(error => {
            alert(error);
        })
    }
}

function respostaDelete(idComent, donoResposta, idResposta) {
    let urlCampanha = location.hash.substring(2);
    
    if (!!sessionStorage.getItem(idToken)) {
        if (donoResposta.email === sessionStorage.getItem("email")) {
            fetch(URL + "/campanha/" + urlCampanha + "/comentario/"  + idComent + "/apagarResposta/" + idResposta,
        {
            'method':'POST',
            'body': {},
            'headers': {'Content-Type':'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem(idToken)}
        })
        .then(response => {
            if (!response.ok) {
                tokenExpirado(response);
                throw new Error("Não foi possível Apagar a Resposta. Por favor, tente novamente.");
            } else {
                return response.json();
            }
        })
        .then(dados => {
            alert("Resposta apagada com sucesso!");
            getCampanha(urlCampanha);
        })
        .catch(error => {
            alert(error);
        });
        }
        else {
            throw new Error("Você não tem permissão para Apagar essa Resposta.");
        }
    }
}

function doar() {
    let valorDoacao = document.querySelector("#inputDoacao").value;
    let url = location.hash.substring(2);
    
    let now = new Date();
    let date = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();

    if (isNumber(valorDoacao)) {
        if (!!sessionStorage.getItem(idToken)) {
            fetch(URL + "/campanha/" + url,
            {
                'method':'POST',
                'body':`{"dataDeDoacao":"${date}","quantia":"${valorDoacao}"}`,
                'headers': {'Content-Type':'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem(idToken)}
            })
            .then(response => {
                if (!response.ok) {
                    tokenExpirado(response);
                    throw new Error("Não foi possível realizar a doação. Por favor, tente novamente.");
                } else {
                    return response.json();
                }
            })
            .then(dados => {
                console.log(dados);
                alert("Doação realizada. Obrigado!");
            })
            .catch(error => {
                alert(error);
            })
        }
    }
}

function exibeResultadoBusca(dados, stringBusca) {

    location.hash = "/busca/" + stringBusca;
    $viewer.innerHTML = '';
    
    let $h1 = document.createElement("h1");
    $viewer.appendChild($h1);
    $h1.innerText = "Resultado da busca para - " + stringBusca + " -";


    dados.forEach(element => {
        let $div = document.createElement("div");
        $div.id = "quadrado";
        $viewer.appendChild($div);

        let $p = document.createElement("div");
        $p.id = "resultadoBuscaCampanha";
        $div.appendChild($p);

        $p.innerText = element.nomeCurto;
        $p.href = element.url;
        
        $p.addEventListener('click', function () { getCampanha(element.url); });
    });
}

function buscarCampanha() {
    if (bufferTime != null) {
        clearTimeout(bufferTime);
    }

    
    bufferTime = setTimeout(function () {
        let stringBusca = document.querySelector("#search").value;
        pesquisaCampanha(stringBusca);
    }, 500);
}

function createURL(nomeCurto) {
    let parsed = removeAcento(nomeCurto);
    parsed = removeDuploEspaco(parsed);
    parsed = trocaEspacoPorTraco(parsed);

    return parsed;
}

function desconectar() {
    if (!!sessionStorage.getItem(idToken) && !!sessionStorage.getItem("email")) {
        sessionStorage.removeItem(idToken);
        sessionStorage.removeItem("email");
    }
    ajustaBotoesHeader('none', 'inline');
    home();
}


(async function init() {
    await Promise.all([fetchTemplates()]);
    
    await recuperaDados(); // Recupera todas as urls de todas as campanhas e usuários já cadastrados

    let $campoBusca = document.querySelector("#search");
    $campoBusca.addEventListener('keyup', function () { buscarCampanha(); })

    await roteamento();    
}());

function roteamento() {
    let hash = location.hash;

    home(false);
    if (["", "#"].includes(hash)) {
        home(true);
    } else if (["#/login"].includes(hash)) {
        loginUsuario();
    } else if (["#/cadastro"].includes(hash)) {
        cadastrarUsuario();
    } else if (roteamentoCampanha.includes(hash)) {
        getCampanha(hash.substring(2));
    } else if (roteamentoUser.includes(hash)) {
        console.log("errado");
        // a fazer
    } else if (["busca"].includes(hash.split("/")[1])) {
        console.log("errado");
        pesquisaCampanha(hash.split("/")[2]);
    }
}

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