/// <reference types="cypress"/>

describe('Login In Daraz', ()=>{

    beforeEach(()=>{
        
        cy.visit(Cypress.env('login_url'));

    })


    it('Login With Valid User Regression Testing',()=>{ 

        // this.skip();
        // for (let i = 0; i < 10; i++) {
          cy.log('**Execution Count ${i}**');
          cy.intercept('POST','/user/api/login').as('login_check') 
          cy.login()  
          cy.wait('@login_check').then((login_request)=>{
            expect(login_request.response.statusCode).to.equal(200)
          })
          cy.get('#myAccountTrigger').click()
          cy.get(':nth-child(6) > .account-item-anchor').click()
          cy.log('**Completed Execution Loop  ${i}**');
        // }
      })


})
