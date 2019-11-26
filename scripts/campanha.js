

function exibeCampanha(urlCampanha, dadosCampanha) {
    console.log("Fetch na Campanha.");
    location.hash = "/" + urlCampanha;
    $viewer.innerHTML = '';
    
    let $divCampanha = criaDivCampanha(dadosCampanha);
    let $buttonDoadores = criaBotaoDoadores($divCampanha, dadosCampanha);
    let $buttonDoar = criaBotaoDoar($divCampanha, dadosCampanha);
    let $buttonLike = criaBotaoLike($divCampanha, dadosCampanha);

    let $divComentar = criaDivComentar(dadosCampanha);
    let $inputComentar = criaEspacoComentario($divComentar, dadosCampanha);
    let $buttonComentar = criaBotaoComentar($divComentar, dadosCampanha);

    let $divComentarios = criaDivComentarios(dadosCampanha);

}

/* Div Campanha */
function criaDivCampanha(dadosCampanha) {
    $divCampanha = document.createElement("div");
    $viewer.appendChild($divCampanha);
    $divCampanha.id = "divCampanha";

    console.log(dadosCampanha); //remover depois
    
    $divCampanha.innerText = "Campanha: " + dadosCampanha.nomeCurto + "\n\n" +
    "Descrição: " + dadosCampanha.descricao + "\n\n" +
    "Status: " + dadosCampanha.status + "\n" +
    "DeadLine: " + dadosCampanha.deadLine + "\n" +
    "Meta: " + dadosCampanha.meta + "\n" +
    "Total de Doações: " + dadosCampanha.doacoes + "\n\n" +
    "Autor: " + dadosCampanha.infoDono.primeiroNome + " " + dadosCampanha.infoDono.ultimoNome + "\n" +
    "Likes: " + dadosCampanha.numeroDeLikes + "\n";
    return $divCampanha;
}

function criaBotaoDoadores($divCampanha, dadosCampanha) {
    $buttonDoadores = document.createElement("button");
    $divCampanha.appendChild($buttonDoadores);
    $buttonDoadores.id = "buttonDoadores";
    $buttonDoadores.innerText = "DOADORES";
    $buttonDoadores.addEventListener('click', function () { exibeDoadores(dadosCampanha.nomeCurto, dadosCampanha.doadores) });
    return $buttonDoadores;
}
/* Desenvolver essa Página */
function exibeDoadores(nomeCurtoCampanha, doadores) {
    location.hash += "/doadores";
    $viewer.innerHTML = `<h1>Doadores da campanha - ${nomeCurtoCampanha} -</h1>`;

    doadores.forEach(element => {
        $p = document.createElement("p");
        $p.id = "nomeDoador";
        $viewer.appendChild($p);

        $p.innerText = element.primeiroNome + element.ultimoNome;
        $p.href = element.urlUser;

        /* Criar o getDoador() - function getUsuario() talvez seja melhor */
        $p.addEventListener('click', function () { getDoador(element.urlUser) });
    })
}

function criaBotaoDoar($divCampanha, dadosCampanha) {
    $buttonDoar = document.createElement("button");
    $divCampanha.appendChild($buttonDoar);
    $buttonDoar.id = "buttonDoar";
    $buttonDoar.innerText = "DOAR";
    $buttonDoar.addEventListener('click', function () { adicionaDoacao(dadosCampanha.nomeCurto) });
    return $buttonDoar;
}
/* Desenvolver essa Página */
function adicionaDoacao(nomeCurtoCampanha) {
    location.hash += "/doacao";

    $viewer.innerHTML = `<h1>Doação para a campanha - ${nomeCurtoCampanha} -</h1>
                        <input id= "inputDoacao" placeholder="Valor a ser doado">
                        <button id="sendDoacao">ENVIAR DOAÇÃO</button>`;

    $sendDoacao = document.querySelector("#sendDoacao");

    $sendDoacao.addEventListener('click', doar);
}

function criaBotaoLike($divCampanha, dadosCampanha) {
    $buttonLike = document.createElement("button");
    $divCampanha.appendChild($buttonLike);
    $buttonLike.id = "buttonLike";
    $buttonLike.innerText = "CURTIR/DESCURTIR";
    $buttonLike.addEventListener('click', function () { setLike(); });
    return $buttonLike;
}
function setLike() {
    like();
}

/* Div Comentar */
function criaDivComentar(dadosCampanha) {
    $divComentar = document.createElement("div");
    $viewer.appendChild($divComentar);
    $divComentar.id = "divComentar";
    return $divComentar;
}
function criaBotaoComentar($divComentar, dadosDono) {
    $divComentar.appendChild(document.createElement("br"));
    $buttonComentar = document.createElement("button");
    $divComentar.appendChild($buttonComentar);
    $buttonComentar.id = "buttonComentario";
    $buttonComentar.innerText = "ENVIAR COMENTARIO";
    $buttonComentar.addEventListener('click', function () { comentar(); });
    return $buttonComentar;
}
function criaEspacoComentario($divComentar) {
    $input = document.createElement("input");
    $divComentar.appendChild($input);
    $input.id = "inputComentario";
    $input.placeholder = "Escreva seu comentário aqui";
    return $input;
}


/* Div Comentarios */
function criaDivComentarios(dadosCampanha) {
    $divComentarios = document.createElement("div");
    $viewer.appendChild($divComentarios);
    $divComentarios.id = "divComentarios";
    return insereListaComentarios($divComentarios, dadosCampanha);;
}
function insereListaComentarios($divComentarios, dadosCampanha) {
    if (dadosCampanha.comentarios.length !== 0) {
        dadosCampanha.comentarios.forEach(dadosComentario => {
            $divComentarios.appendChild(document.createElement("hr"));

            /* Paragrafo Comentario */
            let $pInfoComentario = exibeInfoComentario($divComentarios, dadosComentario);

            /* Criar Resposta referenciada ao Comentario */
            let $inputCriaResposta = criaEspacoResposta($divComentarios);
            let $buttonEnviaResposta = criaBotaoResponder($divComentarios, dadosComentario);

            /* Inicialmente não exibe respostas */
            let $divRespostas = criaDivRespostas($divComentarios, dadosComentario);
            
        });
        $divComentarios.appendChild(document.createElement("hr"));
    }
    return $divComentarios;
}

function exibeInfoComentario($divComentarios, dadosComentario) {
    let $pInfoComentario = document.createElement("p");
    $divComentarios.appendChild($pInfoComentario);
    $pInfoComentario.id = "comentario" + dadosComentario.idComent;
    $pInfoComentario.innerText = dadosComentario.donoComentario.primeiroNome + " " 
                                + dadosComentario.donoComentario.ultimoNome + ":\n"
                                + dadosComentario.textoComentario + "\n";
    return permissaoDeletarComentario($pInfoComentario, dadosComentario);
}
function permissaoDeletarComentario($pInfoComentario, dadosComentario) {
    if (dadosComentario.donoComentario.email === sessionStorage.getItem("email")) {
        let $buttonDelete = document.createElement("button");
        $pInfoComentario.appendChild($buttonDelete);
        $buttonDelete.id = "buttonDelete";
        $buttonDelete.innerText = "APAGAR COMENTARIO";
        /* Desenvolver Fetch deleteComentario */
        $buttonDelete.addEventListener('click', comentarioDelete);
    }
    return $pInfoComentario;
}

function criaEspacoResposta($divComentarios) {
    $divComentarios.appendChild(document.createElement("br"));
    $inputResposta = document.createElement("input");
    $divComentarios.appendChild($inputResposta);
    $inputResposta.id = "inputResposta";
    $inputResposta.placeholder = "Escreva sua resposta aqui";
    return $inputResposta;
}
function criaBotaoResponder($divComentarios, dadosComentario) {
    $divComentarios.appendChild(document.createElement("br"));
    $buttonResponder = document.createElement("button");
    $divComentarios.appendChild($buttonResponder);
    $buttonResponder.id = "sendResposta";
    $buttonResponder.innerText = "ENVIAR RESPOSTA";
    $buttonResponder.addEventListener('click', function () { responder(dadosComentario.idComent); });
    return $buttonResponder;
}

function criaDivRespostas($divComentarios, dadosComentario) {
    let $divRespostas = document.createElement("div");
    $divComentarios.appendChild($divRespostas);
    $divRespostas.id = "divListaComentarios";

    let $buttonExibirResposta = criaBotaoExibirResposta($divRespostas, dadosComentario);
    
    return $divRespostas;
} 
function criaBotaoExibirResposta($divRespostas, dadosComentario) {
    $buttonExibirResposta = document.createElement("button");
    $divRespostas.appendChild($buttonExibirResposta);
    $buttonExibirResposta.id = "buttonResposta" + dadosComentario.idComent;
    $buttonExibirResposta.innerText = "Exibir Respostas";
    $buttonExibirResposta.addEventListener('click', function () { insereListaRespostas($divRespostas, dadosComentario.respostas); })
    return $buttonExibirResposta;
}
function insereListaRespostas($divRespostas, respostas) {
    respostas.forEach(resposta => {
        let $pResposta = document.createElement("p");
        $divRespostas.appendChild($pResposta);
        $pResposta.id = "pResposta";
    
        $pResposta.innerText = resposta.donoResposta.primeiroNome + resposta.donoResposta.ultimoNome +
                             ":\n" + resposta.textoResposta + "\n";   
    })
}
