# Desafio Green mile cypress

Esse repositório é um desafio que faz parte de um processo seletivo da empresa Green Mile, abaixo está o desafio proposto, seus problemas e sua solução.

## Desafio
Criar um mini-projeto de automação de testes que execute o evento de long click, em um componente web e consiga validar se o tamanho em escala foi alterado para 225 x 225 pixels

**Pré-requisitos:**
Url: https://codepen.io/choskim/pen/RLYebL
Ultilizar o framework Cypress.io
Caso este desafio não tenha solução. faça um relatório mostrando os problemas e abordando novas soluções 

**Observação:** Esta aplicação usa hammer.js como biblioteca de eventos de componentes em webapps.

**O script deve fazer**
Simular o longclick do quadrado verde para que ele expanda o seu tamanho
Captura o tamanho deste quadro é válida se escala é de 225 x 225 px.

## Problemas encontrados
Não foi possível fazer os testes no ambiente web requerido, após algumas pesquisa descobri que o hammer.js não interage bem com o cypress visto que o problema era na biblioteca javascript e não no teste, pesquisei mais e cheguei em  uma melhoria que resolve o desafio

## Solução
Ao invés de usar hammer.js deve se usar um script em javascript simples que permite a interatividade com o componente.

**Código em hammer.js**

```
var square = document.querySelector('.square');
var manager = new Hammer.Manager(square);
var Press = new Hammer.Press({
  time: 500
});
manager.add(Press);
manager.on('press', function(e) {
  e.target.classList.toggle('expand');
});
```
**Código em js simples**
```
var square = document.querySelector('.square');
var pressTimer = 500;
square.addEventListener("mouseup", () => {
    clearTimeout(pressTimer);
})
square.addEventListener("mousedown", (e) => {
    if(e.which == 1) {
        pressTimer = window.setTimeout(() => {
        e.target.classList.toggle('expand');
        },500);
    }
})
 
````
**Codigo de teste:** Uma vez essa melhoria feita, temos o seguinte código de teste
```
describe ('teste de componente', () => {
 
// url local deve ser substuida pelo o seu localhost, teste deve   passar já que o hammer.js foi substituido por simnples js
  var urlDeAmbienteLocal = "http://localhost/projeto-local/";
 
// url web deve ser usada para ver teste falhar, mostrando a impossibilidade de realizar-lo com hammer.js
  var urlDeAmbienteWeb = "https://codepen.io/choskim/pen/RLYebL";
 
    before(() => {
      // Acessa url declarada nas variaveis de ambiente
        cy.visit(urlDeAmbienteLocal);
      })
       
      // 1. Clica no componente e espera 500 milissegundos
      it('Simula o longclick do quadrado verde para que ele expanda o seu tamnho.', () => {
        cy.get('.square').trigger('mousedown',  { which: 1})
        cy.wait(500)
      })
      
      // 2. Valida tamanho de escala
      it('Captura o tamnho deste quadro e valida se escala é de 225 x 225 px.', () =>{
        cy.get('.square').should('have.css', 'width', '225px')
        cy.get('.square').should('have.css', 'height', '225px')
      });
})
````
**O que o script faz**
Clica no componente e espera 500 milissegundos e válida se o tamanho de escala é o esperado de (225 x 225 px.)

**Observações:** Coloquei duas variáveis no script, uma para novo ambiente que irá utilizar o js simples que no meu caso era o localhost, a segunda variável é do ambiente web original, que usa o hammer.js, o objetivo dessas variáveis e permitir uma comparação rápida entre os dois ambientes, mostrando a impossibilidade de usar o cypress para manipular componentes hammer.js.

**Passos para executar o teste**
1. Download dos arquivios do projeto, você pode fazer isso clicando [aqui](https://github.com/jpaulo-mnz/Green-mile-challenge-cypress/archive/master.zip).

2. Com o download feito, vá na pasta e descompacte o arquivo .zip, caso não tenha um descompactador você pode baixar um através deste link [aqui](https://www.win-rar.com/start.html?&L=9).

3. Fazer instalação do node js, você pode ir para o site e fazer o download clicando [aqui](https://nodejs.org/en/).

4. Fazer instalação do cypress, você pode ir para o site e fazer o download clicando [aqui](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements).

5. Fazer instalação do xampp para emular um servidor, você pode ir para o site e fazer o dowload clicando [aqui](https://www.apachefriends.org/pt_br/download.html).

6. Abra o app xampp e inicie o MySQL e o Apache, tendo as pastas do projeto descompactadas mova a pasta (projeto-local) para a pasta local que foi criada na instalação do xampp, chamada “xampp” dentro dela ache a pasta “htdocs” e mova a pasta (projeto-local) para lá, no windows ficará em c://, caso esteja em outro SO pode consultar a documentação do xampp e verificar onde fica, clicando [aqui](https://www.apachefriends.org/pt_br/faq_stackman.html).

7. Abra o projeto Green-mile-challenge-cypress-master com alguma IDE ou editor de texto de desenvolvimento, indico o VS code, dentro do editor/IDE abra o arquivo (teste de componente) que está dentro de Cypress-desafio-Green-mile>Cypress>integration>Test, altere a variável de ambiente local para o local onde está o arquivo movido no passo anterior, caso seu SO seja windows provavelmente não precisa alterar pois será "http://localhost/projeto-local/".

8. Abra o  terminal na pasta do projeto e execute o seguinte comando ```./node_modules/.bin/cypress open``` após isso aguarde até a janela do Cypress aparecer, quando aparecer clique em Teste_De_Componente.js

**Resultado esperado**
![Alt Text](https://github.com/jpaulo-mnz/Green-mile-challenge-cypress/blob/master/cypress/integration/screenshot.jpg)

**Autor:** J. Paulo Menezes
