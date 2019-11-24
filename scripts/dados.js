let roteamentoCampanha = [];
let roteamentoUser = [];

async function recuperaDados() {
    await fetch(URL + "/usuarios/list",
    {
        'method':'GET',
        'headers':{'Content-Type':'application/json'}
    })
    .then(response => response.json())
    .then(dados => {
        salvaUrl(dados);
    })

    await fetch(URL + "/campanha/campanhasData", 
    {
        'method':'GET',
        'headers':{'Content-Type':'application/json'}
    })
    .then(response => response.json())
    .then(dados => {
        salvaUrlCampanha(dados);
    })
}

function salvaUrl(dados) {
    dados.forEach(element => {
        roteamentoUser.push("#/" + element.urlUser);
    });
}

function salvaUrlCampanha(dados) {
    dados.forEach(element => {
        roteamentoCampanha.push("#/" + element.url);
    });
    console.log("salvo");
}