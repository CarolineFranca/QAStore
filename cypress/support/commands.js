import cartPage from '../support/pages/pageCart.page'


//Login
Cypress.Commands.add('doLogin',()=> {
    cy.login('x', 'x')
    cy.userLoggedIn()
  })


//Limpar coockies e cachê
Cypress.Commands.add('clearApp', () => {
    cy.clearAllCookies();     // Limpa os cookies
    cy.clearAllLocalStorage(); // Limpa o LocalStorage (??????)
})

//Validar título da página
Cypress.Commands.add('validatePageTitle', (titleExpected) => {
    cy.title().should('eq', titleExpected)
}) 

//Remover produtos do carrinho, caso houver
Cypress.Commands.add('clearCart', () => {
    cartPage.accessCart()
    cartPage.clearCart()
})


