describe('PF-005, Amount of products to add into the cart', () => {

  beforeEach(() => {
    cy.visit('/product/bbq');
  });

  //Case 1: Try to add 0 products into the car
  it('Trying to add 0 products into the cart', () => {
    cy.get('#product_quantity').clear();
    cy.get('#product_quantity').type('0');
    cy.get('.btnAddToCart > .btn').click();
  })


  //Case 2: Try to add 24 products into the car
  it('Trying to add 1 product into the cart', () => {
    cy.get('.btnAddToCart > .btn').click();
    cy.get('#notify_message').should('have.text',
      'Cart successfully updated')
  })

  //Case 3: Try to add 24 products into the car
  it('Trying to add 25 products into the cart', () => {
    cy.get('#product_quantity').clear();
    cy.get('#product_quantity').type('25');
    cy.get('.btnAddToCart > .btn').click();
    cy.get('#notify_message').should('have.text',
      'Cart successfully updated')
  })

    //Case 4: Try to add more of 25 products into the car
    it('Trying to add more of 25 products into the cart', () => {
      cy.get('#product_quantity').clear();
      cy.get('#product_quantity').type('26');
      cy.get('#notify_message').should('have.text',
        'Exceeds maximum quantity: 25')
    })

})