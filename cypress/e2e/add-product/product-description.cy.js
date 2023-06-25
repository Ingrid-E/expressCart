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

  it('type into product description input using a correct description', () => {
    cy.visit('/admin/product/new');
    cy.get('#productTitle').type('LLavero gato');
    cy.get('#productPrice').type('25.00');
    cy.get('#productGtin').type('123456');
    /* cy.get('#productPermalink').type('llaverogato'); */
    cy.get('.note-editable').type(
      'Llavero de gato con colores llamativos para que seas la envidia de los demás'
    );
    cy.get('[type="submit"]').click();
    cy.get('#notify_message').should('have.class', 'alert-success');
    cy.get('#notify_message').should('have.text', 'New product successfully created');
    cy.url().should('include', '/edit');
  });

  it('type into product description input using a description that have less than 25 characters', () => {
    cy.visit('/admin/product/new');
    cy.get('#productTitle').type('LLavero gato');
    cy.get('#productPrice').type('25.00');
    cy.get('#productGtin').type('123456');
    cy.get('.note-editable').type('Llavero de gato');
    cy.get('[type="submit"]').click();
    cy.get('#validationModalBody').within(() => {
      cy.get('.text-danger').should(
        'have.text',
        'should NOT be shorter than 25 characters'
      );
    });
  });

  it('leave the product description input empty', () => {
    cy.visit('/admin/product/new');
    cy.get('#productTitle').type('LLavero gato');
    cy.get('#productPrice').type('25.00');
    cy.get('#productGtin').type('123456');
    cy.get('[type="submit"]').click();
    cy.url().should('include', '/new');
  });
});
