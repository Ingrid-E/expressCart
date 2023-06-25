describe('PF-008, Create an account', () => {

    beforeEach(() => {
        cy.visit('/admin/login');
        cy.get('#email').type('admin@test.com');
        cy.get('#password').type('123');
        cy.get('#loginForm').click();
        cy.get(':nth-child(7) > .nav-link').click();
        cy.get('.float-right > .btn').click();
    });

    //User account inserted
    /*cy.get('#usersName')
    cy.get('#userEmail')
    cy.get('#userPassword')
    cy.get('#userNewForm > :nth-child(4) > .form-control')*/
  
    //Case 1: Don't put username
    it('Trying to create an account without username', () => {
        cy.get('#userEmail').type('LittleFrog21@gmail.com');
        cy.get('#userPassword').type('1234');
        cy.get('#userNewForm > :nth-child(4) > .form-control').type('1234');
        cy.get('#btnUserAdd').click();
        cy.get('h2').should('have.text','New User');
        cy.get('#btnUserAdd').should('have.text','Create');
    })

    //Case 2: Put email without @ character
    it('Trying to create an account with a bad email, email without @ character', () => {
        cy.get('#usersName').type('LittleFrog21');
        cy.get('#userEmail').type('LittleFrog21gmail.com');
        cy.get('#userPassword').type('1234');
        cy.get('#userNewForm > :nth-child(4) > .form-control').type('1234');
        cy.get('#btnUserAdd').click();
        cy.get('h2').should('have.text','New User');
        cy.get('#btnUserAdd').should('have.text','Create');
    })

    //Case 3: Put email without a domain (.com,.es, etc)
    it('Trying to create an account with a bad email, email that has not a domain', () => {
        cy.get('#usersName').type('LittleFrog21');
        cy.get('#userEmail').type('LittleFrog21@gmailcom');
        cy.get('#userPassword').type('1234');
        cy.get('#userNewForm > :nth-child(4) > .form-control').type('1234');
        cy.get('#btnUserAdd').click();
        cy.get('#notify_message').should('have.text','Failed to create user. Check inputs.');
    })

    //Case 4: Don't put password or password confirm
    it('Trying to create an account without password', () => {
        cy.get('#usersName').type('LittleFrog21');
        cy.get('#userEmail').type('LittleFrog21@gmail.com');
        cy.get('#btnUserAdd').click();
        cy.get('h2').should('have.text','New User');
        cy.get('#btnUserAdd').should('have.text','Create');
    })

    //Case 5: Don't put a valid password confirm
    it('Trying to create an account without confirm password', () => {
        cy.get('#usersName').type('LittleFrog21');
        cy.get('#userEmail').type('LittleFrog21@gmail');
        cy.get('#userPassword').type('1234');
        cy.get('#userNewForm > :nth-child(4) > .form-control').type('1243');
        cy.get('#btnUserAdd').click();
        cy.get('h2').should('have.text','New User');
        cy.get('#btnUserAdd').should('have.text','Create');
    })

    //Case 6: Put all valid classes
    it('Adding all valid classes', () => {
        cy.get('#usersName').type('LittleFrog21');
        cy.get('#userEmail').type('LittleFrog21@gmail.com');
        cy.get('#userPassword').type('1234');
        cy.get('#userNewForm > :nth-child(4) > .form-control').type('1234');
        cy.get('#btnUserAdd').click();
        cy.get('#notify_message').should('have.text','User account inserted');
    })

  })