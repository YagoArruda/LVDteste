//Altera a descrição de acordo com o tipo de limpeza
function limpeza(button) {
    let Title = document.getElementById("limpTitle");
    let Desc = document.getElementById("limpDesc");

    if (button == 1) {
        Title.textContent = "Ducha";
        Desc.textContent = "Ducha refrescante, ideal para uma rápida remoção de sujeira superficial e uma sensação renovadora.";
        tipoDeLimpeza = "Ducha";
    }
    else if (button == 2) {
        Title.textContent = "Limpeza Normal";
        Desc.textContent = "Uma higienização mais detalhada e cuidadosa, garantindo um carro impecável.";
        tipoDeLimpeza = "Limpeza Normal";
    }
    else if (button == 3) {
        Title.textContent = "Limpeza Completa";
        Desc.textContent = "Tratamento minucioso que abrange desde a lavagem externa até a higienização interna, deixando seu veículo como novo.";
        tipoDeLimpeza = "Limpeza Completa";
    }
    else if (button == 4) {
        Title.textContent = "Polimento e Enceramento";
        Desc.textContent = "Aplicação de uma camada de cera protetora na pintura do veículo e remoção de imperfeições, deixando o veículo com um aspecto mais brilhante e renovado."
        tipoDeLimpeza = "Polimento e Enceramento";
    }
}

//Detecta os dias da semana e o mes
function diasDS() {

    // Obter a data atual
    let dataAtual = new Date();

    // Obter o dia da semana (0 = Domingo, 1 = Segunda, ...)
    let diaDaSemana = dataAtual.getDay();

    // Definir a data de início da semana subtraindo o dia da semana atual da data atual
    let diaInicial = new Date(dataAtual);
    diaInicial.setDate(dataAtual.getDate() - diaDaSemana);

    // Criar um array para armazenar os meses
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Outubro', 'Novembro', 'Setembro', 'Dezembro'];

    //Define no calendario o mes
    document.getElementById('mes').textContent = meses[new Date(diaInicial).getMonth()];

    const diasNomes = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado']

    let dias = "";
    let calend = document.getElementById("dias");


    let compareDias = true;

    // Criar um loop para definir os dias da semana
    for (let i = 0; i < 7; i++) {
        // Calcular a data para cada dia da semana
        let date = new Date(diaInicial);

        date.setDate(diaInicial.getDate() + i);

        // Obter o nome do dia da semana e a data formatada

        let dateForm = date.toLocaleString().substr(0, 10)

        let formattedDate = `${dateForm}`;

        //Compara se o dia de hoje e igual ao dia sendo comparado
        if (dataAtual.getDate() == date.getDate()) {
            compareDias = false;
        }

        //Compara se o dia de hoje e maior que os outros da semana
        if (dataAtual.getDate() > date.getDate() && compareDias == true) {
            dias += `
            <input type="radio" class="btn-check" name="dia" id="dia1${i + 1}" autocomplete="off" onclick="definirdia(${i})" disabled>
            <label class="btn btn-light border my-1 col-2 col-lg-1 m-1 border rounded text-center" for="dia1${i + 1}" style="width: 6rem;">
              <p id="dayNameT${i}">${diasNomes[date.getDay()]}</p>
              <p id="dayT${i}" style="font-size: 0.9rem;">${formattedDate}</p>
            </label>`
        }
        else {
            dias += `
            <input type="radio" class="btn-check" name="dia" id="dia1${i + 1}" autocomplete="off" onclick="definirdia(${i})">
            <label class="btn btn-light border my-1 col-2 col-lg-1 m-1 border rounded text-center" for="dia1${i + 1}" style="width: 6rem;">
              <p id="dayNameT${i}">${diasNomes[date.getDay()]}</p>
              <p id="dayT${i}"  style="font-size: 0.9rem;">${formattedDate}</p>
            </label>`
        }
    }
    calend.innerHTML = dias;
    horasDS();
}

function horasDS() {

    let horarios = document.getElementById("horas");
    let horariosNumber = ["8", "9", "10", "11", "13", "14", "15", "16", "17"];
    let horariosText = ["8:00h", "9:00h", "10:00h", "11:00h", "13:00h", "14:00h", "15:00h", "16:00h", "17:00h"];
    str = "";

    for (let i = 0; i < 9; i++) {


        str += `<input type="radio" class="btn-check" name="time" id="time${i + 1}" autocomplete="off">
        <label class="btn btn-light border my-1" onclick="tempos(${i + 1});definirhora(${horariosNumber[i]})" id="timea${i + 1} " for="time${i + 1}"
        style="width: 10rem;">${horariosNumber[i]}:00h</label>`;
    }

    str += `<h5>Horário que o automóvel estará disponível:</h5>
    <p onclick="tempos()" id="tempo" class="btn btn-light border my-1 col-2 col-lg-1 m-1 border rounded"
      style="width: 6rem;">00:00h</p>`;

    horarios.innerHTML = str;
}

//Definir dados do agendamento

let dia = " ";
let tipoDeLimpeza = "Limpeza Normal";
let hora = " ";

//Define o dia do agendamento
function definirdia(entrada) {
    dia = document.getElementById("dayT" + entrada).textContent;
}

//Define a hora do agendamento
function definirhora(entrada) {
    hora = entrada + ":00h";
}


//Salva o agendamento e envia para a tela inicial
const botaoFinalizar = document.getElementById("finalizar");

botaoFinalizar.addEventListener("click", async () => {
    let dataAtual = new Date();

    placaDoAgendamento = document.getElementById("inputPlaca").value;
    categoriaDoAgendamento = document.getElementById("inputcategoria").value;
    responsavelDoAgendamento = document.getElementById("inputNomeReal").value;

    if (dia != " " && hora != " ") {

        let novoAgendamento = {
            "tipoDeLimpeza": tipoDeLimpeza,
            "data": dia,
            "hora": hora,
            "placa": placaDoAgendamento,
            "categoria": categoriaDoAgendamento,
            "responsavel": responsavelDoAgendamento,
        }

        
        
        fetch("https://api-avaliacao.vercel.app/agendamentos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoAgendamento),
        }).then(response => response.json())
        
        

           

     
        
    }


    else {
        const toastLiveExample = document.getElementById('liveToast')
        document.getElementById('toastMensage').textContent = "Para agendar um horário preencha todos os campos"
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
    }
});
