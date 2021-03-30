describe('Login Suite', function () {

    //login details
    var EMAIL_ADDRESS = 'josephwashington@mailinator.com';
    //  = "9803056815";
    let PASSWORD = "LoudSpace57";

    // search
    let SEARCH_QUERY = "Mobile";

    // price range
    let MIN_PRICE_RANGE = "12000";
    let MAX_PRICE_RANGE = "20000";

    //rating level
    let RATING_RANGE = 2;

    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log(err)
        return false
    })


    before(function () {

        // cy.fixture('login.json').then(function (data) {
        //     MOBILE_NUMBER = data.mobile_num;
        //     cy.log(MOBILE_NUMBER);
        // })


        cy.log('----------------- This is Global Hook Login ---------------');

        //Visit Daraz Site
        cy.visit("https://www.daraz.com.np");

        // cy.visit("/");  // defined in cypress.json file

        //Click on Login Button
        // cy.xpath("//div//a[text()='login']").should('be.visible').click();

        // //  cy.darazLogin(this.data.mobile_num, this.data.password);
        // cy.darazLogin(EMAIL_ADDRESS, PASSWORD);

        // cy.xpath("//div//span[@id='myAccountTrigger' and contains(text(),'account')]").should('be.visible').should("include.text", "account");


        

    })

    //  cy.xpath("//div//span[@id='myAccountTrigger' and contains(text(),'account')]").should('be.visible').should("include.text", "account");



    it('Login Test', function () {

        // test skipped as added on Before
        // this.skip();


        cy.log('----------------- This is Login Test ---------------');

        //Visit Daraz Site
        cy.visit("https://www.daraz.com.np");

        //Click on Login Button
        cy.xpath("//div//a[text()='login']").click();

        // cy.darazLogin(this.data.mobile_num, this.data.password);
        cy.darazLogin(EMAIL_ADDRESS, PASSWORD);


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

    it('Search Test', function () {

        // this.skip();


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

        // this.skip();

        cy.log("----------------- This is Dynamic Dropdown Test ----------------- ");

        cy.xpath("//div[contains(@class,'c3ypa1')]").scrollIntoView().should('be.visible').click({ force: true });

        // cy.xpath("//div[text()='Price low to high']").should('be.visible').click({force:true});
        cy.xpath("//div[text()='Price low to high']").scrollIntoView().should('be.visible').click();


    })

    it('Add / Remove item on Cart', function () {



        //    this.skip();

        cy.log("----------------- This is Add to Card Test ----------------- ");


        // cy.xpath("//a//img[contains(@class,'c1ZEkM')]", { timeout: 10000 }).eq(0).should('be.visible').click({ force: true });


        cy.waitUntil(() => cy.xpath("//a//img[contains(@class,'c1ZEkM')]").eq(0).should('be.visible').click({ force: true }), {
            errorMsg:"Failed to fetch elements for visiting detail page",
            timeout: 10000,
            interval: 500
        });

        cy.xpath("//button//span[text()='Add to Cart']", { timeout: 10000 }).scrollIntoView().should('be.visible').click();


        // Iframe login 

        cy.iframe('.login-iframe').as('loginFrame');
        cy.get('@loginFrame').find("input[placeholder='Please enter your Phone Number or Email']").type(EMAIL_ADDRESS);
        cy.get('@loginFrame').find("input[type='password']").type(PASSWORD);
        cy.get('@loginFrame').find("button[type='submit']").click();


        cy.xpath("//div[@class='cart']//button[text()='GO TO CART']", { timeout: 10000 }).scrollIntoView().should('be.visible').click();

        cy.xpath("//div[@class='checkbox-wrap']//input[@type='checkbox']", { timeout: 10000 }).should('be.enabled').click({force:true});

        cy.xpath("//div[@class='list-header-operations']//span[text()='Delete']", { timeout: 10000 }).should('be.visible').click();

        cy.xpath("//div[contains(@class,'mod-dialog-open')]//button[text()='REMOVE']", { timeout: 10000 }).should('be.visible').click();

    })

    it('Oliz page, free delivery and shop now visit', function () {

        cy.darazSearch('Oliz Store');

        cy.xpath("//div[@class='cRjKsc']//img",{timeout:10000}).eq(1).should('be.visible').click({force:true});
        cy.xpath("//div[@class='seller-name__wrapper']//a[@href]").scrollIntoView().should('be.visible').click({force:true});

        cy.url().should("include", "/shop/oliz-store");

        cy.xpath("//span[text()='Free Delivery']").should('be.visible').click();

        cy.xpath("//div[@class='product-item-bottom']").eq(1).should('be.visible').click();
    })

    it('Free delivery test', function () {


        // Free Delivery

        cy.darazSearch('Razer Viper Mini');
        
        cy.xpath("//div[@class='cRjKsc']//img",{timeout:10000}).eq(0).should('be.visible').click({force:true});
        
        cy.xpath("//div[@class='delivery-option-item__shipping-fee' and text()='Free']").scrollIntoView().should('be.visible').should('have.text','Free');

        // cy.xpath("//div[@class='delivery-option-item__shipping-fee' and text()='Free']").scrollIntoView().should('be.visible').should('contain','Free');


        // cy.xpath("//div[@class='delivery-option-item__shipping-fee' and text()='Rs. 59']").scrollIntoView().should('be.visible').should('have.text','Rs. 59');
    })
})


