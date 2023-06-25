context('add product description', () => {
  beforeEach(() => {
    cy.visit('/admin/login');
    cy.get('.form-signin').within(() => {
      cy.get('[name="email"]').type('admin@test.com');
      cy.get('[name="password"]').type('123');
      cy.get('[type="submit"]').click();
    });
  });

  it('type into page name input using a correct string', () => {
    cy.visit('/admin/settings/pages/new');
    cy.get('#pageName').type('About');
    cy.get('#pageSlug').type('about');
    cy.get('.note-editable').type(
      'This is the about of our website'
    );
    cy.get('#btnPageUpdate').click();
    cy.get('#notify_message').should('have.class', 'alert-success');
    cy.get('#notify_message').should(
      'have.text',
      'New page successfully created'
    );
  });

  it('leave the page name input empty', () => {
    cy.visit('/admin/settings/pages/new');
    cy.get('#pageSlug').type('about');
    cy.get('.note-editable').type(
      'This is the about of our website'
    );
    cy.get('#btnPageUpdate').click();
    cy.get('#notify_message').should('have.class', 'alert-danger');
    cy.get('#notify_message').should(
      'have.text',
      'Page name is required'
    );
  });

  it('type into page slug input using a correct string', () => {
    cy.visit('/admin/settings/pages/new');
    cy.get('#pageName').type('About');
    cy.get('#pageSlug').type('about');
    cy.get('.note-editable').type(
      'This is the about of our website'
    );
    cy.get('#btnPageUpdate').click();
    cy.get('#notify_message').should('have.class', 'alert-success');
    cy.get('#notify_message').should(
      'have.text',
      'New page successfully created'
    );
  });

  it('leave the page slug input empty', () => {
    cy.visit('/admin/settings/pages/new');
    cy.get('#pageName').type('About');
    cy.get('.note-editable').type(
      'This is the about of our website'
    );
    cy.get('#btnPageUpdate').click();
    cy.get('#notify_message').should('have.class', 'alert-danger');
    cy.get('#notify_message').should(
      'have.text',
      'Page slug is required'
    );
  });

  it('type into page content input using a correct string', () => {
    cy.visit('/admin/settings/pages/new');
    cy.get('#pageName').type('About');
    cy.get('#pageSlug').type('about');
    cy.get('.note-editable').type(
      'This is the about of our website'
    );
    cy.get('#btnPageUpdate').click();
    cy.get('#notify_message').should('have.class', 'alert-success');
    cy.get('#notify_message').should(
      'have.text',
      'New page successfully created'
    );
  });

  it('leave the page content input empty', () => {
    cy.visit('/admin/settings/pages/new');
    cy.get('#pageName').type('About');
    cy.get('#pageSlug').type('about');
    cy.get('#btnPageUpdate').click();
    cy.get('#notify_message').should('have.class', 'alert-danger');
    cy.get('#notify_message').should(
      'have.text',
      'Page content is required'
    );
  });
});
