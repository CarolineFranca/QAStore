class ProductsPage {

    acessMenu(){
        cy.get('a[title="PRODUTO"]') 
            .click()

        cy.get('h1') //Validando que esta tela de produto
            .should('have.text', 'PRODUTO')
            .and('be.visible')
    }

    productCategory(category){
        cy.get('[data-toggle] ul.beautyScroll label') 
            .contains(category)
            .scrollIntoView()
            .should('be.visible')
            .click()
    }  

    addProductCartByIndex(titleProduct, index){
        cy.get(`a[title*="${titleProduct}`)
            .parents('div')
            .find('.acoes-produto')
            .find('a[title="Adicionar produto ao carrinho"]')
            .eq(index) // seleciono por index
            .click()
    }

    boxConfirmationProductAddCart(){
        cy.wait(2000)
        cy.get('.fancybox-skin')
          .should('be.visible')
        cy.contains('a','Continuar comprando')
          .click()
    }

    addCupomBox(cupomDeDescontoBox){
        cy.get('.fancybox-skin')
            .should('be.visible')

        cy.wait(3000) 
        cy.get('#usarCupom')
            .type(cupomDeDescontoBox)
        cy.wait(3000) 
        
        cy.contains('button', 'Usar cupom')
            .click()
    }
}
         
export default new ProductsPage()