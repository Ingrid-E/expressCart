import 'cypress-iframe';

let testUser = {
  'email': 'test@gmail.com',
  'companyName': 'Test Compant',
  'fistName': 'Jane',
  'lastName': 'Doe',
  'address1': 'Address',
  'country': 'Colombia',
  'state': 'cali',
  'postCode': '70063',
  'phoneNumber': '123123123',
  'orderComment': 'order comment'
}

let workingCard = {
  'number': 4242424242424242,
  'cvc': '123',
  'date': '12/24',
  'country': 'Colombia'
}

let failCard = {
  'number': 4242424242424242,
  'cvc': '123',
  'date': '12/24',
  'country': 'Colombia'
}


describe('Creación de orden end-to.end', () => {
  beforeEach(() => {
    cy.mockStripeAPI();
  });

  it('order is success', () => {

    cy.intercept('POST', 'https://api.stripe.com/v1/payment_intents/*/confirm', (req) => {
      req.reply({
        statusCode: 200,
        body: {}
      });
    }).as('confirmPaymentIntent');

    cy.visit('/')
    cy.get('a.btn.btn-primary.add-to-cart').click()
    cy.get('a.btn.menu-btn').click();
    cy.visit('/checkout/information');
    cy.get('input[name="shipEmail"]').type(testUser.email);
    cy.get('input[name="shipCompany"]').type(testUser.companyName);
    cy.get('input[name="shipFirstname"]').type(testUser.fistName);
    cy.get('input[name="shipLastname"]').type(testUser.lastName);
    cy.get('input[name="shipAddr1"]').type(testUser.address1);
    cy.get('input[name="shipAddr2"]').type(testUser.address1);
    cy.get('select[name="shipCountry"]').select(testUser.country);
    cy.get('input[name="shipState"]').type(testUser.state);
    cy.get('input[name="shipPostcode"]').type(testUser.postCode);
    cy.get('input[name="shipPhoneNumber"]').type(testUser.phoneNumber);
    cy.get('textarea[name="orderComment"]').type(testUser.orderComment);
    cy.get('a#checkoutInformation').click();
    cy.get('a.btn.btn-primary.float-right[href="/checkout/payment"]').click();
    cy.iframe('#payment-element iframe').then($iframe => {
      cy.wrap($iframe)
        .find('input[name="number"]')
        .type(workingCard.number);
      cy.wrap($iframe)
        .find('input[name="expiry"]')
        .type(workingCard.date);
      cy.wrap($iframe)
        .find('input[name="cvc"]')
        .type(workingCard.cvc);
      cy.wrap($iframe)
        .find('select[name="country"]')
        .type(workingCard.country);
    });

    cy.get('#submit').click().then(() => {
      cy.url().then((url) => {
        cy.visit('/payment/1234567')
      });
    });

    cy.url().should('include', '/payment');
    cy.get('h2.text-success').should('contain', 'Your payment has been successfully processed');
    cy.get('h5.text-warning').should('contain', 'Please retain the details above as a reference of payment');
  })

  it('order fails on card', () => {

    cy.intercept('POST', 'https://api.stripe.com/v1/payment_intents/*/confirm', (req) => {
      req.reply({
        statusCode: 402,
        body: {}
      });
    }).as('failedPayment');

    cy.visit('/')
    cy.get('a.btn.btn-primary.add-to-cart').click()
    cy.get('a.btn.menu-btn').click();
    cy.visit('/checkout/information');
    cy.get('input[name="shipEmail"]').type(testUser.email);
    cy.get('input[name="shipCompany"]').type(testUser.companyName);
    cy.get('input[name="shipFirstname"]').type(testUser.fistName);
    cy.get('input[name="shipLastname"]').type(testUser.lastName);
    cy.get('input[name="shipAddr1"]').type(testUser.address1);
    cy.get('input[name="shipAddr2"]').type(testUser.address1);
    cy.get('select[name="shipCountry"]').select(testUser.country);
    cy.get('input[name="shipState"]').type(testUser.state);
    cy.get('input[name="shipPostcode"]').type(testUser.postCode);
    cy.get('input[name="shipPhoneNumber"]').type(testUser.phoneNumber);
    cy.get('textarea[name="orderComment"]').type(testUser.orderComment);
    cy.get('a#checkoutInformation').click();
    cy.get('a.btn.btn-primary.float-right[href="/checkout/payment"]').click();
    cy.iframe('#payment-element iframe').then($iframe => {
      cy.wrap($iframe)
        .find('input[name="number"]')
        .type(failCard.number);
      cy.wrap($iframe)
        .find('input[name="expiry"]')
        .type(failCard.date);
      cy.wrap($iframe)
        .find('input[name="cvc"]')
        .type(failCard.cvc);

      cy.wrap($iframe)
        .find('select[name="country"]')
        .type(failCard.country);
    });

    cy.get('#submit').click().then(() => {
      cy.url().then((url) => {
      });
    });

    cy.url().should('include', '/checkout/payment');
    cy.get('#payment-message').should('contain', 'An unexpected error occured.');
  })
})