const url = "http://localhost:5000"
function signup() {
    let users = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phone: document.getElementById("number").value,
        gender: document.getElementById("gender").value
    }
    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/signup");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(users));

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {

            // console.log(Http.responseText)
            let jsonRes = JSON.parse(Http.responseText)


            alert(jsonRes.message);
        }
    }
    return false;
}