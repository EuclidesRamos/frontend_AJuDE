
function exibeUsuario(dadosPaginaUsuario) {
    location.hash = "/" + dadosPaginaUsuario.urlUser;
    $viewer.innerHTML = '';
    
    criaDivUsuario(dadosPaginaUsuario);

    listaCampanhasCriadas(dadosPaginaUsuario);
    listaDoacoesFeitas(dadosPaginaUsuario);

}

function criaDivUsuario(dadosPaginaUsuario) {
    $divUsuario = document.createElement("div");
    $viewer.appendChild($divUsuario);
    $divUsuario.id = "divCampanha";
    
    $divUsuario.innerText = "Usuário: " + dadosPaginaUsuario.primeiroNome + dadosPaginaUsuario.ultimoNome + "\n\n" +
    "Email: " + dadosPaginaUsuario.email + "\n\n";
}

function listaCampanhasCriadas(dadosPaginaUsuario) {
    $divListaCampanhas = document.createElement("div");
    $viewer.appendChild($divListaCampanhas);
    $divListaCampanhas.id = "divListaCampanhas";

    /* Colocar como título, aqui: Campanhas Criadas */

    if (dadosPaginaUsuario.campanhasCriadas.length !== 0) {
        dadosPaginaUsuario.campanhasCriadas.forEach(dadosCampanha => {
            $divCampanha = document.createElement("div");
            $divListaCampanhas.appendChild($divCampanha);

            $linkCampanha = document.createElement("a");
            $divCampanha.appendChild($linkCampanha);

            $linkCampanha.id = "campanha" + dadosCampanha.url;

            $linkCampanha.innerText = dadosCampanha.nomeCurto + " " + dadosCampanha.status + " " +
            dadosCampanha.doacoes + "/" + dadosCampanha.meta;
            $linkCampanha.href = "#/" + dadosCampanha.url;

            $linkCampanha.addEventListener('click', () => getCampanha(dadosCampanha.url));

        });
    }
}

function listaDoacoesFeitas(dadosPaginaUsuario) {
    $divListaDoacoesFeitas = document.createElement("div");
    $viewer.appendChild($divListaDoacoesFeitas);
    $divListaDoacoesFeitas.id = "divListaDoacoesFeitas";

    /* Colocar como título, aqui: Doações Realizadas */

    if (dadosPaginaUsuario.doacoesRealizadas.length !== 0) {
        dadosPaginaUsuario.doacoesRealizadas.forEach(dadosDoacao => {
            
            campanhaComDoacao = dadosDoacao.campanhaDTO;
            
            $divCampanha = document.createElement("div");
            $divListaDoacoesFeitas.appendChild($divCampanha);

            $linkCampanha = document.createElement("a");
            $divCampanha.appendChild($linkCampanha);

            $linkCampanha.id = "campanha" + campanhaComDoacao.url;

            $linkCampanha.innerText = campanhaComDoacao.nomeCurto + " " + campanhaComDoacao.status + " " +
            campanhaComDoacao.doacoes + "/" + campanhaComDoacao.meta;
            $linkCampanha.href = "#/" + campanhaComDoacao.url;

            $linkCampanha.addEventListener('click', () => getCampanha(campanhaComDoacao.url));

        });
    }
}