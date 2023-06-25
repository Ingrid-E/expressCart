/* eslint-disable extra-rules/no-commented-out-code */
/* eslint-disable no-undef */
context('add product description', () => {
  beforeEach(() => {
    cy.visit('/admin/login');
    cy.get('.form-signin').within(() => {
      cy.get('[name="email"]').type('admin@test.com');
      cy.get('[name="password"]').type('123');
      cy.get('[type="submit"]').click();
    });
  });

//   it('type into filter input using a correct string', () => {
//     cy.visit('/admin/customers');
//     cy.get('#customer_filter').type('');
//     cy.get('#btn_customer_filter').click();
//     cy.get('#notify_message').should('have.class', 'alert-danger');
//     cy.get('#notify_message').should('have.text', 'Please enter a keyword to filter');
//   });

  it('type into filter input using special characters', () => {
    cy.visit('/admin/customers');
    cy.get('#customer_filter').type('#pedro');
    cy.get('#btn_customer_filter').click();
    cy.get('#notify_message').should('have.class', 'alert-danger');
    cy.get('#notify_message').should('have.text', 'Not Found');
  });

  it('leave the filter input empty', () => {
    cy.visit('/admin/customers');
    cy.get('#btn_customer_filter').click();
    cy.get('#notify_message').should('have.class', 'alert-danger');
    cy.get('#notify_message').should('have.text', 'Please enter a keyword to filter');
  });
});
