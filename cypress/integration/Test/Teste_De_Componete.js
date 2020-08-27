describe ('teste de componente', () => {

  // url local deve ser substuida pelo o seu localhost, teste deve passar já que o hammer.js foi substituido por simnples js
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

