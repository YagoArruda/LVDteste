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

function opcoes(op) {
    var tela = document.getElementById("tela");

    if (op == 1) {
        tela.innerHTML = `                
        
        <div class="mt-2 text-center rounded-circle justify-content-center text-center justify-items-center">
        <img id="perfilImage" class="rounded-circle" src="img/circulo cinza.png" alt="perfil"
            style="width: 30%;">
        <p><i class="fa-solid fa-pencil"></i> Editar foto de perfil</p>
        <input type="file" id="inputImagem" accept="image/*" style="max-width: 54%;">
    </div>

    <div class="d-flex justify-content-center my-3">
        <input id="perfilInputNome" class="form-control text-center border-secondary" type="search"
            placeholder="Nome" aria-label="Search" style="width: 20rem;">
    </div>

    <div class="d-flex justify-content-center my-3">
        <input id="perfilInputUsuario" class="form-control text-center border-secondary" type="search"
            placeholder="Nome de Usuario" aria-label="Search" style="width: 20rem;">
    </div>

    <div class="d-flex justify-content-center my-3">
        <input id="perfilInputEmail" class="form-control text-center border-secondary" type="search"
            placeholder="E-mail" aria-label="Search" style="width: 20rem;">
    </div>

    <div class="d-flex justify-content-center my-3">
        <input id="perfilInputTelefone" class="form-control text-center border-secondary" type="search"
            placeholder="Telefone" aria-label="Search" style="width: 20rem;">
    </div>

    <div class="d-flex row justify-content-center my-3">
        <button type="button" class="btn btn-light border mt-4 ms-3" id="trocarSenha"
            onclick="window.location.href = 'TrocarSenha.html'" style="width: 8rem;">Trocar Senha</button>

        <button type="button" class="btn btn-light border mt-4 ms-3" id="salvar" style="width: 8rem;"
            onclick="salvarAlteracoes()">Salvar</button>

        <button type="radio" onclick="sair()" class="btn btn-outline-danger border mt-4 ms-3" name="options"
            id="logoff" style="width: 8rem;">Sair</button>

        <!-- Modal de deletar a conta -->
        <button type="button" class="btn btn-danger border mt-4 ms-3" data-bs-toggle="modal"
            data-bs-target="#staticBackdrop" style="width: 8rem;">
            Excluir conta
        </button>

        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Você deseja excluir sua conta?
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Esteja ciente que esta ação é permanente e irreversível.
                    </div>
                    <div class="modal-footer">
                        <button type="button" onclick="deletar()" class="btn btn-danger">Sim</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        dadosPerfil();
    }
    else if (op == 2) {
        let usuarios = lerCadastrosSalvos();
        tela.innerHTML = textoCarro();
        dadosCarro();
    }

        else if (op == 3) {
            tela.innerHTML = `
              <h3 class="mt-3">Últimos Agendamentos</h3>
          
              <div class="d-flex justify-content-center my-3">
                <input id="filtroData" class="form-control text-center border-secondary" type="search" placeholder="00/00/0000"
                  aria-label="Search" style="width: 20rem;" maxlength="10">
              </div>
          
              <div id="agendamentosDiv" class="justify-content-center my-3 rounded border">
                <!-- Aqui serão inseridos os agendamentos -->
              </div>
            `;
          
            let headersList = {
              "Accept": "*/*",
              "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            };
          
            //buscar os agendamentos na API
            async function buscarAgendamentos() {
              try {
                let response = await fetch("https://api-avaliacao.vercel.app/agendamentos", {
                  method: "GET",
                  headers: headersList
                });
          
                let data = await response.json();
                return data;
              } catch (error) {
                console.error(error);
                return [];
              }
            }
            
            
            // Função para filtrar os agendamentos por data
            function filtrarAgendamentos() {
              const filtroData = document.getElementById('filtroData').value;
              const agendamentosDiv = document.getElementById('agendamentosDiv');
          
              buscarAgendamentos().then(agendamentos => {
                // Filtra os agendamentos com base na data
                const agendamentosFiltrados = agendamentos.filter(agendamento => agendamento.data  === filtroData);
                
            
                
            agendamentosDiv.innerHTML = '';
          
            if (agendamentosFiltrados.length > 0) {
                // se houver agendamentos
                agendamentosFiltrados.forEach(agendamento => {
                  const agendamentoElement = document.createElement('p');
                  
                  agendamentoElement.innerHTML = `Agendamento Encontrado!<br>Data: ${agendamento.data}, Horário: ${agendamento.hora}, Placa: ${agendamento.placa}`;
                  agendamentosDiv.appendChild(agendamentoElement);
                });
              } else {
                // se não houver agendamentos
                const mensagemElement = document.createElement('p');
                mensagemElement.textContent = 'Não há agendamentos para a data selecionada.';
                agendamentosDiv.appendChild(mensagemElement);
              }
              });
            }
            
          
            // Event listener para o campo de filtro de data
            const filtroDataInput = document.getElementById('filtroData');
          
            filtroDataInput.addEventListener('keypress', function(event) {
              if (event.key === 'Enter') {
                filtrarAgendamentos();
              }
            });
          }
    }

    
    
function dadosPerfil() {
    let usuarios = lerCadastrosSalvos();

    document.getElementById("perfilInputNome").value = usuarios.cadastros[usuarios.usuarioAtual].nome;
    document.getElementById("perfilInputUsuario").value = usuarios.cadastros[usuarios.usuarioAtual].usuario;
    document.getElementById("perfilInputEmail").value = usuarios.cadastros[usuarios.usuarioAtual].email;
    document.getElementById("perfilInputTelefone").value = usuarios.cadastros[usuarios.usuarioAtual].telefone;

    if (usuarios.cadastros[usuarios.usuarioAtual].imagem != "nc") {
        document.getElementById("perfilImage").src = `${usuarios.cadastros[usuarios.usuarioAtual].imagem}`
        document.getElementById("perfilImage").style = `width: 170px; height: 170px;`
    }
}



function data(event) {
    let campoData = document.getElementById("filtroData");

    let entrada = event.which;

    if (entrada < 48 || entrada > 57) {
        return false;
    }

    mascaraData(campoData);
}

function mascaraData(num) {
    let conteudo = num.value;
    let text;

    if (conteudo.length == 2) {
        text = conteudo.charAt(0) + "/" + conteudo.charAt(1);
        num.value = text;
    }
    if (conteudo.length == 4) {
        text = conteudo.charAt(0) + conteudo.charAt(2) + "/" + conteudo.charAt(3) + conteudo.charAt(4);
        num.value = text;
    }
    if (conteudo.length == 5) {
        text = conteudo.charAt(0) + conteudo.charAt(1) + "/" + conteudo.charAt(3) + conteudo.charAt(4) + "/";
        num.value = text;
    }
    if (conteudo.length > 5) {
        text = conteudo.charAt(0) + conteudo.charAt(1) + "/" + conteudo.charAt(3) + conteudo.charAt(4) + "/" + conteudo.substring(6);
        num.value = text;
    }

}

let carroAgendando = 0;
function mostrarmais() {
    textCarro()
}

function dadosCarroAgend() {
    let usuarios = lerCadastrosSalvos()

    document.getElementById("inputPlaca").value = usuarios.cadastros[usuarios.usuarioAtual].carro[carroAgendando].placa;
    document.getElementById("inputNomeReal").value = usuarios.cadastros[usuarios.usuarioAtual].nome;
    document.getElementById("inputcategoria").value = usuarios.cadastros[usuarios.usuarioAtual].carro[carroAgendando].categoria;
}

//teste de validação
function textCarro() {
    let usuarios = lerCadastrosSalvos();
    var tela = document.getElementById("tela");

    let text = `   
    <div class="d-flex justify-content-center text-center my-3">
        <button class="btn btn-light border mt-4 ms-0" style="width: 2rem;" onclick="agendarOutroCarro(-1)"><</button>
        <button class="btn btn-light border mt-4 ms-3" style="width: 3rem;">${carroAgendando + 1}/${usuarios.cadastros[usuarios.usuarioAtual].carro.length}</button>
        <button class="btn btn-light border mt-4 ms-3" style="width: 2rem;" onclick="agendarOutroCarro(+1)">></button>
    </div>
    
    <div class="d-flex justify-content-center my-3">
        <input id="inputPlaca" class="form-control text-center border-secondary" type="search" placeholder="Placa do Veiculo"
            aria-label="Search" style="width: 20rem;" disabled>
    </div>

    <div class="d-flex justify-content-center my-3">
        <input id="inputcategoria" class="form-control text-center border-secondary" type="search" placeholder="Modelo do Veiculo"
            aria-label="Search" style="width: 20rem;" disabled>
    </div>

    <div class="d-flex justify-content-center my-3">
        <input id="inputNomeReal" class="form-control text-center border-secondary" type="search" placeholder="Responsavel pelo Veiculo"
            aria-label="Search" style="width: 20rem;" disabled>
    </div>`

    tela.innerHTML = text;
    dadosCarroAgend();
}

function agendarOutroCarro(entrada) {
    let usuarios = lerCadastrosSalvos()
    if ((carroAgendando + entrada) > usuarios.cadastros[usuarios.usuarioAtual].carro.length - 1) {
        carroAgendando = 0;
    }
    else if ((carroAgendando + entrada) < 0) {
        carroAgendando = usuarios.cadastros[usuarios.usuarioAtual].carro.length - 1;
    }
    else {
        carroAgendando = carroAgendando + entrada;
    }
    textCarro();
    dadosCarroAgend();
}



let carroAMostra = 0;
//Mostra os dados do carro
function dadosCarro() {
    let usuarios = lerCadastrosSalvos()

    document.getElementById("inputPlacaCarro").value = usuarios.cadastros[usuarios.usuarioAtual].carro[carroAMostra].placa;
    document.getElementById("inputDonoCarro").value = usuarios.cadastros[usuarios.usuarioAtual].nome;
    document.getElementById("inputCategoriaCarro").value = usuarios.cadastros[usuarios.usuarioAtual].carro[carroAMostra].categoria;
    document.getElementById("inputCorCarro").value = usuarios.cadastros[usuarios.usuarioAtual].carro[carroAMostra].cor;
    document.getElementById("inputModeloCarro").value = usuarios.cadastros[usuarios.usuarioAtual].carro[carroAMostra].modelo;
}

//Salva os dados do carro
function salvarDadosCarro() {
    let usuarios = lerCadastrosSalvos()

    usuarios.cadastros[usuarios.usuarioAtual].carro[carroAMostra].placa = document.getElementById("inputPlacaCarro").value
    usuarios.cadastros[usuarios.usuarioAtual].carro[carroAMostra].categoria = document.getElementById("inputCategoriaCarro").value
    usuarios.cadastros[usuarios.usuarioAtual].carro[carroAMostra].cor = document.getElementById("inputCorCarro").value
    usuarios.cadastros[usuarios.usuarioAtual].carro[carroAMostra].modelo = document.getElementById("inputModeloCarro").value

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    const toastLiveExample = document.getElementById('liveToast')
    document.getElementById('toastMensage').textContent = "Alterações salvas com sucesso."
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
}

//Informações do carro (formatação do texto)
function textoCarro() {
    let usuarios = lerCadastrosSalvos();

    let text = `   
    <div class="d-flex justify-content-center text-center my-3">
        <button class="btn btn-light border mt-4 ms-0" style="width: 2rem;" onclick="verOutroCarro(-1)"><</button>
        <button class="btn btn-light border mt-4 ms-3" style="width: 3rem;">${carroAMostra + 1}/${usuarios.cadastros[usuarios.usuarioAtual].carro.length}</button>
        <button class="btn btn-light border mt-4 ms-3" style="width: 2rem;" onclick="verOutroCarro(+1)">></button>
    </div>
    
    <div class="d-flex justify-content-center my-3">
        <input id="inputPlacaCarro" class="form-control text-center border-secondary" type="search" placeholder="Placa do Veiculo"
            aria-label="Search" style="width: 20rem;">
    </div>

    <div class="d-flex justify-content-center my-3">
        <input id="inputDonoCarro" class="form-control text-center border-secondary" type="search" placeholder="Responsavel pelo Veiculo"
            aria-label="Search" style="width: 20rem;" disabled>
    </div>

    <div class="d-flex justify-content-center my-3">
        <input id="inputModeloCarro" class="form-control text-center border-secondary" type="search" placeholder="Modelo do Veiculo"
            aria-label="Search" style="width: 20rem;">
    </div>`
        + categoriaCadastrada() +
        `<div class="d-flex justify-content-center my-3">
        <input id="inputCorCarro" class="form-control text-center border-secondary" type="search" placeholder="Cor do Veiculo"
            aria-label="Search" style="width: 20rem;">
    </div>

    <div class="d-flex justify-content-center my-3">
        <button class="btn btn-light border mt-4 ms-3" onclick="cadastrarNovoCarro()" >Novo carro</button>

        <button class="btn btn-light border mt-4 ms-3" onclick="salvarDadosCarro()" style="width: 6rem;">Salvar</button>
    </div>
    `;
    return text;
}

//Cria um dropdown com a categoria cadastrada do carro selecionada
function categoriaCadastrada() {
    let usuarios = lerCadastrosSalvos();
    let divRetorno;

    let carro = usuarios.cadastros[usuarios.usuarioAtual].carro[carroAMostra].categoria;

    switch (carro) {
        case "Hatch":
            divRetorno = `<div class="d-flex justify-content-center text-center mt-2">
            <select id="inputCategoriaCarro" class="form-select border-info text-center my-1" style="width: 20rem;">
            <option value="Hatch" selected>Hatch</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Picape/Caminhonete">Picape/Caminhonete</option>
            <option value="Motocicleta">Motocicleta</option>
            <option value="Outro">Outro</option>
            </select>
            </div>`;
            break;
        case "Sedan":
            divRetorno = `<div class="d-flex justify-content-center text-center mt-2">
            <select id="inputCategoriaCarro" class="form-select border-info text-center my-1" style="width: 20rem;">
            <option value="Hatch">Hatch</option>
            <option value="Sedan" selected>Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Picape/Caminhonete">Picape/Caminhonete</option>
            <option value="Motocicleta">Motocicleta</option>
            <option value="Outro">Outro</option>
            </select>
            </div>`;
            break;
        case "SUV":
            divRetorno = `<div class="d-flex justify-content-center text-center mt-2">
            <select id="inputCategoriaCarro" class="form-select border-info text-center my-1" style="width: 20rem;">
            <option value="Hatch">Hatch</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV" selected>SUV</option>
            <option value="Picape/Caminhonete">Picape/Caminhonete</option>
            <option value="Motocicleta">Motocicleta</option>
            <option value="Outro">Outro</option>
            </select>
            </div>`;
            break;
        case "Picape / Caminhonete":
            divRetorno = `<div class="d-flex justify-content-center text-center mt-2">
            <select id="inputCategoriaCarro" class="form-select border-info text-center my-1" style="width: 20rem;">
            <option value="Hatch">Hatch</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Picape/Caminhonete" selected>Picape/Caminhonete</option>
            <option value="Motocicleta">Motocicleta</option>
            <option value="Outro">Outro</option>
            </select>
            </div>`;
            break;
        case "Motocicleta":
            divRetorno = `<div class="d-flex justify-content-center text-center mt-2">
            <select id="inputCategoriaCarro" class="form-select border-info text-center my-1" style="width: 20rem;">
            <option value="Hatch">Hatch</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Picape/Caminhonete">Picape/Caminhonete</option>
            <option value="Motocicleta" selected>Motocicleta</option>
            <option value="Outro">Outro</option>
            </select>
            </div>`;
            break;
        case "Outro":
            divRetorno = `<div class="d-flex justify-content-center text-center mt-2">
            <select id="inputCategoriaCarro" class="form-select border-info text-center my-1" style="width: 20rem;">
            <option value="Hatch">Hatch</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Picape/Caminhonete">Picape/Caminhonete</option>
            <option value="Motocicleta">Motocicleta</option>
            <option value="Outro" selected>Outro</option>
            </select>
            </div>`;
            break;
    }

    return divRetorno;
}

//A tualiza as informações do carro quando troca de veiculo cadastrado(na tela)
function verOutroCarro(entrada) {
    let usuarios = lerCadastrosSalvos()
    if ((carroAMostra + entrada) > usuarios.cadastros[usuarios.usuarioAtual].carro.length - 1) {
        carroAMostra = 0;
    }
    else if ((carroAMostra + entrada) < 0) {
        carroAMostra = usuarios.cadastros[usuarios.usuarioAtual].carro.length - 1;
    }
    else {
        carroAMostra = carroAMostra + entrada;
    }
    opcoes(2);
}

function cadastrarNovoCarro() {
    window.location.href = "CadastroCarro.html"
}