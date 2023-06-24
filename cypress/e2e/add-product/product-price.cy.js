/* eslint-disable quotes */
/* eslint-disable no-undef */
context("add product price", () => {
  beforeEach(() => {
    cy.visit("/admin/product/new");
  });

  it("type into product price input using a correct price", () => {
    cy.get(".form-signin").within(() => {
      cy.get('[name="email"]').type("admin@test.com");
      cy.get('[name="password"]').type("123");
      cy.get('[type="submit"]').click();
    });
    cy.visit("/admin/product/new");
    cy.get("#productTitle").type("Lampara de mesa");
    cy.get("#productPrice").type("100.00");
    cy.get("#productGtin").type("123456");
    cy.get(".note-editable").type(
      "Lampara de mesa que te ayudara cuando necesites enfocarte en tus estudios"
    );
    cy.get('[type="submit"]').click();
    cy.get("#notify_message").should("have.class", "alert-success");
    cy.get("#notify_message").should("have.text", "New product successfully created");
    cy.url().should("include", "/edit");
  });

  it("type into product price input using a non-numeric value", () => {
    cy.get(".form-signin").within(() => {
      cy.get('[name="email"]').type("admin@test.com");
      cy.get('[name="password"]').type("123");
      cy.get('[type="submit"]').click();
    });
    cy.visit("/admin/product/new");
    cy.get("#productTitle").type("Lampara de mesa");
    cy.get("#productPrice").type("precio1");
    cy.get("#productGtin").type("123456");
    cy.get(".note-editable").type(
      "Lampara de mesa que te ayudara cuando necesites enfocarte en tus estudios"
    );
    cy.get('[type="submit"]').click();
    cy.get("#productPrice").should("have.value", "");
  });

  it("type into product price input using one or more special caracters", () => {
    cy.get(".form-signin").within(() => {
      cy.get('[name="email"]').type("admin@test.com");
      cy.get('[name="password"]').type("123");
      cy.get('[type="submit"]').click();
    });
    cy.visit("/admin/product/new");
    cy.get("#productTitle").type("Lampara de mesa");
    cy.get("#productPrice").type("100,00");
    cy.get("#productGtin").type("123456");
    cy.get(".note-editable").type(
      "Lampara de mesa que te ayudara cuando necesites enfocarte en tus estudios"
    );
    cy.get('[type="submit"]').click();
    cy.get("#validationModalBody").within(() => {
      // cy.get("p").should("have.text", "productPrice - ")
      cy.get(".text-danger").should(
        "have.text",
        "Should be a full 2 decimal value. Eg: 10.99"
      );
    });
  });

  it("type into product price input using less than two decimal ", () => {
    cy.get(".form-signin").within(() => {
      cy.get('[name="email"]').type("admin@test.com");
      cy.get('[name="password"]').type("123");
      cy.get('[type="submit"]').click();
    });
    cy.visit("/admin/product/new");
    cy.get("#productTitle").type("Lampara de mesa");
    cy.get("#productPrice").type("100.0");
    cy.get("#productGtin").type("123456");
    cy.get(".note-editable").type(
      "Lampara de mesa que te ayudara cuando necesites enfocarte en tus estudios"
    );
    cy.get('[type="submit"]').click();
    // eslint-disable-next-line quotes
    cy.get("#validationModalBody").within(() => {
      // cy.get("p").should("have.text", "productPrice - ")
      cy.get(".text-danger").should(
        "have.text",
        "Should be a full 2 decimal value. Eg: 10.99"
      );
    });
  });

  it("type into product price input using more than two decimal ", () => {
    cy.get(".form-signin").within(() => {
      cy.get('[name="email"]').type("admin@test.com");
      cy.get('[name="password"]').type("123");
      cy.get('[type="submit"]').click();
    });
    cy.visit("/admin/product/new");
    cy.get("#productTitle").type("Lampara de mesa");
    cy.get("#productPrice").type("100.000");
    cy.get("#productGtin").type("123456");
    cy.get(".note-editable").type(
      "Lampara de mesa que te ayudara cuando necesites enfocarte en tus estudios"
    );
    cy.get('[type="submit"]').click();
    // eslint-disable-next-line quotes
    cy.get("#validationModalBody").within(() => {
      // cy.get("p").should("have.text", "productPrice - ")
      cy.get(".text-danger").should(
        "have.text",
        "Should be a full 2 decimal value. Eg: 10.99"
      );
    });
  });

  it("type into product price input using space", () => {
    cy.get(".form-signin").within(() => {
      cy.get('[name="email"]').type("admin@test.com");
      cy.get('[name="password"]').type("123");
      cy.get('[type="submit"]').click();
    });
    cy.visit("/admin/product/new");
    cy.get("#productTitle").type("Lampara de mesa");
    cy.get("#productPrice").type("100 000");
    cy.get("#productGtin").type("123456");
    cy.get(".note-editable").type(
      "Lampara de mesa que te ayudara cuando necesites enfocarte en tus estudios"
    );
    cy.get('[type="submit"]').click();
    // eslint-disable-next-line quotes
    cy.get("#validationModalBody").within(() => {
      // cy.get("p").should("have.text", "productPrice - ")
      cy.get(".text-danger").should(
        "have.text",
        "Should be a full 2 decimal value. Eg: 10.99"
      );
    });
  });
});
