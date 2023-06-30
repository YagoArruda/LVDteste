var usuariosL = localStorage.getItem('usuarios');

if (usuariosL == null) {
    usuariosL = inserirDadosBase(usuariosL);
    localStorage.setItem('usuarios', JSON.stringify(usuariosL));
}


// USUÁRIO


// Máscara para preenchimento do número
function mascaraTelefone() {
    elemento = document.getElementById("InputNumero");
    var conteudo = elemento.value;
    var text;

    if (conteudo.length == 2) {
        text = "(" + conteudo.charAt(0) + conteudo.charAt(1) + ")" + " ";
        elemento.value = text;
    }
    if (conteudo.length == 6) {
        text = "(" + conteudo.charAt(1) + conteudo.charAt(2) + ")" + " " + conteudo.charAt(5) + " ";
        elemento.value = text;
    }
    if (conteudo.length == 11) {
        text = "(" + conteudo.charAt(1) + conteudo.charAt(2) + ")" + " " + conteudo.charAt(5) + " " + conteudo.charAt(7) + conteudo.charAt(8) + conteudo.charAt(9) + conteudo.charAt(10) + "-";
        elemento.value = text;
    }

}

// Lê os cadastros salvos localmente
function lerCadastrosSalvos() {
    var usuarios = localStorage.getItem('usuarios')

    if (usuarios != null) {
        usuarios = JSON.parse(usuarios)
    }
    else {
        usuarios = inserirDadosBase(usuarios)
    }
    return usuarios
}

var imagem = "nc";

// Salva os dados do cadastro
function salvarCadastro() {

    let nomeReal = document.getElementById("InputNomeReal").value
    let email = document.getElementById("InputEmail").value
    let senha = document.getElementById("InputSenha").value
    let telefone = document.getElementById("InputNumero").value
    let nomeUsuario = document.getElementById("InputNomeUsuario").value
    let termos = document.getElementById("CheckTermos").checked

    if (nomeReal == "" || email == "" || senha == "" || telefone == "" || nomeUsuario == "") {
        const toastLiveExample = document.getElementById('liveToast')
        document.getElementById('toastMensage').textContent = "Para se cadastrar preencha todos os campos"
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
    }
    else {
        if (termos == false) {
            const toastLiveExample = document.getElementById('liveToast')
            document.getElementById('toastMensage').textContent = "Para se cadastrar aceite os termos de privacidade"
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
        }
        else {
            var usuarios = lerCadastrosSalvos()
            let jaUsado = false;

            for (let i = 0; i < usuarios.cadastros.length; i++) {

                if (usuarios.cadastros[i].email == email) {
                    const toastLiveExample = document.getElementById('liveToast')
                    document.getElementById('toastMensage').textContent = `"${email}" já foi cadastrado`
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                    toastBootstrap.show()
                    jaUsado = true;
                    break;
                }

                if (usuarios.cadastros[i].usuario == nomeUsuario) {
                    const toastLiveExample = document.getElementById('liveToast')
                    document.getElementById('toastMensage').textContent = `"${nomeUsuario}" não está disponivel`
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                    toastBootstrap.show()
                    jaUsado = true;
                    break;
                }

            }

            if (jaUsado == false) {

                usuarios.cadastrados = usuarios.cadastros.length;

                const novoUsuario = {
                    id: usuarios.cadastrados--,
                    imagem: imagem,
                    usuario: nomeUsuario,
                    nome: nomeReal,
                    email: email,
                    senha: senha,
                    telefone: telefone,
                    termos: termos,
                    manterConectado: "nc",
                    carro: [{
                        categoria: "nc",
                        modelo: "nc",
                        placa: "nc",
                        cor: "nc",
                    }]

                };

                usuarios.cadastros.push(novoUsuario)
                usuarios.cadastrados = usuarios.cadastros.length;

                usuarios.usuarioAtual = novoUsuario.id;
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                window.location.href = "CadastroCarro.html"

            }

        }
    }

}

// Acionado quando na página de cadastro de usuário
function eventPagDeCDUsuario() {
    // Detecta alterações no input da imagem
    const inputElement = document.getElementById('inputImagem');

    inputElement.addEventListener('change', (event) => {
        const file = event.target.files[0];

        convertImageToBase64(file, (base64Image) => {
            // console.log(base64Image);
            imagem = "data:image/png;base64," + base64Image
            document.getElementById("imgPerfil").src = `${imagem}`
            document.getElementById("imgPerfil").style = `width: 170px; height: 170px;`
        });
    });
}

// Converte a imagem para texto (base64) para permitir salvar no json
function convertImageToBase64(file, callback) {
    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();

        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const dataURL = canvas.toDataURL('image/png');
            const base64Image = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

            callback(base64Image);
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

function inserirDadosBase(usuarios) {
    //var usuarios = localStorage.getItem('usuarios')

    const novoUsuario = {
        cadastrados: 1,
        usuarioAtual: "nc",
        cadastros: [
            {
                id: 0,
                imagem: "nc",
                usuario: "Administrador",
                nome: "LavaDrive",
                email: "lavadrive@gmail.com",
                senha: "ADM27742",
                telefone: "(31) 3392-1187",
                termos: "true",
                manterConectado: "true",
                carro: [{
                    categoria: "SUV",
                    modelo: "ModeloTeste",
                    placa: "ADMT08",
                    cor: "Azul",
                }]

            }
        ]
    }

    usuarios = novoUsuario;

    return usuarios;
}




// VEÍCULO

// Salva os dados do carro em cadastro
function SalvarCarro() {
    let usuarios = lerCadastrosSalvos()

    let corInput = document.getElementById("inputcor").value
    let placaInput = document.getElementById("inputplaca").value
    let modeloInput = document.getElementById("inputmodelo").value
    let categInput = document.getElementById("inputcategoria").value

    if (modeloInput == " " || corInput == " " || placaInput == " " || categInput == "nc") {
        const toastLiveExample = document.getElementById('liveToast')
        document.getElementById('toastMensage').textContent = "Para cadastrar um veiculo preencha todos os campos"
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
    }
    else {
        const DadosCarro = {
            categoria: categInput,
            modelo: modeloInput,
            placa: placaInput,
            cor: corInput,
        }


        if (usuarios.cadastros[usuarios.usuarioAtual].carro.length == 1 && usuarios.cadastros[usuarios.usuarioAtual].carro[0].placa == "nc") {
            usuarios.cadastros[usuarios.usuarioAtual].carro[0] = DadosCarro;
        }
        else {
            usuarios.cadastros[usuarios.usuarioAtual].carro.push(DadosCarro);
        }
        //usuarios.cadastros[usuarios.usuarioAtual].carro.push(DadosCarro);


        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        window.location.href = "index.html"
    }

}




// Login
function logar() {
    let usuarios = lerCadastrosSalvos()

    let user = document.getElementById("inputUserLogin").value
    let senha = document.getElementById("inputSenhaLogin").value
    let manterConectado = document.getElementById("inputManterConectado").checked

    for (let i = 0; i < usuarios.cadastros.length; i++) {
        if (usuarios.cadastros[i].email == user || usuarios.cadastros[i].usuario == user) {
            if (usuarios.cadastros[i].senha == senha) {
                usuarios.cadastros[i].manterConectado = manterConectado;
                usuarios.usuarioAtual = usuarios.cadastros[i].id;
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                window.location.href = "index.html"
                break;
            }
        }
    }
}



// Excluir conta
function deletar() {
    var usuario = lerCadastrosSalvos();

    for (let i = 1; i < usuario.cadastros.length - 1; i++)
        usuario.cadastros[i] = usuario.cadastros[i + 1];

    usuario.cadastros.pop();
    usuario.usuarioAtual = "nl"
    localStorage.setItem('usuarios', JSON.stringify(usuario));
    window.location.href = "index.html"
}

// Sair da conta
function sair() {
    let usuarios = lerCadastrosSalvos();
    usuarios.usuarioAtual = "nl";
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    window.location.href = "index.html";
}


// Perfil
function dadosPerfil() {
    let usuarios = lerCadastrosSalvos()

    document.getElementById("perfilInputNome").value = usuarios.cadastros[usuarios.usuarioAtual].nome;
    document.getElementById("perfilInputUsuario").value = usuarios.cadastros[usuarios.usuarioAtual].usuario;
    document.getElementById("perfilInputEmail").value = usuarios.cadastros[usuarios.usuarioAtual].email;
    document.getElementById("perfilInputTelefone").value = usuarios.cadastros[usuarios.usuarioAtual].telefone;

    if (usuarios.cadastros[usuarios.usuarioAtual].imagem != "nc") {
        document.getElementById("perfilImage").src = `${usuarios.cadastros[usuarios.usuarioAtual].imagem}`
        document.getElementById("perfilImage").style = `width: 170px; height: 170px;`
    }
}


// Detecta as alterações nas informações //desativado temporariamente
function alteracoes() {
    let usuarios = lerCadastrosSalvos()

    let nomeCad = usuarios.cadastros[usuarios.usuarioAtual].nome;
    let usuarioCad = usuarios.cadastros[usuarios.usuarioAtual].usuario;
    let emailCad = usuarios.cadastros[usuarios.usuarioAtual].email;
    let telefoneCad = usuarios.cadastros[usuarios.usuarioAtual].telefone;

    let imagemCad = usuarios.cadastros[usuarios.usuarioAtual].imagem;

    let imagem = document.getElementById("perfilImage").src;

    let nome = document.getElementById("perfilInputNome").value;
    let usuario = document.getElementById("perfilInputUsuario").value;
    let email = document.getElementById("perfilInputEmail").value;
    let telefone = document.getElementById("perfilInputTelefone").value;

    let botao = document.getElementById("salvar");

    if (nome != nomeCad || usuario != usuarioCad || email != emailCad || telefone != telefoneCad || imagem != imagemCad) {
        botao.disabled = false;
    }
    else {
        botao.disabled = true;
    }

}

// Salva as alterações feitas pelo o usuario
function salvarAlteracoes() {
    let usuarios = lerCadastrosSalvos()

    let imagem = document.getElementById("perfilImage").src;

    let nome = document.getElementById("perfilInputNome").value;
    let usuario = document.getElementById("perfilInputUsuario").value;
    let email = document.getElementById("perfilInputEmail").value;
    let telefone = document.getElementById("perfilInputTelefone").value;

    usuarios.cadastros[usuarios.usuarioAtual].nome = nome;
    usuarios.cadastros[usuarios.usuarioAtual].usuario = usuario;
    usuarios.cadastros[usuarios.usuarioAtual].email = email;
    usuarios.cadastros[usuarios.usuarioAtual].telefone = telefone;

    usuarios.cadastros[usuarios.usuarioAtual].imagem = imagem;

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    const toastLiveExample = document.getElementById('liveToast')
    document.getElementById('toastMensage').textContent = "Alterações salvas com sucesso."
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
}

// Acionado quando na pagina de perfil
function imagemAlteracao() {
    //Detecta alterações no input da imagem
    const inputElement = document.getElementById('inputImagem');

    inputElement.addEventListener('change', (event) => {
        const file = event.target.files[0];

        convertImageToBase64(file, (base64Image) => {
            // console.log(base64Image);
            imagem = "data:image/png;base64," + base64Image
            document.getElementById("perfilImage").src = `${imagem}`
            document.getElementById("perfilImage").style = `width: 170px; height: 170px;`
        });
    });
}

function mostrar(){
    let usuarios= lerCadastrosSalvos();

    document.getElementById("inputplaca").value = usuarios.cadastros[usuarios.usuarioAtual].carro[0].placa;
    
    document.getElementById("inputcategoria").value= usuarios.cadastros[usuarios.usuarioAtual].carro[0].categoria;

    document.getElementById("InputNomeReal").value = usuarios.cadastros[usuarios.usuarioAtual].nome;
  
}



// Inicialização da pagina de perfil
function initPerfil() {
    enviarParaCadastro();

    dadosPerfil();
    imagemAlteracao();
}

function enviarParaCadastro() {
    var usuario = localStorage.getItem('usuarios');

    if (usuario == null) {
        window.location.href = 'CadastroUsuário.html';
    }
    else if (usuario.usuarioAtual == "nc" && usuario.usuarioAtual == "nl") {
        window.location.href = 'Login.html';
    }
}

var logado = false;
changeLoginOption();
// Checa quando esta logado
function changeLoginOption() {

    let usuario = lerCadastrosSalvos();

    let botao = document.getElementById("perfil/login");

    if (usuario.usuarioAtual != "nc" && usuario.usuarioAtual != "nl") {
        botao.innerText = "Perfil";
        logado = true;
    }
    else {
        botao.innerText = "Login";
        logado = false;
    }
}

function irParaTela() {

    if (logado == true) {
        window.location.href = 'Perfil.html';
    }
    else {
        window.location.href = 'Login.html';
    }

}


var Adm = false;
loginADM();
function loginADM(){
    let usuario = lerCadastrosSalvos();

    botao = document.getElementById("agend/adm");

    if(usuario.usuarioAtual != "nl" && usuario.usuarioAtual != "nc"){
        if(usuario.cadastros[usuario.usuarioAtual].id == 0){
            botao.innerText = "Agenda";
            Adm  = true;
        }
        else{
            botao.innerText = "Agendar";
            Adm  = false;
        }
    }
    else{
        botao.innerText = "Agendar";
        Adm  = false;
    }
    
}

function irAgendOuAdm(){
    if (Adm == true) {
        window.location.href = 'Administrador.html';
    }
    else {
        window.location.href = 'Agendamento.html';
    }
}
