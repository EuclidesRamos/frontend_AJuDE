let $viewer = document.querySelector("#viewer");

function home(boolean) {

    if (boolean) {
        location.hash = "";
    }

    $viewer.innerHTML = "";

    let $buttonHome = document.querySelector("#imagem");
    let $buttonSingUp = document.querySelector("#singUp");
    let $buttonSingIn = document.querySelector("#singIn");

    $buttonHome.addEventListener('click', async function () {
        await home(true);
        exibeCampanhasTop5();
    });
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

function hall(boolean) {

    if (boolean) {
        location.hash = "/user";
    }

    let $template = templateHall;
    $viewer.innerHTML = $template.innerHTML;

    let $buttonHome = document.querySelector("#home");
    let $buttonDesconectar = document.querySelector("#desconectar");
    let $buttonExibirCadastrarCampanha = document.querySelector("#exibirCadastraCampanha");

    $buttonHome.style.display = "inline";
    $buttonHome.addEventListener('click', function () { hall(true) });
    $buttonDesconectar.addEventListener('click', function () { desconectar() });
    $buttonExibirCadastrarCampanha.addEventListener('click', function () { exibeCadastraCampanha() });

    ajustaBotoesHeader('inline', 'none');
}

function ajustaBotoesHeader(botaoHall, botaoHome) {
    document.getElementById("desconectar").style.display = botaoHall;
    document.getElementById("home").style.display = botaoHall;
    document.getElementById("singUp").style.display = botaoHome;
    document.getElementById("singIn").style.display = botaoHome;

}

function exibeCadastraCampanha() {
    let $template = templateCadastroCampanha;
    $viewer.innerHTML = $template.innerHTML;

    let $buttonCampanhaCadastro = document.querySelector('#campanhaCadastro');
    $buttonCampanhaCadastro.addEventListener('click', cadastraCampanha);
}