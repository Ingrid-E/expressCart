const shipping = require('../lib/modules/shipping-basic');

describe('test shipping', () => {
  test('Free shipping due to amount greater than treshhold', () => {
    const amount = 200;
    const req = {
      session: {
        totalCartDiscount: 0,
        totalCartAmount: 2000,
        cartSubscription: null
      }
    };
    shipping.calculateShipping(amount, req);
    expect(req.session.totalCartShipping).toBe(0);
    expect(req.session.shippingMessage).toBe('FREE shipping');
    expect(req.session.totalCartAmount).toBe(2000);
  });

  test('Free shipping due to subscription', () => {
    const amount = 200;
    const req = {
      session: {
        totalCartDiscount: 0,
        totalCartAmount: 2000,
        cartSubscription: true
      }
    };
    shipping.calculateShipping(amount, req);
    expect(req.session.totalCartShipping).toBe(0);
    expect(req.session.shippingMessage).toBe('FREE shipping');
    expect(req.session.totalCartAmount).toBe(2000);
  });

  test('calculate shipping if the customer dont have country information', () => {
    const amount = 80;
    const req = {
      session: {
        totalCartDiscount: 0,
        totalCartAmount: 2000
      }
    };
    shipping.calculateShipping(amount, req);
    expect(req.session.totalCartShipping).toBe(10);
    expect(req.session.shippingMessage).toBe('Estimated shipping');
    expect(req.session.totalCartAmount).toBe(90);
  });

  test('customer country is different to Australia', () => {
    const amount = 80;
    const req = {
      session: {
        totalCartDiscount: 0,
        totalCartAmount: 2000,
        customerCountry: 'Colombia'
      }
    };
    shipping.calculateShipping(amount, req);
    expect(req.session.totalCartShipping).toBe(25);
    expect(req.session.shippingMessage).toBe('International shipping');
    expect(req.session.totalCartAmount).toBe(105);
  });

  test('customer country is different to Australia', () => {
    const amount = 80;
    const req = {
      session: {
        totalCartDiscount: 0,
        totalCartAmount: 2000,
        customerCountry: 'Australia'
      }
    };
    shipping.calculateShipping(amount, req);
    expect(req.session.totalCartShipping).toBe(10);
    expect(req.session.shippingMessage).toBe('Domestic shipping');
    expect(req.session.totalCartAmount).toBe(90);
  });
});
