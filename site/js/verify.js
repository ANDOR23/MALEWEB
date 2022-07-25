const data = window.location.search;
console.log(data);

const urlParams = new URLSearchParams(data);
let correo = urlParams.get('email');
let hash = urlParams.get('hash');
console.log(correo)
console.log(hash)

const urlPut = "http://127.0.0.1:5000/verify/" + correo + "/" + hash;

updateUser()
async function updateUser() {
    const response = await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    if (!response.ok) {
        throw new Error();
    }
    else {
        alert("yes")
    }
}

