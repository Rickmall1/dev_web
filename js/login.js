/** LOGIN DO ADMIN */

function logar() {
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;

  if (email == "admin" && senha == "admin") {
    alert("Sucesso");
    location.href = "../index.html";
  } else {
    alert("Usuário ou senha incorretos.");
  }
}
