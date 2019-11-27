

function exibeCampanha(urlCampanha, dadosCampanha) {
    location.hash = "/" + urlCampanha;
    $viewer.innerHTML = '';
    
    let $divCampanha = criaDivCampanha(dadosCampanha);
    criaBotaoDoadores($divCampanha, dadosCampanha);
    criaBotaoDoar($divCampanha, dadosCampanha);
    criaBotaoLike($divCampanha);

    let $divComentar = criaDivComentar();
    criaInputComentar($divComentar);
    criaBotaoComentar($divComentar);

    criaDivComentarios(dadosCampanha);

}

/* Div Campanha */
function criaDivCampanha(dadosCampanha) {
    $divCampanha = document.createElement("div");
    $viewer.appendChild($divCampanha);
    $divCampanha.id = "divCampanha";
    
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
    $buttonDoadores.addEventListener('click', () => exibeDoadores(dadosCampanha.nomeCurto, dadosCampanha.doadores));
    return $buttonDoadores;
}
function exibeDoadores(nomeCurtoCampanha, doadores) {
    location.hash += "/doadores";
    $viewer.innerHTML = `<h1>Doadores da campanha - ${nomeCurtoCampanha} -</h1>`;

    doadores.forEach(doador => {
        $usuarioReferenciado = document.createElement("a");
        
        $usuarioReferenciado.id = "nomeDoador" + doador.urlUser;
        $viewer.appendChild($usuarioReferenciado);
        $viewer.appendChild(document.createElement("br"));

        $usuarioReferenciado.innerText = doador.primeiroNome + " " + doador.ultimoNome;
        $usuarioReferenciado.href = "#/user/" + doador.urlUser;

        $usuarioReferenciado.addEventListener('click', () => getUsuario(doador));
    })
}

function criaBotaoDoar($divCampanha, dadosCampanha) {
    $buttonDoar = document.createElement("button");
    $divCampanha.appendChild($buttonDoar);
    $buttonDoar.id = "buttonDoar";
    $buttonDoar.innerText = "DOAR";
    $buttonDoar.addEventListener('click', () => adicionaDoacao(dadosCampanha.nomeCurto));
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

function criaBotaoLike($divCampanha) {
    $buttonLike = document.createElement("button");
    $divCampanha.appendChild($buttonLike);
    $buttonLike.id = "buttonLike";
    $buttonLike.innerText = "CURTIR/DESCURTIR";
    $buttonLike.addEventListener('click', () => setLike());
    return $buttonLike;
}
function setLike() {
    like();
}

/* Div Comentar */
function criaDivComentar() {
    $divComentar = document.createElement("div");
    $viewer.appendChild($divComentar);
    $divComentar.id = "divComentar";
    return $divComentar;
}
function criaInputComentar($divComentar) {
    $inputComentario = document.createElement("input");
    $divComentar.appendChild($inputComentario);
    $inputComentario.id = "inputComentario";
    $inputComentario.placeholder = "Escreva seu comentário aqui";
    return $inputComentario;
}
function criaBotaoComentar($divComentar) {
    $divComentar.appendChild(document.createElement("br"));
    $buttonComentar = document.createElement("button");
    $divComentar.appendChild($buttonComentar);
    $buttonComentar.id = "buttonComentario";
    $buttonComentar.innerText = "ENVIAR COMENTARIO";
    $buttonComentar.addEventListener('click', () => comentar());
    return $buttonComentar;
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
            if (!dadosComentario.apagado) { 
                $divComentarios.appendChild(document.createElement("hr"));     

                /* Paragrafo Comentario */
                exibeInfoComentario($divComentarios, dadosComentario);

                /* Criar Resposta referenciada ao Comentario */
                criaEspacoResposta($divComentarios, dadosComentario);
                criaBotaoResponder($divComentarios, dadosComentario);

                /* Inicialmente não exibe respostas */
                criaDivListaRespostas($divComentarios, dadosComentario);
            }
        });
    }
    return $divComentarios;
}

function exibeInfoComentario($divComentarios, dadosComentario) {
    $pInfoComentario = document.createElement("p");
    $divComentarios.appendChild($pInfoComentario);
    $pInfoComentario.id = "comentario" + dadosComentario.idComent;
    $pInfoComentario.innerText = dadosComentario.donoComentario.primeiroNome + " " 
                                + dadosComentario.donoComentario.ultimoNome + ":\n"
                                + dadosComentario.textoComentario + "\n";
    return permissaoDeletarComentario($pInfoComentario, dadosComentario);
}
function permissaoDeletarComentario($pInfoComentario, dadosComentario) {
    if (dadosComentario.donoComentario.email === sessionStorage.getItem("email")) {
        $buttonDeleteComentario = document.createElement("button");
        $pInfoComentario.appendChild($buttonDeleteComentario);
        $buttonDeleteComentario.id = "buttonDeleteComentario";
        $buttonDeleteComentario.innerText = "APAGAR COMENTARIO";
        $buttonDeleteComentario.addEventListener('click', function () { comentarioDelete(dadosComentario.donoComentario, dadosComentario.idComent) });
    }
    return $pInfoComentario;
}

function criaEspacoResposta($divComentarios, dadosComentario) {
    $divComentarios.appendChild(document.createElement("br"));
    $inputResposta = document.createElement("input");
    $divComentarios.appendChild($inputResposta);
    $inputResposta.id = "inputResposta" + dadosComentario.idComent;
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

    /* Div Respostas */
    function criaDivListaRespostas($divComentarios, dadosComentario) {
        let $divListaRespostas = document.createElement("div");
        $divComentarios.appendChild($divListaRespostas);
        $divListaRespostas.id = "divListaComentarios";

        criaBotaoExibirResposta($divListaRespostas, dadosComentario);
        
        return $divListaRespostas;
    } 
    function criaBotaoExibirResposta($divListaRespostas, dadosComentario) {
        $buttonExibirResposta = document.createElement("button");
        $divListaRespostas.appendChild($buttonExibirResposta);
        $buttonExibirResposta.id = "buttonExibirResposta" + dadosComentario.idComent;
        $buttonExibirResposta.innerText = "Exibir Respostas";
        $buttonExibirResposta.addEventListener('click', function () { insereListaRespostas(dadosComentario, $divListaRespostas, dadosComentario.respostas); })
        return $buttonExibirResposta;
    }
    function insereListaRespostas(dadosComentario, $divListaRespostas, respostas) {
        let existeNaoApagada = false;
        respostas.forEach(dadosResposta => {
            if (!dadosResposta.apagada) {
                existeNaoApagada = true;
                $divListaRespostas.appendChild(document.createElement("hr"));
                
                exibeInfoResposta(dadosComentario, $divListaRespostas, dadosResposta);
                
            }
        })
        if (existeNaoApagada) {
            document.querySelector("#buttonExibirResposta" + dadosComentario.idComent)
            .style.display = 'none';
        }
    }
    function exibeInfoResposta(dadosComentario, $divListaRespostas, dadosResposta) {
        $divResposta = document.createElement("div");
        $divListaRespostas.appendChild($divResposta);
        $divResposta.id = "divResposta" + dadosResposta.idResposta;
    
        $divResposta.innerText = dadosResposta.donoResposta.primeiroNome + " " + dadosResposta.donoResposta.ultimoNome +
                            ":\n" + dadosResposta.textoResposta + "\n";
        
        return permissaoDeletarResposta(dadosComentario, $divResposta, dadosResposta);
    }
    function permissaoDeletarResposta(dadosComentario, $divResposta, dadosResposta) {
        if (dadosResposta.donoResposta.email === sessionStorage.getItem("email")) {
            let $buttonDeleteResposta = document.createElement("button");
            $divResposta.appendChild($buttonDeleteResposta);
            $buttonDeleteResposta.id = "buttonDeleteResposta";
            $buttonDeleteResposta.innerText = "APAGAR RESPOSTA";
            $buttonDeleteResposta.addEventListener('click', function () { respostaDelete(dadosComentario.idComent, dadosResposta.donoResposta, dadosResposta.idResposta) });
        }
        return $divResposta;
    }
    
