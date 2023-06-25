/* eslint-disable no-undef */
/* eslint-disable quotes */
context("add product GTIN", () => {
  beforeEach(() => {
    cy.visit('/admin/login');
    cy.get('.form-signin').within(() => {
      cy.get('[name="email"]').type('admin@test.com');
      cy.get('[name="password"]').type('123');
      cy.get('[type="submit"]').click();
    });
  });

  it("type into product GTIN input using a correct serial number", () => {
    cy.visit("/admin/product/new");
    cy.get("#productTitle").type("Camiseta estampada");
    cy.get("#productPrice").type("35.00");
    cy.get("#productGtin").type("e123456789");
    cy.get("#productPermalink").type("camisetaestampada");
    cy.get(".note-editable").type(
      "Camiseta estampada con diseños unicos que te encantaran a ti y a tus amigos"
    );
    cy.get('[type="submit"]').click();
    cy.get("#notify_message").should("have.class", "alert-success");
    cy.get("#notify_message").should("have.text", "New product successfully created");
    cy.url().should("include", "/edit");
  });

  it("type into product GTIN input using letters differents to e", () => {
    cy.visit("/admin/product/new");
    cy.get("#productTitle").type("Camiseta estampada");
    cy.get("#productPrice").type("35.00");
    cy.get("#productGtin").type("4487ljs7");
    cy.get("#productPermalink").type("camisetaestampada2");
    cy.get(".note-editable").type(
      "Camiseta estampada con diseños unicos que te encantaran a ti y a tus amigos"
    );
    cy.get('[type="submit"]').click();
    cy.url().should("include", "/edit");
    cy.get("#productGtin").should("have.value", "44877");
  });

  it("type into product GTIN input using special caracters", () => {
    cy.visit("/admin/product/new");
    cy.get("#productTitle").type("Camiseta estampada");
    cy.get("#productPrice").type("35.00");
    cy.get("#productGtin").type("12345/6789$");
    cy.get("#productPermalink").type("camisetaestampada3");
    cy.get(".note-editable").type(
      "Camiseta estampada con diseños unicos que te encantaran a ti y a tus amigos"
    );
    cy.get('[type="submit"]').click();
    cy.url().should("include", "/edit");
    cy.get("#productGtin").should("have.value", "123456789");
  });

  it("type into product GTIN input using spaces", () => {
    cy.visit("/admin/product/new");
    cy.get("#productTitle").type("Camiseta estampada");
    cy.get("#productPrice").type("35.00");
    cy.get("#productGtin").type("123 456 789");
    cy.get("#productPermalink").type("camisetaestampada4");
    cy.get(".note-editable").type(
      "Camiseta estampada con diseños unicos que te encantaran a ti y a tus amigos"
    );
    cy.get('[type="submit"]').click();
    cy.url().should("include", "/edit");
    cy.get("#productGtin").should("have.value", "123456789");
  });

  it("type into product GTIN input using more than one letter e", () => {
    cy.visit("/admin/product/new");
    cy.get("#productTitle").type("Camiseta estampada");
    cy.get("#productPrice").type("35.00");
    cy.get("#productGtin").type("e123e456789");
    cy.get("#productPermalink").type("camisetaestampada5");
    cy.get(".note-editable").type(
      "Camiseta estampada con diseños unicos que te encantaran a ti y a tus amigos"
    );
    cy.get('[type="submit"]').click();
    cy.url().should("include", "/edit");
    cy.get("#productGtin").should("have.value", "");
  });
});
