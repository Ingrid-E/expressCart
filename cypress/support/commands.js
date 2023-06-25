const {clearSessionValue} = require('../../lib/common')


Cypress.Commands.add('mockStripeAPI', () => {
    cy.intercept('POST', 'https://api.stripe.com/v1/tokens', (req) => {
      req.reply((res) => {
        res.send({
          fixture: 'stripe/token.json',
          statusCode: 200,
        });
      });
    });

    cy.intercept('POST', 'https://r.stripe.com/0', (req) => {
        req.reply({
          statusCode: 200, // The desired status code of the mocked response
          body: {}, // The desired response body
        });
      });

      cy.intercept('POST', 'https://r.stripe.com/6', (req) => {
    req.reply({
      statusCode: 200, // The desired status code of the mocked response
      body: {}, // The desired response body
    });
  });


cy.readFile('./cypress/files/paymentSuccess.html').then((html)=>{
  cy.intercept('GET', 'http://localhost:1111/payment/*',(req)=>{
    req.reply({
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body: html
    });
  })
})

  
});
