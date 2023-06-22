/* eslint-disable no-undef */
/* eslint-disable quotes */
context("add product GTIN", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1111/admin/product/new");
  });

  it("type into product GTIN input using a correct serial number", () => {
    cy.get(".form-signin").within(() => {
      cy.get('[name="email"]').type("jean123456789@hotmail.com");
      cy.get('[type="submit"]').click();
    });
    cy.visit("http://localhost:1111/admin/product/new");
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
    cy.get(".form-signin").within(() => {
      cy.get('[name="email"]').type("jean123456789@hotmail.com");
      cy.get('[type="submit"]').click();
    });
    cy.visit("http://localhost:1111/admin/product/new");
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
    cy.get(".form-signin").within(() => {
      cy.get('[name="email"]').type("jean123456789@hotmail.com");
      cy.get('[type="submit"]').click();
    });
    cy.visit("http://localhost:1111/admin/product/new");
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
    cy.get(".form-signin").within(() => {
      cy.get('[name="email"]').type("jean123456789@hotmail.com");
      cy.get('[type="submit"]').click();
    });
    cy.visit("http://localhost:1111/admin/product/new");
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
    cy.get(".form-signin").within(() => {
      cy.get('[name="email"]').type("jean123456789@hotmail.com");
      cy.get('[type="submit"]').click();
    });
    cy.visit("http://localhost:1111/admin/product/new");
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
