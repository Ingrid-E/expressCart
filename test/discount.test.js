// const axios = require('axios');
const discountVoucher = require('../lib/modules/discount-voucher')

describe('test discount', () => {
  test('descuento de monto', () => {
    const discount = { type: 'amount', value: 200 }
    const req = { session: { discountCode: true, totalCartDiscount: 0, totalCartNetAmount: 2000 } }
    discountVoucher.calculateDiscount(discount, req)
    expect(req.session.totalCartDiscount).toBe(200);
  })

  test('descuento de porcentaje', () => {
    const discount = { type: 'percent', value: 10 }
    const req = { session: { discountCode: true, totalCartDiscount: 0, totalCartNetAmount: 2000 } }
    discountVoucher.calculateDiscount(discount, req)
    expect(req.session.totalCartDiscount).toBe(200);
  })
})
