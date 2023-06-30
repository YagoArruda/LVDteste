//função para validar usuário e alterar a senha do mesmo
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var email = document.getElementById('email').value;
        var senhaAntiga = document.getElementById('old-password').value;
        var novaSenha = document.getElementById('new-password').value;
        var confirmarSenha = document.getElementById('confirm-password').value;

        if (email && senhaAntiga && novaSenha && confirmarSenha) {

            var usuariosArmazenados = JSON.parse(localStorage.getItem('usuarios'));
            var cadastros = usuariosArmazenados.cadastros;

            if (usuariosArmazenados) {

                var usuarioExistente = cadastros.find(function (u) {
                    return u.email === email && u.senha === senhaAntiga;
                });

                if (usuarioExistente) {

                    usuarioExistente.senha = novaSenha;
                    usuariosArmazenados.cadastros[usuariosArmazenados.usuarioAtual] = usuarioExistente;

                    localStorage.setItem('usuarios', JSON.stringify(usuariosArmazenados));

                    console.log("Senha alterada com sucesso!");
                } else {
                    console.log("Email ou senha antiga inválidos.");
                }
            } else {
                console.log("Não há usuários cadastrados.");
            }
        } else {
            console.log("Preencha todos os campos do formulário.");
        }
    });
});

function exibirPopup() {
    document.getElementById("meuPopup").style.display = "block";
}

function fecharPopup() {
    window.location.href = "Perfil.html";
    document.getElementById("meuPopup").style.display = "none";
}

