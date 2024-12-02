class LoginPage {
    
    go() {
        cy.get('#Caminho_98') //Acessar página de login
          .click()

        cy.contains('h1', 'Identificação') //Validando tela atual
            .should('be.visible')
    }

    realizarLogin(email, senha){
        cy.get('#id_email')
            .type(email)

        cy.get('#id_senha')
            .type(senha)
    }

    realizeLoginFixture(tipoCliente) {
        cy.fixture('dados.json').then((dados) =>  {
          let usuario;
      
          // Verifica se o tipo de cliente é PF ou PJ e seleciona os dados corretos
          if (tipoCliente === 'PF') {
            usuario = dados[0]; // dados[0] para PF
          } else if (tipoCliente === 'PJ') {
            usuario = dados[1]; // dados[1] para PJ
          } else {
            cy.log('Tipo de cliente inválido');
            return;
          }
          
          const email = String(usuario.email)
          const senha = String(usuario.senha)
          // Preenche os campos de email e senha com os dados do usuário
          cy.get('#id_email')
            .type(email);
      
          cy.get('#id_senha')
            .type(senha);
        });
      }

    submit(){ //Button para realizar login
        cy.contains('button', 'Prosseguir')
            .click()
    }

    myAccount(){
        cy.validatePageTitle('Minha Conta - QA Store Desafio') //Validar título da página
        cy.contains('h3', 'Minha Conta')
          .should('be.visible')
    }

}

export default new LoginPage()