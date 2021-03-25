/// <reference types="Cypress" />

class Login{

    visitSite(){
        cy.visit("https://www.daraz.com.np");
    }

    fillMobileNum(mobNumber)
    {
        return cy.xpath("//input[@type='text' and @placeholder='Please enter your Phone Number or Email']").type(mobNumber);
    }

    fillPassword(pass){
     return  cy.xpath("//input[@type='password' and @placeholder='Please enter your password']").type(pass);
    }

    submitLogin(){
        cy.xpath("//button[@type='submit' and text()='LOGIN']").click();

    }
}

    export default LoginPage 