/* eslint-disable quotes */
/* eslint-disable no-undef */
context("add product permalink", () => {
  beforeEach(() => {
    cy.visit('/admin/login');
    cy.get('.form-signin').within(() => {
      cy.get('[name="email"]').type('admin@test.com');
      cy.get('[name="password"]').type('123');
      cy.get('[type="submit"]').click();
    });
  });

  it("type into product permalink input using a correct permalink", () => {
    cy.visit("/admin/product/new");
    cy.get("#productTitle").type("Collar gato");
    cy.get("#productPrice").type("50.00");
    cy.get("#productGtin").type("123456");
    cy.get("#productPermalink").type("collargato");
    cy.get(".note-editable").type(
      "Collar para tu gato que lo hara lucir como el gato mas refinado del barrio"
    );
    cy.get('[type="submit"]').click();
    cy.get("#notify_message").should("have.class", "alert-success");
    cy.get("#notify_message").should("have.text", "New product successfully created");
    cy.url().should("include", "/edit");
  });

  it("type into product permalink input using a permalink that exist already", () => {
    cy.visit("/admin/product/new");
    cy.get("#productTitle").type("Collar perro");
    cy.get("#productPrice").type("50.00");
    cy.get("#productGtin").type("123456");
    cy.get("#productPermalink").type("collarperro");
    cy.get(".note-editable").type(
      "Collar para tu perro que lo hara lucir como el perro mas refinado del barrio"
    );
    cy.get('[type="submit"]').click();
    cy.get("#notify_message").should("have.class", "alert-danger");
    cy.get("#notify_message").should("have.text", "Permalink already exists. Pick a new one.");
  });

  it("type into product permalink input using spaces", () => {
    cy.visit("/admin/product/new");
    cy.get("#productTitle").type("Collar perro");
    cy.get("#productPrice").type("50.00");
    cy.get("#productGtin").type("123456");
    cy.get("#productPermalink").type("collar perro");
    cy.get(".note-editable").type(
      "Collar para tu perro que lo hara lucir como el perro mas refinado del barrio"
    );
    cy.get('[type="submit"]').click();
    cy.get("#notify_message").should("have.class", "alert-success");
    cy.get("#notify_message").should("have.text", "New product successfully created");
    cy.url().should("include", "/edit");
    cy.get("#productPermalink").should("have.value", "collar");
  });
});
