const request = require('supertest');
const moment = require('moment');
const app = require('../../app'); // Replace with the path to your Express app
const db = require('../../lib/db'); // Replace with the path to your database module
const { validateJson } = require('../../lib/schema');
const { restrict, checkAccess } = require('../../lib/auth');


jest.mock('../../lib/schema', () => ({
  validateJson: jest.fn()
}));

jest.mock('../../lib/auth', () => ({
  restrict: jest.fn((req, res, next) => next()),
  checkAccess: jest.fn((req, res, next) => next())
}));

jest.mock('../../lib/db', () => {
  const originalModule = jest.requireActual('../../lib/db');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    getDbUri: jest.fn().mockReturnValue('mongodb://localhost:27017/expresscart'),
    initDb: jest.fn(),
    getDb: jest.fn().mockReturnValue({
      countDocuments: jest.fn().mockReturnValue(0)
    })
  };
});

jest.mock('../../lib/common', () => {
  const originalModule = jest.requireActual('../../lib/common');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    getId: jest.fn()
  };
});

describe('POST /admin/settings/discount/update', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Update Discount successful return 200', async () => {
    const reqBody = {
      discountId: 'discountId',
      code: 'DISCOUNT123',
      type: 'percentage',
      value: '10',
      start: '23/06/2023 21:37',
      end: '30/06/2023 15:37'
    };

    validateJson.mockImplementation(() => ({ result: true }));

    Date.now = jest.fn(() => new Date("2023-06-20T12:00:00.000Z"));

    app.db = {
      discounts: {
        countDocuments: jest.fn().mockImplementation((query) => {
          return 0;
        }),
        updateOne: jest.fn().mockResolvedValue()
      }
    };

    const response = await request(app)
      .post('/admin/settings/discount/update')
      .send(reqBody);


    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Successfully saved',
      discount: {
        code: 'DISCOUNT123',
        type: 'percentage',
        value: 10,
        start: moment(reqBody.start, 'DD/MM/YYYY HH:mm').toDate().toISOString(),
        end:  moment(reqBody.end, 'DD/MM/YYYY HH:mm').toDate().toISOString()
      }
    });
    expect(app.db.discounts.countDocuments).toBeCalledTimes(1);
    expect(app.db.discounts.updateOne).toBeCalledTimes(1);
  });

  it('Update Discount fails on valid schema return 400', async () => {
    const reqBody = {
      discountId: 'discountId',
      code: 'DISCOUNT123',
      type: 'percentage',
      value: '10',
      start: '23/06/2023 21:37',
      end: '30/06/2023 15:37'
    };
    validateJson.mockImplementation(() => ({ result: false }));

    Date.now = jest.fn(() => new Date("2023-06-20T12:00:00.000Z"));

    app.db = {
      discounts: {
        countDocuments: jest.fn().mockImplementation((query) => {
          return 0;
        }),
        updateOne: jest.fn().mockResolvedValue()
      }
    };

    const response = await request(app)
      .post('/admin/settings/discount/update')
      .send(reqBody);


    expect(response.status).toBe(400);
    expect(app.db.discounts.countDocuments).toBeCalledTimes(0);
    expect(app.db.discounts.updateOne).toBeCalledTimes(0);

  });

  it('Update Discount fails on start date is before current date return 400', async () => {

    const reqBody = {
      discountId: 'discountId',
      code: 'DISCOUNT123',
      type: 'percentage',
      value: '10',
      start: '10/06/2023 21:37',
      end: '30/06/2023 15:37'
    };

    validateJson.mockImplementation(() => ({ result: true }));

    Date.now = jest.fn(() => new Date("2023-06-20T12:00:00.000Z"));

    app.db = {
      discounts: {
        countDocuments: jest.fn().mockImplementation((query) => {
          return 0;
        }),
        updateOne: jest.fn().mockResolvedValue()
      }
    };

    const response = await request(app)
      .post('/admin/settings/discount/update')
      .send(reqBody);


    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Discount start date needs to be after today'
    });
    expect(app.db.discounts.countDocuments).toBeCalledTimes(0);
    expect(app.db.discounts.updateOne).toBeCalledTimes(0);

  });

  it('Update Discount fails on end date is before start current date return 400', async () => {

    const reqBody = {
      discountId: 'discountId',
      code: 'DISCOUNT123',
      type: 'percentage',
      value: '10',
      start: '23/06/2023 21:37',
      end: '22/06/2023 15:37'
    };

    validateJson.mockImplementation(() => ({ result: true }));

    Date.now = jest.fn(() => new Date("2023-06-20T12:00:00.000Z"));

    app.db = {
      discounts: {
        countDocuments: jest.fn().mockImplementation((query) => {
          return 0;
        }),
        updateOne: jest.fn().mockResolvedValue()
      }
    };

    const response = await request(app)
      .post('/admin/settings/discount/update')
      .send(reqBody);


    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Discount end date needs to be after start date'
    });
    expect(app.db.discounts.countDocuments).toBeCalledTimes(0);
    expect(app.db.discounts.updateOne).toBeCalledTimes(0);

  });


  it('Update Discount fails on start date is before current date return 400', async () => {

    // Mock the necessary functions and data
    const reqBody = {
      discountId: 'discountId',
      code: 'DISCOUNT123',
      type: 'percentage',
      value: '10',
      start: '10/06/2023 21:37',
      end: '30/06/2023 15:37'
    };

    validateJson.mockImplementation(() => ({ result: true }));

    Date.now = jest.fn(() => new Date("2023-06-20T12:00:00.000Z"));

    app.db = {
      discounts: {
        countDocuments: jest.fn().mockImplementation((query) => {
          return 0;
        }),
        updateOne: jest.fn().mockResolvedValue()
      }
    };

    const response = await request(app)
      .post('/admin/settings/discount/update')
      .send(reqBody);


    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Discount start date needs to be after today'
    });
    expect(app.db.discounts.countDocuments).toBeCalledTimes(0);
    expect(app.db.discounts.updateOne).toBeCalledTimes(0);

  });

  it('Update Discount fails discount code already exists return 400', async () => {

    const reqBody = {
      discountId: 'discountId',
      code: 'DISCOUNT123',
      type: 'percentage',
      value: '10',
      start: '23/06/2023 21:37',
      end: '28/06/2023 15:37'
    };

    validateJson.mockImplementation(() => ({ result: true }));

    Date.now = jest.fn(() => new Date("2023-06-20T12:00:00.000Z"));

    app.db = {
      discounts: {
        countDocuments: jest.fn().mockImplementation((query) => {
          return 1;
        }),
        updateOne: jest.fn().mockResolvedValue()
      }
    };

    const response = await request(app)
      .post('/admin/settings/discount/update')
      .send(reqBody);


    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Discount code already exists'
    });
    expect(app.db.discounts.countDocuments).toBeCalledTimes(1);
    expect(app.db.discounts.updateOne).toBeCalledTimes(0);

  });

});