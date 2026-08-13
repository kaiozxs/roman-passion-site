document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formLogin");
    const msgErro = document.getElementById("mensagemErro");

    if (!formLogin) return;

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const email = document.getElementById("usuario").value.trim();
        const senha = document.getElementById("senha").value;

        msgErro.innerText = "";

        // LOGIN PRE-DEFINIDO TESTE (PULAR O BANCO DE DADOS TEMPORARIAMENTE)
        if (email === "admin" && senha === "123") {
            localStorage.setItem("usuarioNome", "Administrador Teste");
            window.location.replace("dashboard.html");
        } else {
            msgErro.innerText = "Para testar, use usuário 'admin' e senha '123'.";
        }
    });
});