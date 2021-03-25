describe('Login Suite', function () {

    //login details
    let MOBILE_NUMBER = "9803056815";
    let PASSWORD = "Testing@321";

    // search
    let SEARCH_QUERY = "mobile";

    // price range
    let MIN_PRICE_RANGE = "12000";
    let MAX_PRICE_RANGE = "20000";

    //rating level
    let RATING_RANGE = 2;


    before(function () {
        cy.fixture('login').then(function (data) {
            this.data = data;


               })


        cy.log('----------------- This is Global Hook Login ---------------');

        //Visit Daraz Site
        //  cy.visit("https://www.daraz.com.np");
        cy.visit("/");  // defined in cypress.json file

        //Click on Login Button
        cy.xpath("//div//a[text()='login']").should('be.visible').click();

        //  cy.darazLogin(this.data.mobile_num, this.data.password);
        cy.darazLogin(MOBILE_NUMBER, PASSWORD);

             cy.xpath("//div//span[@id='myAccountTrigger' and contains(text(),'account')]").should('be.visible').should("include.text", "account");


    })

    //  cy.xpath("//div//span[@id='myAccountTrigger' and contains(text(),'account')]").should('be.visible').should("include.text", "account");



    it('Login Test', function () {

        this.skip();


        cy.log('----------------- This is Login Test ---------------');

        //Visit Daraz Site
        cy.visit("https://www.daraz.com.np");

        //Click on Login Button
        cy.xpath("//div//a[text()='login']").click();

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
        cy.xpath("//div//span[@id='myAccountTrigger' and contains(text(),'account')]").should('be.visible').should("include.text", "account");

    })

    it('Logged In Validation', function () {

        this.skip();

        // cy.xpath("//div//span[@id='myAccountTrigger' and contains(text(),'account')]").should('be.visible').should("include.text", "account");

        // validate if logged in 
        // cy.xpath("//div//span[@id='myAccountTrigger' and contains(text(),'account')]",{timeout:"10000"}).should('be.visible').then(function ($getText) {

            // cy.waitUntil(() => cy.xpath("//div//span[@id='myAccountTrigger' and contains(text(),'account')]").should('be.visible').then(function ($getText) {

                cy.xpath("//div//span[@id='myAccountTrigger' and contains(text(),'account')]",{timeout:"10000"}).should('be.visible').then(function ($getText) {


        const getMessage = $getText.text();

            cy.log(getMessage);

            // expect(getMessage).to.match(/.* account/);

            expect(getMessage).to.match(/.+ account/);

        })

    })


    it('Search Test', function () {


        cy.log('----------------- This is Search Test ---------------');

        // cy.xpath("//input[@type='search' and @placeholder='Search in Daraz']").type("mobile").type('{enter}');
        cy.darazSearch(SEARCH_QUERY);

        //assert
        cy.url().should("include", "q=" + SEARCH_QUERY);

    })


    it('Filter Test', function () {


        // for temporary skipping test
        // this.skip();


        cy.log('----------------- This is Filter Test ---------------');


        // cy.xpath("//button[contains(@class,'search-box')]").click();

        // Select filter
        cy.xpath("//span[text()='Samsung']").should('be.visible').click();

        

        cy.wait(3000);

        // cy.get('[data-test=submitIsVisible]', { timeout: 10000 }).should('be.visible');

        cy.priceRange(MIN_PRICE_RANGE, MAX_PRICE_RANGE);
        // cy.xpath("//input[@type='number' and @placeholder='Min']").scrollIntoView().should('be.visible').click().type('15000');
        // cy.xpath("//input[@type='number' and @placeholder='Max']").scrollIntoView().should('be.visible').click().type('20000');


        cy.xpath("//button[@type='button' and contains(@class,'ant-btn')]").click();
        // assert
        cy.url().should("include", "&price=" + MIN_PRICE_RANGE + "-" + MAX_PRICE_RANGE);


        cy.wait(3000);
        // cy.wait('@asdf')
        cy.sortByRating(RATING_RANGE);
        // cy.xpath("//div[@class='c2uiAC']//div[@class='cJpy4P ']").eq(2).should('be.visible').click();

        //assert
        cy.url().should("include", "&rating=");


        // cy.scrollTo(0,400);

        // cy.scrollTo('center');



        // Select Service
        // cy.xpath("//span[text()='Cash On Delivery']").click();

    })

    it('Dropdown Test', function () {

        this.skip();

        cy.log("----------------- This is Dynamic Dropdown Test ----------------- ");

        cy.xpath("//div[contains(@class,'c3ypa1')]").scrollIntoView().should('be.visible').click({ force: true });

        // cy.xpath("//div[text()='Price low to high']").should('be.visible').click({force:true});
        cy.xpath("//div[text()='Price low to high']").scrollIntoView().should('be.visible').click();


    })

    it('Add to  Cart Test', function () {


        cy.log('----------------- This is Search Test ---------------');

        // cy.xpath("//input[@type='search' and @placeholder='Search in Daraz']").type("mobile").type('{enter}');
        cy.darazSearch(SEARCH_QUERY);

        //assert
        cy.url().should("include", "q=" + SEARCH_QUERY);





        // this.skip();

        cy.log("----------------- This is Add to Card Test ----------------- ");

        // cy.darazLogin(this.data.mobile_num, this.data.password);


        cy.xpath("//a//img[contains(@class,'c1ZEkM')]",{timeout:10000}).eq(0).should('be.visible').click();

        cy.xpath("//button//span[text()='Add to Cart']",{timeout:100000}).should('be.visible').click();

        // cy.xpath("//button//span[text()='Add to Cart']",{timeout:100000}).should(($x) => {
        //     expect($x).to.have.xpath("//input[@type='text' and @placeholder='Please enter your Phone Number or Email']",{timeout:10000}).scrollIntoView().should('be.visible').type(mobNum);
        //     cy.darazLogin(MOBILE_NUMBER, PASSWORD);

        // })

        cy.wait(5000);

        cy.frameLoaded('.login-iframe');
        
        // cy.iframe().type('');
        cy.iframe().find("input[@placeholder='Please enter your Phone Number or Email']").type('hello');

        // cy.xpath("//iframe[@class='login-iframe']").then(function($iFrame){
            // const iFrameContent = $iFrame.contents().find("input[placeholder='Please enter your Phone Number or Email']").val('9803056815');

            // cy.wrap(iFrameContent).click().type('9803056815');
        })


        // cy.wait(5000);

        // cy.window().its('open').should('be.called')


        // cy.darazLogin(MOBILE_NUMBER, PASSWORD);



        // cy.xpath("//div[@class='lzd-nav-cart']").should('be.visible').click();

        // cy.xpath("//label//span[@class='next-checkbox-inner']").eq(0).should('be.visible').click();
    })


