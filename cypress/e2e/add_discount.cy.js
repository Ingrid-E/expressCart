describe('PF-007, Add discount code', () => {

    beforeEach(() => {
        cy.visit('/admin/login');
        cy.get('#email').type("shinhyejessi@gmail.com");
        cy.get('#password').type("1234");
        cy.get('#loginForm').click();
        cy.get('.mb-2 > :nth-child(4) > .nav-link').click();
        cy.get('.float-right > .btn').click();
    });

        //cy.get('#discountCode');
        //cy.get('#discountType');
        //cy.get('#discountValue');
        //cy.get('#discountStart');
        //cy.get('#discountEnd');
  
    //Case 1: Don't put any discount code
    it('Trying to add a discount without a discount code', () => {
        cy.get('#discountType').select('Percent');
        cy.get('#discountValue').type('20');
        cy.get('#discountStart').click();
        cy.get('#discountStart').type('19/06/2023 10:00');
        cy.get('[style="display: block;"] > .gj-picker > .modal-footer > :nth-child(2)').click();
        cy.get('#discountEnd').click();
        cy.get('#discountEnd').type('19/06/2023 21:00');
        cy.get('[style="display: block;"] > .gj-picker > .modal-footer > :nth-child(2)').click();
        cy.get('.float-right > .btn').click();
        cy.get('h2').should('have.text','New discount');
        cy.get('.float-right > .btn').should('have.text','Add discount');
    })
    
    //Case 2: Don't put any discount value 
    it('Trying to add a discount without a discount value', () => {
        cy.get('#discountCode').type('HalloweenDiscount01');
        cy.get('#discountType').select('Percent');
        cy.get('#discountStart').click();
        cy.get('#discountStart').type('01/10/2023 10:00');
        cy.get('[style="display: block;"] > .gj-picker > .modal-footer > :nth-child(2)').click();
        cy.get('#discountEnd').click();
        cy.get('#discountEnd').type('10/10/2023 21:00');
        cy.get('[style="display: block;"] > .gj-picker > .modal-footer > :nth-child(2)').click();
        cy.get('.float-right > .btn').click();
        cy.get('h2').should('have.text','New discount');
        cy.get('.float-right > .btn').should('have.text','Add discount');
    })

    //Case 3: Put bad start date
    it('Trying to add start date that is before than today', () => {
        cy.get('#discountCode').type('HalloweenDiscount01');
        cy.get('#discountType').select('Percent');
        cy.get('#discountValue').type('20');
        cy.get('#discountStart').click();
        cy.get('#discountStart').type('17/06/2023 10:00');
        cy.get('[style="display: block;"] > .gj-picker > .modal-footer > :nth-child(2)').click();
        cy.get('#discountEnd').click();
        cy.get('#discountEnd').type('30/06/2023 21:00');
        cy.get('[style="display: block;"] > .gj-picker > .modal-footer > :nth-child(2)').click();
        cy.get('.float-right > .btn').click();
        cy.get('#notify_message').should('have.text','Discount start date needs to be after today');
    })

    //Case 4: Put bad end date
    it('Trying to add initial date that is before than start date', () => {
        cy.get('#discountCode').type('HalloweenDiscount01');
        cy.get('#discountType').select('Percent');
        cy.get('#discountValue').type('20');
        cy.get('#discountStart').click();
        cy.get('#discountStart').type('20/06/2023 10:00');
        cy.get('[style="display: block;"] > .gj-picker > .modal-footer > :nth-child(2)').click();
        cy.get('#discountEnd').click();
        cy.get('#discountEnd').type('19/06/2023 21:00');
        cy.get('[style="display: block;"] > .gj-picker > .modal-footer > :nth-child(2)').click();
        cy.get('.float-right > .btn').click();
        cy.get('#notify_message').should('have.text','Discount end date needs to be after start date');
    })

    //Case 5: Put all valid classes
    it('Adding all valid classes', () => {
        cy.get('#discountCode').type('HalloweenDiscount01');
        cy.get('#discountType').select('Percent');
        cy.get('#discountValue').type('20');
        cy.get('#discountStart').click();
        cy.get('#discountStart').type('23/06/2023 10:00');
        cy.get('[style="display: block;"] > .gj-picker > .modal-footer > :nth-child(2)').click();
        cy.get('#discountEnd').click();
        cy.get('#discountEnd').type('27/06/2023 21:00');
        cy.get('[style="display: block;"] > .gj-picker > .modal-footer > :nth-child(2)').click();
        cy.get('.float-right > .btn').click();
        cy.get('#notify_message').should('have.text','Discount code created successfully');
    })

  })