const $divTop5 = document.createElement("div");

function exibeCampanhasTop5() {
    $porLike = document.createElement("option");
    $porQuantia = document.createElement("option");
    $porCronologia = document.createElement("option");

    $a = document.createElement("a");
    $viewer.appendChild($a);
    $a.innerText = "Campanhas mais relevantes por";
    $a.classList.add("tituloRelevancia");

    $select = document.createElement("select");
    $select.id = "estrategiaDeExibicao";
    $viewer.appendChild($select);

    $imgSend = document.createElement("img");
    $imgSend.src = "/icons/eye.png";
    $imgSend.id = "enviarEstrategia";
    $viewer.appendChild($imgSend);
    
    $select.appendChild($porLike);
    $select.appendChild($porQuantia);
    $select.appendChild($porCronologia);

    $porLike.innerText = "Like";
    $porQuantia.innerText = "Quantia";
    $porCronologia.innerText = "DeadLine";

    $porLike.value = "ByLike";
    $porQuantia.value = "ByQuantia";
    $porCronologia.value = "ByData";

    $viewer.appendChild($divTop5);
    $divTop5.classList.add("containertop5");
    getCampanhas();
    console.log("ai1");
    $imgSend.addEventListener('click', function () {
        $divTop5.innerHTML = '';
        getCampanhas();
    })
}

function exibeCampanhasHome(dadosCampanhas) {
    console.log("ai2");
    if (dadosCampanhas.length !== 0) {
        dadosCampanhas.forEach((campanha, index) => {
            if (index < 5) {
                console.log(campanha);
                if (campanha.status === "Ativa") {
                    let $p = document.createElement("div");
                    $p.id = "campanha" + campanha.id;
                    $p.classList.add("campanhaTop5");
                    $divTop5.appendChild($p);
                    console.log("ai2");
            
                    if ((campanha.meta - campanha.doacoes) > 0) {
                        $p.innerText = campanha.nomeCurto + "\n" + 
                        "Falta " + (campanha.meta - campanha.doacoes) + " para atingir a meta" + "\n" + 
                        "DeadLine: " + campanha.deadLine + "\n" +
                        "Likes: " + campanha.numeroDeLikes;
                    } else {
                        $p.innerText = campanha.nomeCurto + "\n" + 
                        "Meta de " + campanha.meta + " já atingida\n" + 
                        "DeadLine: " + campanha.deadLine + "\n" +
                        "Likes: " + campanha.numeroDeLikes;
                    }
                    $p.href = campanha.url;
                    
                    $p.addEventListener('click', function () { getCampanha(campanha.url); });
                }
            }
        });

    }
}