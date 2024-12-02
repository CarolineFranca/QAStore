class CartPage {

    accessCart(){
        cy.get('#Caminho_100')
            .click()
    }

clearCart() { //Limpar carrinho (Remover produtos)
    const checkIfCartIsEmpty = () => {
        return cy.get('h1').invoke('text').then((text) => {
            return text.includes('Não existem produtos no carrinho')
        })
    }

    const removeProduct = () => {
        
        // Verifica se a mensagem de carrinho vazio está presente
        checkIfCartIsEmpty().then((isEmpty) => {
            if (isEmpty) {
                cy.log('Não existem produtos no carrinho. Saindo do fluxo.')
                return // Sai do fluxo de remoção
            }
            // Continua com a remoção dos produtos
            cy.get('table.tabela-carrinho tbody tr[data-produto-id]').then(($rows) => {
                // Remove o primeiro produto da lista
                cy.wrap($rows[0]) // Trabalha com o primeiro item da lista
                    .find('.excluir a') // Encontra o link de excluir
                    .click() // Clica no botão de excluir

                // Aguarda a atualização da DOM
                cy.wait(500) // Ajuste se necessário

                // Chama a função novamente
                removeProduct()
            })
        })
    }

    cy.get('h1').then(($h1) => {
        if ($h1.text().includes('Não existem produtos no carrinho')) {
            cy.log('Não existem produtos no carrinho')
        } else {
            cy.log('Existem produtos adicionados no carrinho, necessário remover!')
            removeProduct() // Inicia o processo de remoção
        }
    })
}

  addCupomCart(cupomDeDesconto){
        cy.get('#usarCupom')
            .should('be.visible')
            .type(cupomDeDesconto) 

        cy.get("#btn-cupom")
            .click()
            cy.wait(2000)
    }

    addCupomBox(cupomDeDescontoBox){
        cy.get('.fancybox-skin')
            .should('be.visible')
        cy.wait(2000)
        cy.get('#usarCupom')
            .type(cupomDeDescontoBox)

        cy.contains('button', 'Usar cupom')
            .click()
    }

    //cupomDeDescontoBox
    validateCupomBeforeApplying() {
        cy.wait(3000)
        const checkIfCartIsEmpty = () => {
            return cy.get('h1').invoke('text').then((text) => {
                return text.includes('Não existem produtos no carrinho')
            })
        }
        // Verifica se a mensagem de carrinho vazio está presente
        checkIfCartIsEmpty().then((isEmpty) => {
            if (isEmpty) {
                cy.log('Não existem produtos no carrinho. Saindo do fluxo.')
                return // Sai do fluxo de remoção
            } else{
        cy.wait(2000)
        // Obter o valor do subtotal a partir do atributo "data-subtotal-valor"
                        cy.get('[data-subtotal-valor]')
                        .invoke('attr', 'data-subtotal-valor') // Captura o valor do atributo
                        .then((subtotalValue) => {
                            
                             // Verifica se o valor do subtotal foi obtido
                             if (!subtotalValue) {
                                throw new Error(`Valor do atributo 'data-subtotal-valor' não encontrado ou está vazio`)
                            }
        
                            // Garantir que o valor capturado seja numérico
                            const subtotalNumeric = parseFloat(subtotalValue)
        
                            if (isNaN(subtotalNumeric)) {
                                throw new Error(`Valor do subtotal inválido: ${subtotalValue}`)
                            }
                            const subtotalNumericmWithPrecision = subtotalNumeric.toFixed(2)
                            cy.log(`Obteve o valor do subtotal = ${subtotalNumericmWithPrecision}`)
                            cy.get('[data-total-valor]')
                            .invoke('attr', 'data-total-valor') // Obtém o valor do atributo
                            .then((value) => {

                              const valueTotalWithPrecision = parseFloat(value).toFixed(2)
                              cy.log(`Valor do total: ${valueTotalWithPrecision}`)

                              // Comparando os valores após obter o total
                              if ( valueTotalWithPrecision !== subtotalNumericmWithPrecision) {
                                cy.get('.remover-cupom').click() // Remove o cupom
                              } else if (valueTotalWithPrecision == subtotalNumericmWithPrecision) {
                                cy.log("Nenhum cupom está vinculado no momento...")
                              }
                            
                            })
                        })
                }
            })
        }

   fielCEPValidation(){
        cy.get('#calcularFrete')
            .invoke('val')
            .should('not.equal', '')
    }

    typeDelivery(type){
        cy.contains('span', `${type}`)
            .click()
    }

    validationCupomAddActive(nameCupom){
        cy.contains('span', `${nameCupom}`)
            .should('be.visible')            
        }       
        
    validationCupomAddOff(){
            cy.get('#usarCupom')
                .invoke('val')
                .should('be.empty')
    }    

    changeQuantityProduct(qtd){
        cy.get('[name="quantidade"]')
            .clear()
            .type(qtd)
            .type('{enter}')
        cy.wait(2000)
        cy.get('[name="quantidade"]')
            .should('have.value', qtd)
    }

    finalizePurchase(){
        cy.contains('button', 'Finalizar compra')
            .click()
            cy.wait(2000)
    }

    CreateOrderNotExist(){        
        cy.get('.total .titulo.cor-principal')
        .invoke('text') // Obtém o valor do atributo
        .then((texto) => {
            const valor = texto.replace('R$', '').trim() // Remove o 'R$' 
            cy.log(valor) // Exibe o valor            
        
            const valorTotalComPrecisao = parseFloat(valor).toFixed(2)
            cy.log(`Valor do total: ${valorTotalComPrecisao}`)
            // Comparando os valores após obter o total
            if ( valorTotalComPrecisao == 0.00) {
                throw new Error("Erro: Pedido não poderia ser gerado, pois o valor está zerado. Valor Total: R$ " + valorTotalComPrecisao)
                
            } else if (valorTotalComPrecisao !== 0.00) {
            cy.log("Sucesso")
            }
        })
            
    }

       get formPayment() {
        return cy.get('#pagamento_erro')
       }

        CreateOrder(){ //Validando criação de pedido que deve ocorrer com sucesso ao clicar no botão "Finalizar Compra"
                     this.formPayment.then(($msg) => {
                    if ($msg.length > 0) {
                        // Caso não retorne formas de pagamentos ativas, retornar erro                        
                        throw new Error('Erro: Mensagem ao tentar finalizar pedido, "Não existem formas de pagamento configuradas na loja"')
                    } else {
                        // Caso formas de pagamentos existam, clicar no botão
                        this.finalizarCompraButton.click()
                        cy.log('Botão Finalizar Compra clicado com sucesso!')
                    }
                    })
        }
    
    DiscountPercentage() {     
             cy.get('[data-subtotal-valor]')
            .invoke('attr', 'data-subtotal-valor') // Captura o valor do atributo
            .then((subtotalValue) => { 
                 // Verifica se o valor do subtotal foi obtido
                 if (!subtotalValue) {
                    throw new Error(`Valor do atributo 'data-subtotal-valor' não encontrado ou está vazio`)
                }
                // Garantir que o valor capturado seja numérico
                const subtotalNumeric = parseFloat(subtotalValue)

                if (isNaN(subtotalNumeric)) {
                    throw new Error(`Valor do subtotal inválido: ${subtotalValue}`)
                }

                const subtotalNumericmWithPrecision = subtotalNumeric.toFixed(2)
                cy.log(`Obteve o valor do subtotal = ${subtotalNumericmWithPrecision}`)

                    cy.get('[data-total-valor]')
                    .invoke('attr', 'data-total-valor') // Obtém o valor do atributo data-total-valor
                    .then((valorTotalTela) => {
                        // Converte o valor exibido na tela para número
                        const valueTotalScreenNumeric = parseFloat(valorTotalTela)
                        const valueTotalScreenNumericExact = valueTotalScreenNumeric.toFixed(2)

                        cy.log("Valor total na tela: " + valueTotalScreenNumericExact)

                        const desconto = (subtotalNumericmWithPrecision * 0.10)
                        cy.log("Desconto: " + desconto)

                        const res = subtotalNumericmWithPrecision - desconto
                        cy.log("Resultado: " + res)

                        if(res == subtotalNumericmWithPrecision){
                            cy.log(`Valor total do carrinho após desconto na tela: ${subtotalNumericmWithPrecision}`)
                        }
                        expect(res).to.eq(parseFloat(valueTotalScreenNumericExact))
                    })
                })   
    }
            
    validateDiscountApplied(){ 
        cy.get('.cupom-sucesso')
            .find('span') // Acha o elemento <strong> que contém o valor percentual
            .invoke('text') // Obtém o texto do valor
            .then((valor) => {
                cy.log(`O valor exibido no cupom de sucesso é: ${valor}`)
                    // Verifica se o valor é igual a "30REAIS"
            if (valor.trim() === "30REAIS") {
                cy.log("valor é igual ao esperado: 30REAIS")
            } else if(valor.trim() !== "30REAIS") {
                 throw new Error(`Erro: Valor inesperado: ${valor.trim()}. Esperado: 30REAIS`)
            } 
            // Valor do subtotal a partir do atributo "data-subtotal-valor"
            cy.get('[data-subtotal-valor]')
                .invoke('attr', 'data-subtotal-valor') // Captura o valor do atributo
                .then((subtotalValue) => {
                    
                     // Verifica se o valor do subtotal foi obtido
                     if (!subtotalValue) {
                        throw new Error(`Valor do atributo 'data-subtotal-valor' não encontrado ou está vazio`)
                    }

                    // Validar que valor capturado seja numérico
                    const subtotalNumeric = parseFloat(subtotalValue)

                    if (isNaN(subtotalNumeric)) {
                        throw new Error(`Valor do subtotal inválido: ${subtotalValue}`)
                    }

                    const subtotalNumericmWithPrecision = subtotalNumeric.toFixed(2)
                    cy.log(`Obteve o valor do subtotal = ${subtotalNumericmWithPrecision}`)

                    //Calculando o valor total do carrinho (subtotal - valor do desconto)
                    const valorCupom = 30
                    const valorTotalCarrinho = subtotalNumeric - valorCupom 
                    const valorTotalCarrinhoComPrecisao = valorTotalCarrinho.toFixed(2)

                    cy.log(`Valor total do carrinho após desconto: ${valorTotalCarrinhoComPrecisao}`)

                    // Validando se o valor calculado é igual ao valor exibido na tela
                        cy.get('[data-total-valor]')
                        .invoke('attr', 'data-total-valor') // Obtém o valor do atributo data-total-valor
                        .then((valorTotalTela) => {
                        // Converte o valor exibido na tela para número
                        const valueTotalScreenNumeric = parseFloat(valorTotalTela)
                        const valueTotalScreenNumericPrecisao = valueTotalScreenNumeric.toFixed(2)

                        if (valueTotalScreenNumericPrecisao <=valorCupom){
                            throw new Error(`O valor do carrinho é menor do que o desconto aplicado, pois o sistema permite a aplicação do desconto mesmo em carrinhos com valor inferior. Valor apresentado em tela R$ ${valueTotalScreenNumericPrecisao}`)
                        } else{
                            expect(valorTotalCarrinhoComPrecisao).to.eq(valueTotalScreenNumericPrecisao)
                        }

                        cy.log(`Valor total do carrinho após desconto na tela: ${valueTotalScreenNumericPrecisao}`)

                        // Assert para comparar os dois valores
                        cy.log(`A validação foi bem-sucedida: o valor total do carrinho é igual ao valor exibido na tela.`)
                    })
            })
        })
    }
        
      
    } export default new CartPage()