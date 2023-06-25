describe('PF-006, Free Shipping', () => {

    beforeEach(() => {
      cy.visit('/');
    });

    //Note: Add products into the db and add them with their id


    //Case 1: Normal Product and purchase lower than 100 euro
    it('Make a purcharse with normal products lower than 100 euro', () => {
      cy.get('a[data-id="6461339d7fb7f132f09068b5"]').click();
      cy.get('a[data-id="6460555a6bf3c230d8ffe243"]').click();
      cy.get('a[data-id="646054d86bf3c230d8ffe242"]').click();
      cy.get('.navbar-nav > :nth-child(3) > .btn').click();
      cy.get('#shipping-amount').should('have.text','£10.00');
    })
                                
  
    //Case 2: Normal Product and purchase equal or higher than 100 euro
    it('Make a purcharse with normal products higher than 100 euro', () => {
      cy.get('a[data-id="6461339d7fb7f132f09068b5"]').click();
      cy.get('a[data-id="6461339d7fb7f132f09068b5"]').click();
      cy.get('a[data-id="6460555a6bf3c230d8ffe243"]').click();
      cy.get('a[data-id="646054d86bf3c230d8ffe242"]').click();
      cy.get('.navbar-nav > :nth-child(3) > .btn').click();
      cy.get('#shipping-amount').should('have.text','FREE shipping');
    })
  
    //Case 3: Suscription Product
    it('Make a purcharse with suscription products', () => {
      cy.get('a[data-id="646135947fb7f132f09068b6"]').click();
      cy.get('.navbar-nav > :nth-child(3) > .btn').click();
      cy.get('#shipping-amount').should('have.text','FREE shipping');
    })
  
  })