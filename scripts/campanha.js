let respostaAberta = false;
let comentarioAberto = false;

function exibeCampanha(urlCampanha, dados) {
    
    location.hash = "/" + urlCampanha;
    $viewer.innerHTML = '';
    
    $div = document.createElement("div");
    $viewer.appendChild($div);
    $div.id = "divCampanha";

    console.log(dados); //remover depois
    
    $div.innerText = "Campanha: " + dados.nomeCurto + "\n\n" +
    "Descrição: " + dados.descricao + "\n\n" +
    "Status: " + dados.status + "\n" +
    "DeadLine: " + dados.deadLine + "\n" +
    "Meta: " + dados.meta + "\n" +
    "Doações feitas: " + dados.doacoes + "\n\n" +
    "Autor: " + dados.infoDono.primeiroNome + " " + dados.infoDono.ultimoNome + "\n" +
    "Likes: " + dados.numeroDeLikes + "\n";

    
    $buttonDoadores = document.createElement("button");
    $buttonDoadores.id = "buttonDoadores";
    $buttonDoadores.innerText = "DOADORES";
    $div.appendChild($buttonDoadores);

    $buttonDoadores.addEventListener('click', function () { exibeDoadores(dados.nomeCurto, dados.doadores) })

    $buttonDoar = document.createElement("button");
    $div.appendChild($buttonDoar);

    $buttonDoar.innerText = "DOAR";
    $buttonDoar.id = "buttonDoar";
    $buttonDoar.addEventListener('click', function () { adicionaDoacao(dados.nomeCurto) });

    if (dados.comentarios.length !== 0) {
        dados.comentarios.forEach(comentario => {
            $div.appendChild(document.createElement("hr"));
            $p = document.createElement("p");
            $p.id = "comentario" + comentario.idComent;
            $p.class = "comentario"; // Confirmar alteração.
            
            $div.appendChild($p);

            $p.innerText = comentario.donoComentario.primeiroNome + " " + comentario.donoComentario.ultimoNome + ":\n" +
                            comentario.textoComentario + "\n";

            if (comentario.donoComentario.email === sessionStorage.getItem("email")) {
                $buttonDelete = document.createElement("button");
                $buttonDelete.id = "buttonDelete";
                $buttonDelete.innerText = "APAGAR";
                $p.appendChild($buttonDelete);

                $buttonDelete.addEventListener('click', comentarioDelete);
            }
            $buttonResposta = document.createElement("button");
            $buttonResposta.id = "buttonResposta" + comentario.idComent;
            $buttonResposta.innerText = "Exibir Respostas";

            $p.appendChild($buttonResposta);
            $buttonResposta.addEventListener('click', function () {
                if (!respostaAberta) {
                    exibeRespostas(comentario.respostas, comentario.idComent);
                    respostaAberta = true;
                }
            })
        });
        $div.appendChild(document.createElement("hr"));
    }

    criaBotoes($div, dados.infoDono.email);
}

function criaBotoes($div, emailDono) {
    $buttonComentario = document.createElement("button");
    $buttonLike = document.createElement("button");

    $div.appendChild($buttonComentario);
    $div.appendChild($buttonLike);

    $buttonComentario.id = "buttonComentario";
    $buttonLike.id = "buttonLike";

    $buttonComentario.innerText = "COMENTAR";
    
    $buttonLike.innerText = "CURTIR/DESCURTIR";
        
    $buttonComentario.addEventListener('click', function () { adicionarComentario($div); });
    $buttonLike.addEventListener('click', function () { setLike(); });
}

function setLike() {
    comentarioAberto = false;
    respostaAberta = false;
    like();
}

function adicionarComentario($div) {
    if (!comentarioAberto) {
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

    $buttonSend.addEventListener('click', function () { enviarComentario(); });
    comentarioAberto = true;
    }
}

function enviarComentario() {
    comentarioAberto = false;
    respostaAberta = false;
    comentario();
}

function exibeRespostas(respostas, idComentario) {
    $p = document.querySelector("#comentario" + idComentario);
    
    $inputResposta = document.createElement("input");
    $sendResposta = document.createElement("button");
    
    $p.appendChild(document.createElement("br"));
    $p.appendChild($inputResposta);
    $p.appendChild($sendResposta);
    $p.appendChild(document.createElement("br"));
    
    $inputResposta.placeholder = "Escreva sua resposta aqui";
    $sendResposta.innerText = "ENVIAR RESPOSTA!";
    
    $inputResposta.id = "inputResposta";
    $sendResposta.id = "sendResposta";
    $sendResposta.addEventListener('click', function () {
        resposta(idComentario);
    });

    respostas.forEach(resposta => {
        $pResposta = document.createElement("p");
        $pResposta.id = "pResposta";
        $p.appendChild($pResposta);
    
        $pResposta.innerText = resposta.donoResposta.primeiroNome + resposta.donoResposta.ultimoNome + ":\n" + resposta.textoResposta + "\n";
    
        // if (resposta.donoResposta.email === sessionStorage.getItem("email")) {
        //     $buttonDelete = document.createElement("button");
        //     $buttonDelete.id = "buttonDeleteResposta";
        //     $buttonDelete.innerText = "APAGAR";
        //     $pResposta.appendChild($buttonDelete);
    
        //     $buttonDelete.addEventListener('click', comentarioDelete);
        // }
    })
}

function adicionaDoacao(campanha) {

    location.hash += "/doacao";

    $viewer.innerHTML = `<h1>Doação para a campanha - ${campanha} -</h1>
                        <input id= "inputDoacao" placeholder="Valor a ser doado">
                        <button id="sendDoacao">ENVIAR DOAÇÃO</button>`;

    $sendDoacao = document.querySelector("#sendDoacao");

    $sendDoacao.addEventListener('click', doar);

}

function exibeDoadores(campanha, doadores) {

    location.hash += "/doadores";
    $viewer.innerHTML = `<h1>Doadores da campanha - ${campanha} -</h1>`;

    doadores.forEach(element => {
        $p = document.createElement("p");
        $p.id = "nomeDoador";
        $viewer.appendChild($p);

        $p.innerText = element.primeiroNome + element.ultimoNome;
        $p.href = element.urlUser;

        $p.addEventListener('click', function () { getDoador(element.urlUser) });
    })
}