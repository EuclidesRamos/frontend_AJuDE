let roteamentoCampanha = [];

async function recuperaDadosCampanha() {
    await fetch(URL + "/campanha/campanhasByData", 
    {
        'method':'GET',
        'headers':{'Content-Type':'application/json'}
    })
    .then(response => response.json())
    .then(dados => {
        salvaUrlCampanha(dados);
    })
}

function salvaUrlCampanha(dados) {
    dados.forEach(element => {
        roteamentoCampanha.push("#/" + element.url);
    });
}