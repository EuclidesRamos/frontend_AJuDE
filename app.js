let $mensagemCadastro = document.querySelector("#mensagemCadastro");
let $mensagemLogin = document.querySelector("#mensagemLogin");
let $mensagemCadastroCampanha = document.querySelector('#mensagemCadastroCampanha');

let URL = "http://ajudeproject.herokuapp.com/api/v1";

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
            'body':`{"nomeCurto":"${nomeCurto}", "descricao":"${descricao}", "deadLine":"${deadLine}", "meta":${meta} }`,
            'headers':{'Content-Type':'appication/json', 'Autorization': 'Bearer' + sessionStorage.getItem(idToken)}
        })
        .then(response => response.json())
        .then(dados => {
            let urlCampanha = dados.url;
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
            fetchCampanha(dados);
        });
    } else {
        alert("USUÁRIO NÃO ESTÁ LOGADO!");
    }
}

function fetchCampanha(dados) {
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
        
        let $br = document.createElement("br");
        $campanhas.appendChild($br);
    });

}

// private String createURL(String nomeCurto) {
//     String saida = nomeCurto.replace(".", " ").replace(",", " ").replace("-", " ")
//             .replace("_", " ");
//     saida = Normalizer.normalize(saida, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
//     saida = saida.toLowerCase();
//     saida = removeDuploEspaco(saida);
//     saida = saida.replaceAll(" ", "-");
//     return saida;
// }

// private String removeDuploEspaco(String nomeCurto) {
//     String saida = "";
//     for (int i = 1; i < nomeCurto.length(); i++) {
//         if (!(nomeCurto.charAt(i) == ' ' & nomeCurto.charAt(i - 1) == ' ')) {
//             saida += nomeCurto.charAt(i-1);
//         }
//     }
//     return saida;
// }

function createURL(nomeCurto) {
    const parsed = str.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-z])/g, '');
    console.log(parsed);
}

function removeAcento (text)
{       
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
    if (!!sessionStorage.getItem(idToken)) {
        hall();
    } else {
        document.getElementById('cadastrar').style.display = 'none';
        document.getElementById('entrar').style.display = 'none';
            
        document.getElementById('singUp').style.display = 'inline';
        document.getElementById('singIn').style.display = 'inline';
        
        document.getElementById('hall').style.display = 'none';
        document.getElementById('desconectar').style.display = 'none';
        document.getElementById('cadastrarCampanha').style.display = 'none';
        document.getElementById('pesquisarCampanha').style.display = 'none';
    }
}

function hall() {
    document.getElementById('cadastrar').style.display = 'none';
    document.getElementById('entrar').style.display = 'none';
    document.getElementById('singUp').style.display = 'none';
    document.getElementById('singIn').style.display = 'none';

    document.getElementById('hall').style.display = 'block';
    document.getElementById('desconectar').style.display = 'inline';

    document.getElementById('cadastrarCampanha').style.display = 'none';
    document.getElementById('pesquisarCampanha').style.display = 'none';
    document.getElementById('resultadoBusca').style.display = 'none';

}

function exibeCadastraCampanha() {
    document.getElementById('hall').style.display = 'none';
    document.getElementById('cadastrarCampanha').style.display = 'block';
}

function exibePesquisarCampanha() {
    document.getElementById('hall').style.display = 'none';
    document.getElementById('pesquisarCampanha').style.display = 'block';
}

function desconectar() {
    if (!!sessionStorage.getItem(idToken)) {
        sessionStorage.removeItem(idToken);
    }
    home();
}


(function init() {
    console.log("aa");
    createURL('ÁÉÍÓÚáéíóúâêîôûàèìòùÇç/.,~!@#$%&_-12345');

    // Botões HOME
    let $buttonHome = document.querySelector("#imagem");
    let $buttonSingUp = document.querySelector("#singUp");
    let $buttonSingIn = document.querySelector("#singIn");
    
    // Botões ENVIAR FORMULÁRIO
    let $buttonCadastro = document.querySelector("#cadastro");
    let $buttonLogin = document.querySelector("#login");
    
    let $buttonCampanhaCadastro = document.querySelector('#campanhaCadastro');
    let $buttonPesquisaCampanha = document.querySelector("#campanhaPesquisa");

    // Botões HALL (Após Login)
    let $buttonDesconectar = document.querySelector("#desconectar");
    let $buttonExibirCadastrarCampanha = document.querySelector("#exibirCadastraCampanha");
    let $buttonExibirPesquisarCampanha = document.querySelector("#exibePesquisarCampanha");

    // Eventos Botões HOME
    $buttonHome.addEventListener('click', function () { home() });
    $buttonSingUp.addEventListener('click', function () { mudarEstado('cadastrar', 'entrar') });
    $buttonSingIn.addEventListener('click', function () { mudarEstado('entrar', 'cadastrar') });
    
    // Eventos Botões ENVIAR FORMULÁRIO
    $buttonCadastro.addEventListener('click', cadastro);
    $buttonLogin.addEventListener('click', login);

    $buttonCampanhaCadastro.addEventListener('click', cadastraCampanha);
    $buttonPesquisaCampanha.addEventListener('click', pesquisaCampanha);

    // Eventos Botões HALL (Após Login)
    $buttonDesconectar.addEventListener('click', function () { desconectar() });
    $buttonExibirCadastrarCampanha.addEventListener('click', function () { exibeCadastraCampanha() });
    $buttonExibirPesquisarCampanha.addEventListener('click', function () { exibePesquisarCampanha() });
}());