function exibeUsuario(dadosPaginaUsuario) {
    location.hash = "/" + dadosPaginaUsuario.urlUser;
    $viewer.innerHTML = '';
    
    $divUsuario = criaDivUsuario(dadosPaginaUsuario);

    listaCampanhasCriadas(dadosPaginaUsuario, $divUsuario);
    listaDoacoesFeitas(dadosPaginaUsuario, $divUsuario);

}

function criaDivUsuario(dadosPaginaUsuario) {
    $divUsuario = document.createElement("div");

    $container = document.createElement("div");
    $container.classList.add("container");
    $container.appendChild($divUsuario);

    $viewer.appendChild($container);
    $divUsuario.id = "divUsuario";
    
    $h1 = document.createElement("h1");
    $divUsuario.appendChild($h1);
    $h1.id = "usuarioNome";
    $h1.innerText = dadosPaginaUsuario.primeiroNome + " " + dadosPaginaUsuario.ultimoNome;

    $pEmail = document.createElement("p");
    $divUsuario.appendChild($pEmail);
    $pEmail.innerText = "Email: " + dadosPaginaUsuario.email + "\n\n";

    $divUsuario.appendChild(document.createElement("hr"));
    
    $viewer.appendChild(document.createElement("hr"));
    return $divUsuario;
}

function listaCampanhasCriadas(dadosPaginaUsuario, $divUsuario) {
    $divListaCampanhas = document.createElement("div");
    $divUsuario.appendChild($divListaCampanhas);
    $divListaCampanhas.id = "divListaCampanhas";

    $pTitulo = document.createElement("p");
    $divListaCampanhas.appendChild($pTitulo);
    $pTitulo.classList.add("tituloUser");

    $pTitulo.innerText = "Campanhas criadas: \n";

    if (dadosPaginaUsuario.campanhasCriadas.length !== 0) {
        dadosPaginaUsuario.campanhasCriadas.forEach(dadosCampanha => {
            $divCampanha = document.createElement("div");
            $divListaCampanhas.appendChild($divCampanha);
            $divCampanha.classList.add("campanhaPerfil");

            $linkCampanha = document.createElement("div");
            $divCampanha.appendChild($linkCampanha);

            $linkCampanha.classList.add("linkCampanha");

            $linkCampanha.innerText = dadosCampanha.nomeCurto + " - " + dadosCampanha.status + " - " + dadosCampanha.doacoes + "/" + dadosCampanha.meta;
            $linkCampanha.href = "#/" + dadosCampanha.url;

            $linkCampanha.addEventListener('click', () => getCampanha(dadosCampanha.url));

        });
    }
}

function listaDoacoesFeitas(dadosPaginaUsuario, $divUsuario) {
    $divListaDoacoesFeitas = document.createElement("div");
    $divUsuario.appendChild($divListaDoacoesFeitas);
    $divListaDoacoesFeitas.id = "divListaDoacoesFeitas";

    $pTitulo = document.createElement("p");
    $divListaCampanhas.appendChild($pTitulo);
    $pTitulo.classList.add("tituloUser");

    $pTitulo.innerText = "Doações Feitas: \n";

    if (dadosPaginaUsuario.doacoesRealizadas.length !== 0) {
        dadosPaginaUsuario.doacoesRealizadas.forEach(dadosDoacao => {
            
            campanhaComDoacao = dadosDoacao.campanhaDTO;
            
            $divCampanha = document.createElement("div");
            $divListaDoacoesFeitas.appendChild($divCampanha);
            $divCampanha.classList.add("campanhaPerfil");

            $linkCampanha = document.createElement("div");
            $divCampanha.appendChild($linkCampanha);

            $linkCampanha.classList.add("linkCampanha");

            $linkCampanha.innerText = campanhaComDoacao.nomeCurto + " - " + campanhaComDoacao.status + " - " +
            campanhaComDoacao.doacoes + "/" + campanhaComDoacao.meta;
            $linkCampanha.href = "#/" + campanhaComDoacao.url;

            $linkCampanha.addEventListener('click', () => getCampanha(campanhaComDoacao.url));

        });
    }
}