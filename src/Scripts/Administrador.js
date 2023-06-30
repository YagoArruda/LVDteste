//função para deixar as avaliações ocultas e mostrá-las de 2 em 2 ao clique
$(document).ready(function () {
  $("#botao").click(function () {
    $(".card-hidden").toggle();
  });

  var cardsToShow = 0;

  $("#ver-mais").click(function () {
    cardsToShow += 2;

    $(".card-hidden").slice(0, cardsToShow).show(); /* Mostra os primeiros cards */

    var $toggleButtons = $(".toggle-buttons");
    $toggleButtons.empty();

    if (cardsToShow >= 2) {
      var $verMenosButton = $("<button>").text("Ver menos").attr("id", "ver-menos");
      $toggleButtons.append($verMenosButton);
    }
  });

  $(document).on("click", "#ver-menos", function () {
    cardsToShow = 0;

    $(".card-hidden").slice(cardsToShow).hide(); /* Oculta os cards, fora os três primeiros */

    $("#ver-mais").show(); /* Mostra o botão "Ver mais" de novo */

    var $toggleButtons = $(".toggle-buttons");
    $toggleButtons.empty();
  });

//função para mostrar cards de agendamentos
let str='';
    fetch("https://api-avaliacao.vercel.app/agendamentos")
    .then(response=>response.json())
    .then(data=>{
      
      for (let i=0;i<data.length;i++){
        str+=`
        <div class="card mb-3" style="width: 45%">
          <div class="card-body style="width: 33%; max-width: 20rem; height: 10rem; ">
            <p class="card-text">Categoria: ${data[i].categoria}</p>
            <p class="card-text">Placa: ${data[i].placa}</p>         
            <p class="card-text">Tipo de limpeza: ${data[i].tipoDeLimpeza}</p>
            <p class="card-text">Data: ${data[i].data} Hora: ${data[i].hora}</p>
            <p class="card-text">Responsável: ${data[i].responsavel} </p>
          </div>
        </div>
        `;

        tela.innerHTML=str;
      }
    })


//função para mostrar cards de avaliação
fetch('https://api-avaliacao.vercel.app/avaliacao')
  .then(response => response.json())
  .then(data => {
    let str = '';
    for (let i = 0; i < data.length; i++) {
      
      const rating = data[i].estrelas;

      let starsHTML = '';
      for (let j = 1; j <= 5; j++) {
        if (j <= rating) {
          starsHTML += `<img src="img/starchecked.png" style="width: 20px">`;
        } else {
          starsHTML += `<img src="img/starnull.png" style="width: 20px">`;
        }
      }
      str += `
        <div class="card-hidden mb-3" style="width: 45%">
          <div class="card-body style="width: 33%; max-width: 20rem; height: 10rem; ">
            <p class="card-text">Cliente: ${data[i].nome}</p>
            <p class="card-text">Placa do carro: ${data[i].placa}</p>
            <p class="text-area">Feedback: ${data[i].descricao}</p>
            <div class="rating-stars">${starsHTML}</div>
          </div>
        </div>`;

      cardContainer.innerHTML = str;
    }
  })
  .catch(error => {
    console.log('Ocorreu um erro:', error);
  });
})
