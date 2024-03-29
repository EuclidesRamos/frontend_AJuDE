let idToken = "idToken";

function validaEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validaSenha(passwd) {
    return (passwd.length > 7);
}

async function tokenExpirado(response) {
    const responseText = await response.text();
    const responseJson = await JSON.parse(responseText);

    if (responseJson["message"].startsWith("JWT expired")) {
        sessionStorage.removeItem(idToken);

        throw new Error("Sessão expirada, faça o login para continuar.");
      }

}

function createURL(nomeCurto) {
    let parsed = removeAcento(nomeCurto);
    parsed = removeDuploEspaco(parsed);
    parsed = trocaEspacoPorTraco(parsed);

    return parsed;
}

function removeAcento(text) {       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃáàâã]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊéèê]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎíìî]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕóòôõ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛúùû]','gi'), 'u');
    text = text.replace(new RegExp('[Çç]','gi'), 'c');

	let parsed = text.replace(/([^a-z0-9])/gm, " ");
    return parsed;                 
}

function removeDuploEspaco(string) {
    let result = "";
    for (let i = 1; i <= string.length; i++) {
        if (!(string[i] === " " && string[i - 1] === " ")) {
            result += string[i - 1]; 
        }
    }

    return result;
}

function trocaEspacoPorTraco(string) {
    let result = "";
    for (let i = 0; i < string.length; i++) {
        result += string[i].replace(" ", "-");
    }

    return result;
}

function isNumber(input) {
    return !isNaN(parseFloat(input)) && isFinite(input);
}