import loginPg from '../../PageObject/LoginPage.js'
// import LoginPage from '../../PageObject/LoginPage.js'


/// do not run this, valid file is "darazAssignment.spec.js"

describe('Login Suite', function () {

    let MOBILE_NUMBER = "9803056815";
    let PASSWORD = "Testing@321"
 
    before(function(){
        cy.fixture('login').then(function(data){
            this.data = data;
        })
        cy.visit("/");  // defined in cypress.json file

    })

    it('Login Test Page Object', function () {

        cy.log('----------------- This is Login Test Via Page Object ---------------');

        // const loginPage = new LoginPage();
        
        // cy.visit("/");  // defined in cypress.json file

        cy.xpath("//div//a[text()='login']").click();


        
        loginPg.fillMobileNum(MOBILE_NUMBER);
        loginPg.fillPassword(PASSWORD);
        loginPg.submitLogin();


        // this.skip();
        
        //Visit Daraz Site
        // cy.visit("https://www.daraz.com.np");

        cy.xpath("//div//a[text()='login']").click();


        const lp = new LoginPage();
        lp.fillMobileNum(this.data.mobile_num);

        //Click on Login Button

        cy.darazLogin(this.data.mobile_num, this.data.password);

        // Enter credentails and submit 
        // cy.xpath("//input[@type='text' and @placeholder='Please enter your Phone Number or Email']").should('be.visible').type("9803056815");
        // cy.xpath("//input[@type='text' and @placeholder='Please enter your Phone Number or Email']").should('be.visible').type(this.data.mobile_num);


        // cy.xpath("//input[@type='password' and @placeholder='Please enter your password']").type("Testing@321");
        // cy.xpath("//input[@type='password' and @placeholder='Please enter your password']").type(this.data.password);
        

        // cy.xpath("//button[@type='submit' and text()='LOGIN']").click();

        // Verify text contains
    //    cy.contains('Pranesh Manandhar').should('be.visible');
    //    cy.xpath("//div//span[@id='myAccountTrigger' and contains(text(),'Pranesh Manandhar')]").should("include.text","Pranesh Manandhar");
    cy.xpath("//div//span[@id='myAccountTrigger' and contains(text(),'account')]").should('be.visible').should("include.text","account");
    })

    it('Search Test', function(){

        // it.skip();

        
        cy.log('----------------- This is Search Test ---------------');

        cy.xpath("//input[@type='search' and @placeholder='Search in Daraz']").type("mobile");
        cy.xpath("//button[contains(@class,'search-box')]").click();

        // Select filter
        cy.xpath("//span[text()='Samsung']").should('be.visible').click();

        cy.scrollTo(0,500);
    
        cy.xpath("//span[text()='Nokia']").should('be.visible').click();
        cy.xpath("//span[text()='Redmi']").should('be.visible').click();


        // Select Service
        cy.xpath("//span[text()='Cash On Delivery']").click();

    })
    
})