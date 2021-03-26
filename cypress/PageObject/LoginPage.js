/// <reference types="Cypress" />

class Login {

    constructor() {
        // this.mobile = ";
    }

    visitSite() {
        cy.visit("https://www.daraz.com.np");
    }

    fillMobileNum(mobNumber) {
        cy.xpath("//input[@type='text' and @placeholder='Please enter your Phone Number or Email']").type(mobNumber);
    }

    fillPassword(pass) {
        cy.xpath("//input[@type='password' and @placeholder='Please enter your password']").type(pass);
    }

    submitLogin() {
        cy.xpath("//button[@type='submit' and text()='LOGIN']").click();

    }
}

const loginPg = new Login();

export default loginPg;   // for using same object multiple times for accessing class


// export default Login;   // for creating separate object everytime for accessing class 