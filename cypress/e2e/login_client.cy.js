describe('Login Cliente prueba end-to-end', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('a[href="/customer/account"]').click();
  });

  it('login page displays', () => {
    cy.get('.form-signin-heading').should('contain', 'Please sign in');
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.url().should('include', '/customer/login');
  })
  it('should show validation errors on empty form submission', () => {
    cy.get('#customerloginForm').click();
    cy.url().should('include', '/customer/login');
    cy.get('#notify_message').should('contain', 'A customer with that email does not exist.');
    cy.get('#notify_message').should('have.css', 'display', 'block');
  });
  
  it('should show validation error for invalid email', () => {
    cy.get('#email').type('invalidemail');
    cy.get('#customerloginForm').click();
    cy.url().should('include', '/customer/login');
    cy.get('#notify_message').should('contain', 'A customer with that email does not exist.');
    cy.get('#notify_message').should('have.css', 'display', 'block');
  });
  it('should display error message for incorrect credentials', () => {
    cy.get('#email').type('admin@example.com');
    cy.get('#password').type('incorrectpassword');
    cy.get('#customerloginForm').click();
    cy.url().should('include', '/customer/login');
    cy.get('#notify_message').should('contain', 'A customer with that email does not exist.');
    cy.get('#notify_message').should('have.css', 'display', 'block');
  });

  it('should successfully log in with valid credentials', () => {
    cy.get('#email').type('customer@example.com');
    cy.get('#password').type('123');
    cy.get('#customerloginForm').click();
    cy.url().should('include', '/customer/account');
  });
})