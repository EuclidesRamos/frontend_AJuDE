function validEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validPasswd(passwd) {
    return (passwd.length > 7);
}