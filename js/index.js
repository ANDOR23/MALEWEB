var btnAbrirPopup = document.getElementById("btn-abrir-popup"),
    overlay = document.getElementById("overlay"),
    popup = document.getElementById("popup"),
    btnCerrarPopup = document.getElementById("btn-cerrar-popup"),
    input = document.getElementById("email"),
    notice = document.getElementById("notice");

btnAbrirPopup.addEventListener('click', function () {
    overlay.classList.add('active');
});

btnCerrarPopup.addEventListener('click', function () {
    overlay.classList.remove('active');
    input.value = "";
    notice.innerHTML = ""
});

//api de youtube

//api key: AIzaSyB9RarQdF8cgFHqhX5J1AViu79TsXa0yR4
//id canal: UC5qZFWiXlkh59BYAZ4LwBSg

var key = "AIzaSyB9RarQdF8cgFHqhX5J1AViu79TsXa0yR4";
var idCanal = "UC5qZFWiXlkh59BYAZ4LwBSg";
var url = "https://www.googleapis.com/youtube/v3/search?key=" + key + "&channelId=" + idCanal + "&part=snippet,id&order=date&maxResults=1";

$.getJSON(url, function (data) {

    for (var k in data.items) {
        const urlVideo = "https://www.youtube.com/embed/" + data.items[k]["id"].videoId;

        let divvideo = document.getElementById("videito");
        //ayfreim.innerHTML = 
        iframes = '<iframe width="900" height="480" src="' + urlVideo + '" allow = "autoplay" frameborder = "0" ></iframe >';
        //divvideo.appendChild(ayfreim)
        divvideo.innerHTML = iframes;
    }
});


/********************* USO DE LA API***************************/
//const data = new FormData(document.getElementById('formulario'))


let subBtn = document.getElementById("subBtn");

const URL = 'http://127.0.0.1:5000/postUser';
const urlget = 'http://127.0.0.1:5000/getUser';

async function prevernt(evt) {
    errorMSG = '<p>Error al registrar el correo. intente de nuevo</p>'
    succMSG = '<p id="success">Se ha enviado un link de verificación a tu correo</p>'
    let valor = document.getElementById("email").value;
    evt.preventDefault();
    /* console.log(valor) */
    /***************POST ***********************/
    const newPost = {
        email: valor
    }
    const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    if (!response.ok) {
        throw new Error(notice.innerHTML = errorMSG);
    }
    else {
        notice.innerHTML = succMSG
    }
    /***************GET ***********************/
    let correomail;
    let elhash;
    let responsee = await fetch(urlget);

    if (responsee.ok) { // si el HTTP-status es 200-299
        // obtener cuerpo de la respuesta (método debajo)
        let jsoan = await responsee.json();
        correomail = jsoan[0].email
        elhash = jsoan[0].hash
        console.log(jsoan[0])
        console.log(jsoan[0].email)
        console.log(jsoan[0].hash)

    } else {
        alert("Error-HTTP: " + responsee.status);
    }
    let verifyURL = "http://127.0.0.1:5500/verify.html?email=" + correomail + "&hash=" + elhash;
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "noreply.maleband@gmail.com",
        Password: "B93B6846FC9A4C108EAFF73BA40C8A0F00CA",
        To: correomail,
        From: "noreply.maleband@gmail.com",
        Subject: "Llego el MALE's Mail!",
        Body: verifyURL,

    }).then(
        message => alert(message)
    );

}