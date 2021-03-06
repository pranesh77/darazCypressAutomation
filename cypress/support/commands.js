// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import 'cypress-iframe';




Cypress.Commands.add("darazLogin", (email, pw) => {

    cy.xpath("//div//a[text()='login']").click({force:true});
    
    cy.wait(2000);

    cy.xpath("//input[@type='text' and @placeholder='Please enter your Phone Number or Email']", { timeout: 10000 }).scrollIntoView().should('be.visible').type(email);
    cy.xpath("//input[@type='password' and @placeholder='Please enter your password']", { timeout: 10000 }).should('be.visible').type(pw);
    cy.xpath("//button[@type='submit' and text()='LOGIN']").click();

})

Cypress.Commands.add('LoginUsingIframe', (iframeEmail, iframePw) => {
    cy.iframe('.login-iframe').as('loginFrame');
    cy.get('@loginFrame').find("input[placeholder='Please enter your Phone Number or Email']").type(iframeEmail);
    cy.get('@loginFrame').find("input[type='password']").type(iframePw);
    cy.get('@loginFrame').find("button[type='submit']").click();
})

Cypress.Commands.add('darazSearch', (searchedText) => {

    cy.xpath("//input[@type='search' and @placeholder='Search in Daraz']").should('be.visible').type(searchedText).type('{enter}');

})

Cypress.Commands.add('priceRange', (lowPrice, highPrice) => {
    // cy.xpath("//input[@type='number' and @placeholder='Min']",{timeout: 10000}).scrollIntoView().should('be.visible').click().type(lowPrice);
    cy.waitUntil(() => cy.xpath("//input[@type='number' and @placeholder='Min']").scrollIntoView().should('be.visible').click().type(lowPrice));

    cy.waitUntil(() => cy.xpath("//input[@type='number' and @placeholder='Max']").scrollIntoView().should('be.visible').click().type(highPrice));

        cy.xpath("//button[@type='button' and contains(@class,'ant-btn')]").click();


    // cy.wait('@minWaitTimeout');
})

Cypress.Commands.add('sortByRating', (position) => {
    cy.waitUntil(() => cy.xpath("//div[@class='c2uiAC']//div[@class='cJpy4P ']")).eq(position).should('be.visible').click();
})


// FOR FUTURE REFERENCE

// Cypress.Commands.add("login", () => {
//     cy.get('#anonLogin > .grey',).click()
//     cy.wait(5000) //DOING THIS WILL HELP TO WAIT FOR APIs
//     cy.waitUntil(
//         () =>
//         cy.get('.mod-login')
//                 .should('be.visible'),

//         {
//             errorMsg: 'Failed To View Quizzes in landing screen', // overrides the default error message
//             timeout: 15000, // waits up to 2000 ms, default to 5000
//             interval: 500, // performs the check every 500 ms, default to 200
//         }
//     )
//     cy.waitUntil(
//         () =>
//         cy.get('.mod-login-input-loginName')
//                 .should('be.visible'),

//         {
//             errorMsg: 'Failed To View Quizzes in landing screen', // overrides the default error message
//             timeout: 15000, // waits up to 2000 ms, default to 5000
//             interval: 500, // performs the check every 500 ms, default to 200
//         }
//     )
//     cy.waitUntil(
//         () =>
//         cy.get('.mod-input-password')
//                 .should('be.visible'),

//         {
//             errorMsg: 'Failed To View Quizzes in landing screen', // overrides the default error message
//             timeout: 15000, // waits up to 2000 ms, default to 5000
//             interval: 500, // performs the check every 500 ms, default to 200
//         }
//     )
// });


