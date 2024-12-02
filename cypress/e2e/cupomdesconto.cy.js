import loginPage from '../support/pages/pageLogin.page'
import productPage from '../support/pages/pageProducts.page'
import cartPage from '../support/pages/pageCart.page'


describe('Testes Cupom de Descontos', () => {

  beforeEach(() => {
    cy.clearApp()
    cy.visit('/')
    cy.validatePageTitle('QA Store Desafio')
  })

  it('CT001 - Validar que não é permitido aplicação de um cupom com desconto maior que o valor total do carrinho para um cliente tipo pessoa física',() => {
    loginPage.go() //Acessar página de login
    loginPage.realizeLoginFixture("PF") //Inserir o tipo do cliente: PF ou PJ, massa definida em fixtures
    loginPage.submit() //Botão para efetuar login
    loginPage.myAccount()  //Validação de conta, após login

    cartPage.accessCart()
    cartPage.validateCupomBeforeApplying() //validar se existe cupom aplicado ao carrinho e remover
    cy.clearCart() //Limpar carrinho (remover produtos)
    
    productPage.acessMenu()
    productPage.productCategory('STATUS') //Escolher categoria do produto desejado
    productPage.addProductCartByIndex('[STATUS] Produto ativo', 1) //Informar nome do produto e posição
  
    productPage.addCupomBox('30REAIS') //Inserir cupom
    cartPage.accessCart()
    cy.validatePageTitle('Carrinho - QA Store Desafio') 
    cartPage.typeDelivery('Retirar pessoalmente')
    
    cartPage.validateDiscountApplied()
  
  })

  it('CT003 - Validar que não é permitido finalizar pedido com o carrinho zerado ao aplicar desconto maior que o valor do carrinho com pessoa fisica', ()=> {
    loginPage.go()
    loginPage.realizeLoginFixture("PF") //Tipo do cliente deve ser PF OU PJ
    loginPage.submit()
    loginPage.myAccount()

    cartPage.accessCart()
    cartPage.validateCupomBeforeApplying()
    cy.clearCart()

    productPage.acessMenu()
    productPage.productCategory('STATUS')
    cy.wait(2000)
    productPage.addProductCartByIndex('Produto ativo', 1) //Informar nome do produto e posição
    productPage.addCupomBox('30REAIS')
    cartPage.accessCart()
    cy.validatePageTitle('Carrinho - QA Store Desafio')
    cartPage.typeDelivery('Retirar pessoalmente')

    cartPage.finalizePurchase()
    cartPage.validationCupomAddActive('30REAIS') 
    cartPage.finalizePurchase()
    cartPage.CreateOrderNotExist()  
  })

  it('CT005 - Validar cálculo do valor total do carrinho ao aplicar cupom de desconto percentual', () =>{
    productPage.acessMenu()  //Escolhendo opçao do menu
    productPage.productCategory('PREÇO')  //Adicionar produto ao carrinho
    productPage.addProductCartByIndex('[PREÇO] Produto com preço superior ao valor maximo de seguro - PAC', 1) //Informar nome do produto e posição
    productPage.boxConfirmationProductAddCart()
    cartPage.accessCart()
    cy.validatePageTitle('Carrinho - QA Store Desafio')

    cartPage.changeQuantityProduct(10) //Alteando quantidade de prodt
    cartPage.addCupomCart('10OFF') //Aplicando e validando cupom de porcentagem
    cartPage.validationCupomAddActive('10OFF')
    cartPage.DiscountPercentage() //Validar valor percentual
  })

  it('CT006 - Validar que não é permitido utilizar um cupom expirado', () => {
    productPage.acessMenu()
    productPage.productCategory('MARCA') //Escolhendo opção de sessão de produto do menu
    productPage.addProductCartByIndex('Produto com marca cadastrada', 0) //Adicionar produto ao carrinho
    productPage.boxConfirmationProductAddCart() //Validar popup de produto adicionado e clicar em continuar comprando
    cartPage.accessCart() //Clicar no carrinho
    cy.validatePageTitle('Carrinho - QA Store Desafio') //Validar título da página
    cartPage.addCupomCart('CUPOMVENCIDO') //Aplicar Cupom   
    cy.contains('div', 'O cupom não é válido.') //Validar resultado esperado
  })

  it('CT008 - Efetuar compra com cupom aplicado estando logado', () => {
    loginPage.go()
    loginPage.realizeLoginFixture("PF") //Inserir o tipo do cliente: PF ou PJ, massa definida em fixtures
    loginPage.submit()
    loginPage.myAccount()
  
    cartPage.accessCart()
    cartPage.validateCupomBeforeApplying()
    cy.clearCart() //Limpar carrinho (remover produtos)
    cy.wait(2000)
    productPage.acessMenu()
    productPage.productCategory('DIMENSAO')
    productPage.addProductCartByIndex('Produto com comprimento 15', 0)
    cy.wait(2000)
    productPage.boxConfirmationProductAddCart() //Validar modal box de produto adicionado e clicar em continuar comprando
    cartPage.accessCart()
    cy.wait(2000)
    cy.validatePageTitle('Carrinho - QA Store Desafio')
    cartPage.fielCEPValidation()
    cartPage.typeDelivery('SEDEX') //Escolhendo tipo de entrega e cupom aplicado
    cartPage.addCupomCart('AJJFLWBHH') //Aplicando cupom
    cartPage.validationCupomAddActive('AJJFLWBHH')

    //Finalizar compra
    cartPage.finalizePurchase()
    cartPage.validationCupomAddActive('AJJFLWBHH')
    cartPage.finalizePurchase()
    cartPage.CreateOrder()  
  })


  it('CT009 - Efetuar compra sem cupom aplicado estando logado', () => {
    loginPage.go()
    loginPage.realizeLoginFixture("PF") //Inserir o tipo do cliente: PF ou PJ, massa definida em fixtures
    loginPage.submit()
    loginPage.myAccount()

    cartPage.accessCart()
    cartPage.validateCupomBeforeApplying()
    cy.clearCart() //Limpar carrinho (remover produtos)

    productPage.acessMenu()
    productPage.productCategory('IMAGEM')
    productPage.addProductCartByIndex('Produto com duas imagens', 0)
    productPage.boxConfirmationProductAddCart()
    cartPage.accessCart()
    cy.validatePageTitle('Carrinho - QA Store Desafio')
    cartPage.fielCEPValidation()
    cartPage.typeDelivery('Retirar pessoalmente')
    cartPage.validationCupomAddOff('')

    //Finalizar compra
    cartPage.finalizePurchase()
    cartPage.finalizePurchase()
    cartPage.CreateOrder()  
  })


})

