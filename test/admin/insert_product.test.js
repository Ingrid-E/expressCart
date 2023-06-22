const request = require('supertest');
const moment = require('moment');
const app = require('../../app'); // Replace with the path to your Express app
const db = require('../../lib/db'); // Replace with the path to your database module
const { validateJson } = require('../../lib/schema');
const { restrict, checkAccess } = require('../../lib/auth');
const { indexProducts } = require('../../lib/indexing');

jest.mock('../../lib/indexing', () => ({
  indexProducts: jest.fn().mockResolvedValue()
}));

jest.mock('../../lib/schema', () => ({
  validateJson: jest.fn()
}));


jest.mock('../../lib/auth', () => ({
  restrict: jest.fn((req, res, next) => next()),
  checkAccess: jest.fn((req, res, next) => next())
}));

jest.mock('../../lib/db', () => {
  const originalModule = jest.requireActual('../../lib/db');

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

  it('Insert Product successful return 200', async () => {
    const reqBody = {
      productPermalink: 'product-permalink',
      productTitle: 'Product Title',
      productPrice: 10.99,
      productDescription: 'Product Description',
      productGtin: '1234567890',
      productBrand: 'Product Brand',
      productPublished: true,
      productTags: ['tag1', 'tag2'],
      productComment: true,
      productStock: 50,
      productStockDisable: false,
      productSubscription: 'Product Subscription'
    };

    validateJson.mockImplementation(() => ({ result: true }));

    app.db = {
      products: {
        countDocuments: jest.fn().mockImplementation((query) => {
          return 0;
        }),
        insertOne: jest.fn().mockResolvedValue({
          insertedId: 1
        })
      }
    };

    app.productsIndex = {
      search: jest.fn(),
      add: jest.fn(),
    }

    const response = await request(app)
      .post('/admin/product/insert')
      .send(reqBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'New product successfully created',
      productId: 1
    });
    expect(app.db.products.countDocuments).toBeCalledTimes(1);
    expect(app.db.products.insertOne).toBeCalledTimes(1);
  });

  it('Insert Product fails when schema is invalid return 400', async () => {
    const reqBody = {
      productPermalink: 'product-permalink',
      productTitle: 'Product Title',
      productPrice: 10.99,
      productDescription: 'Product Description',
      productGtin: '1234567890',
      productBrand: 'Product Brand',
      productPublished: true,
      productTags: ['tag1', 'tag2'],
      productComment: true,
      productStock: 50,
      productStockDisable: false,
      productSubscription: 'Product Subscription'
    };

    validateJson.mockImplementation(() => ({ result: false }));

    app.db = {
      products: {
        countDocuments: jest.fn().mockImplementation((query) => {
          return 0;
        }),
        insertOne: jest.fn().mockResolvedValue({
          insertedId: 1
        })
      }
    };

    app.productsIndex = {
      search: jest.fn(),
      add: jest.fn(),
    }

    const response = await request(app)
      .post('/admin/product/insert')
      .send(reqBody);

    expect(response.status).toBe(400);
    expect(app.db.products.countDocuments).toBeCalledTimes(0);
    expect(app.db.products.insertOne).toBeCalledTimes(0);
  });


  it('Insert Product fails when perma link already exists return 400', async () => {
    const reqBody = {
      productPermalink: 'product-permalink',
      productTitle: 'Product Title',
      productPrice: 10.99,
      productDescription: 'Product Description',
      productGtin: '1234567890',
      productBrand: 'Product Brand',
      productPublished: true,
      productTags: ['tag1', 'tag2'],
      productComment: true,
      productStock: 50,
      productStockDisable: false,
      productSubscription: 'Product Subscription'
    };

    validateJson.mockImplementation(() => ({ result: true }));

    app.db = {
      products: {
        countDocuments: jest.fn().mockImplementation((query) => {
          return 1;
        }),
        insertOne: jest.fn().mockResolvedValue({
          insertedId: 1
        })
      }
    };

    app.productsIndex = {
      search: jest.fn(),
      add: jest.fn(),
    }

    const response = await request(app)
      .post('/admin/product/insert')
      .send(reqBody);


    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Permalink already exists. Pick a new one.' });
    expect(app.db.products.countDocuments).toBeCalledTimes(1);
    expect(app.db.products.insertOne).toBeCalledTimes(0);

  });


});