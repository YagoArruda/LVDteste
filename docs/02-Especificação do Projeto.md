# Especificações do Projeto 
   
   Com a pandemia, os lava-jatos com o passar do tempo foram ficando muito ultrapassados, assim os donos delas e seus funcionários passaram a ter problemas com relação a suas funções e ao ganho de salário, dessa forma todos os locais que tinham como foco a lavagem de carros foram prejudicados, já que as pessoas não podiam sair de suas casas por causa do lock down, nem ter contato direto cara-a-cara.                     
   Entretanto, em 2023, após tudo da pandemia ter acabado, foi feita uma intensa pesquisa pelos donos dessas lava-jatos para ver como lidariam com essa nova situação e a forma mais requisitada nas pesquisas foi o serviço online, pela praticidade e por ser bem rápido. O atual projeto visa fazer uma aplicação Web para lava-jatos onde o principal objetivo é facilitar o trabalho online e fazer sistemas web para incluir todo o sistema de limpeza de carros no mundo virtual atualmente, com design, o conteúdo e a funcionalidade e todos os elementos como marcar qual o tipo de automóvel no qual será feita a limpeza, o cadastro de cada usuário para ficar organizado na tela, o agendamento por data e hora, o cadastro de cada carro diferente, e muitas outras funcionalidades úteis para melhorar a experiência do usuário.
   No projeto a parte do Front-end usará HTML e CSS como linguagens principais além do apoio do framework Bootstrap, enquanto o Backend não existe de maneira efetiva no projeto, então para o simular serão usados JavaScript e o CRUD JSON server.

## Personas

1. André Veríssimo tem 32 anos, é casado, tem filhos e trabalha como uber já faz 5 anos. Dessa forma ele precisa sustentá-los e procura uma forma de deixar o carro limpo gastando o mínimo de tempo possível que poderia estar ganhando dinheiro para sua família. Seus filhos são pequenos e a mulher precisa cuidar deles, então André não tem ajuda para levar o carro no lava-jato, ultimamente necessitando de uma maneira rápida para agendar uma lavagem de maneira virtual e bancar tudo que precisa dentro de casa, no qual pudesse colocar um horário pré-definido para levar o carro e buscar rapidamente e em qual dia quisesse.

2. Danilo Ramos tem 24 anos, é solteiro e trabalha como atendente do McDonalds de manhã e como bartender nas noites, pra ganhar dinheiro o suficiente pra se sustentar,porém como ocorreu a falência de seus pais quando era pequeno, Danilo nunca aprendeu como lavar o carro pela parte de dentro de forma adequeada, sempre ficando alguma parte suja após a limpeza, e sujando de novo rapidamente após comer dentro do carro na volta de seu longo período trabalhando, obrigando-o a contratar alguém para fazer tal serviço, porém após ir na LavaDrive, Danilo ficou impressionado com as diversas opções de serviço que possuiam, como a lavagem completa por dentro, a verificação da qualidade dos vidros do carro e o chaveiro de brinde.

3. Gabriel Silva da Costa tem 35 anos, é um milionário de sucesso e trabalha com marketing digital. É bem inteligente e conquistou tudo que queria em sua vida, após passar anos sofridos sem conseguir avançar com seu negócio, até que explodiu no comércio e ficou rico. Porém, como é solteiro, precisa sempre levar seu carro, sua moto, e sua caminhonete para lavar um de cada vez, e em dias diferentes,para limpar após muito tempo sem mexer nisso, e Gabriel ficou maravilhado com a divisão de filas por categoria do automóvel e a rapidez do serviço da LavaDrive.

4. Natalia Verona tem 26 anos é solteira e trabalha como investigadora da policia civil. É inteligente, bem humorada e adora gatos, mas que está sempre ocupada com o trabalho sendo um grande desafio separar um tempo do seu dia para limpar seu carro. Ela encontrou a solução na LavaDrive que com o pagamento adiantado, marcação de horário e serviço eficiente permite que ela aproveite o seu tempo livre sem se preocupar com a limpeza do carro. 

5. Geraldo Ferreira tem 71 anos, é divorciado e está aposentado. Geraldo é um apreciador de carros, gosta de assistir a corridas e adora observar carros luxuosos ou esportivos. O sonho de Geraldo era ter um carro diferente, que chamasse a atenção, e atualmente ele conquistou isso, uma vez que os carros de sua época são extremamente diferentes dos atuais, e considerados raros hoje em dia. Entretanto, devido a época de produção do carro, Geraldo possui diversas complicações automobilísticas, e dentre elas, está a preocupação em achar um lugar que cuide do seu carro da forma que ele procura, uma vez que, devido a sua idade, Geraldo está debilitado à realizar essa tarefa. E depois que Geraldo encontrou o LavaDrive, ele ficou aliviado, já que todas as observações que ele fazia em relação ao cuidado com seu carro sempre eram atendidas no momento da limpeza, e agora leva seu carro uma vez por semana no mesmo.

6. Ana Souza é uma jornalista de 25 anos, apaixonada por carros e pelo mundo automotivo. Ela frequentemente visita diferentes lava-jatos em sua cidade, com o objetivo de encontrar aquele que ofereça o melhor serviço e atendimento. Ana é bastante exigente em relação aos serviços prestados pelos lava-jatos, e busca sempre encontrar estabelecimentos que utilizem produtos e técnicas de qualidade. Para Ana, a limpeza e conservação do carro são essenciais para a durabilidade e valorização do veículo, e ela valoriza lava-jatos que oferecem serviços diferenciados, como limpeza interna completa e polimento de pintura. Após conhecer o Lava-Drive, ela descobriu que tudo o que buscava, ela achou em um só lugar. A responsabilidade e a autonomia do Lava-Drive fizeram com que Ana fosse uma das clientes mais fiéis.

7. Luiz Dias é um estudante de 19 anos, cujo pai tem dois carros e aos finais de semana deixa um deles aos cuidados de Luiz. Para valorizar o automóvel, a limpeza tem que estar sempre em dia, porém há um problema nesta situação, visto que o carro sempre está sujo, e Luiz não sabe como limpá-lo devidamente. Ao conhecer o Lava-Drive, Luiz passou a frequentá-lo todos os finais de semana, para manter o carro sempre limpo e apresentável para curtir os passeios com os amigos.

## Histórias de Usuários 

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Funcionário         | Acessar a agenda                   | Desmarcar ou marcar horários           |
|Cliente             | Marcar o horário                   | Evitar a esperao em longas filas       |
|Cliente             | Avaliar o serviço                  | Enviar seu feedback                    |
|Cliente             | Adiantar pagamento                 | Tornar o processo ainda mais dinâmico  |
|Motorista de aplicativo| De praticidade e rapidez        | Gastar menos tempo com a limpeza do veículo, para maximizar o lucro de seu serviço  |
|Jornalista          | De um ótimo serviço e atendimento aos clientes | Dirigir com o carro após sentir ter todas as suas exigências cumpridas pelos trabalhadores |
|Estudante           | De uma limpeza em dia e feita com muita atenção | Curtir com o seu automóvel lavado e bem cuidado.  |
|Atendente de serviço| De receber um serviço bem organizado e rápido   | Receber o carro após o tempo estimado e continuar fazendo suas funções. |
|Investigadora       | De serviço rápido e cedo            | Fazer suas obrigações, pagar a limpeza e curtir o dia  |
|Apreciador de carros| De um trabalho bem feito e com muito cuidado| Receber o carro limpo, aos cuidados de quem também valoriza os veículos assim como ele  |
|Marketer            | De uma divisão por categorias      | Poder lavar seus 3 veículos diferentes, com cada veículo em uma fila específica, minimizando a espera  | 


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | Responsavel |
|------|-------------------------|------------|-------------|
|RF-001| A aplicação mostra o agendamento da limpeza pelo horário e pela data na qual foram feitas. | ALTA | Daniel |
|RF-002| A aplicação tem a divisão de filas por categoria do automóvel. | ALTA | Gustavo |
|RF-003| A aplicação tem pagamento via dinheiro, pix ou cartão que é feita para diversos tipos de recebimento. | ALTA | Yago |
|RF-004| A aplicação mostra várias opções de limpeza do veículo.| MÉDIA | Gustavo |
|RF-005| A aplicação mostra a avaliação do usuário após o serviço. | MÉDIA | Daniel |
|RF-006| A aplicação deixa as pessoas fazerem observações antes e depois da lavagem. | MÉDIA | Yago |
|RF-007| O sistema deixa fazer o gerenciamento de cadastros de usuários. | MÉDIA | Yago |
|RF-008| O sistema deixa fazer o gerenciamento de cadastros de carros (placa, modelo, etc.) | MÉDIA | Daniel |
|RF-009| O sistema deixa o pagamento ser adiantado pelo usuário. | MÉDIA | Pedro |
|RF-010| A aplicação mostra uma notificação quando o carro estiver pronto após a lavagem. | MÉDIA | Gabriel |
|RF-011| O sistema mostra uma estimativa do tempo de conclusão da limpeza com base no tempo que foi enviado. | MÉDIA | Gabriel |
|RF-012| O sistema notifica ao término da limpeza. | BAIXA | Pedro |
### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|-----------|
|RNF-001| O site deve ter boa responsividade nas diferentes plataformas.| ALTO |
|RNF-002| O site deve possuir boa usabilidade em suas funções. | ALTO |
|RNF-003| O site deve estar online 20 horas por dia (das 4:00 as 24:00), 7 dias por semana e 360 dias por ano | BAIXA | 
|RNF-004| Compatível com todos os sistemas operacionais | BAIXA |
|RNF-005| O site deve ter confiabilidade para seus clientes poderem colocar suas informações sem problemas. | BAIXA |
|RNF-006| O site deve ser simples e prático em suas obrigações. | BAIXA |
|RNF-007| O site deve processar requisições dentro de 5 segundos para coloca-lás em ordem. | BAIXA |

## Restrições 

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |
|03| A aplicação deve se restringir às tecnologias básicas da Web no Frontend |
|04| A equipe não pode subcontratar o desenvolvimento do trabalho |
|05| Não pode usar as informações já demonstradas como exemplos de outras aplicações |


