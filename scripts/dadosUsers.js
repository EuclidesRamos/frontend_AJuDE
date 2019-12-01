let roteamentoUser = [];

async function recuperaDadosUsers() {
    await fetch(URL + "/usuarios/list",
    {
        'method':'GET',
        'headers':{'Content-Type':'application/json'}
    })
    .then(response => response.json())
    .then(dados => {
        salvaUrlUsers(dados);
    })
}

function salvaUrlUsers(dados) {
    dados.forEach(element => {
        roteamentoUser.push("#/" + element.urlUser);
    });
}