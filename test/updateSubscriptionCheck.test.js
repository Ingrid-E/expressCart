const { updateSubscriptionCheck } = require('../lib/cart.js');

describe('test update subscription', () => {
  test('test update subscription empty cart', () => {
    const req = { session: { cart: [] }, cartSubscription: false };
    updateSubscriptionCheck(req);
    expect(req.session.cartSubscription).toBe(null);
  });

  test('test update subscription cart with subscription', () => {
    const cartProducts = [
      { productName: 'llavero gato' },
      { productName: 'llavero perro' },
      { productName: 'llavero disco', productSubscription: true }
    ];
    const req = { session: { cart: cartProducts }, cartSubscription: false };
    updateSubscriptionCheck(req);
    expect(req.session.cartSubscription).toBe(true);
  });

  test('test update subscription cart with subscription', () => {
    const cartProducts = [
      { productName: 'llavero gato' },
      { productName: 'llavero perro' },
      { productName: 'llavero disco' }
    ];
    const req = { session: { cart: cartProducts }, cartSubscription: false };
    updateSubscriptionCheck(req);
    expect(req.session.cartSubscription).toBe(null);
  });
});
