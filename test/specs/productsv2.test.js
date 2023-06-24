// Importa las dependencias necesarias y configúralas

// Define el mock para req, res, next y otras dependencias
const mockReq = {
    app: {
      db: jest.fn().mockResolvedValue([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]),
    },
    params: {
      search: 'example'
    },
    apiAuthenticated: false,
    session: {/* mock de session */},
    handlebars: {
      helpers: {/* mock de helpers */}
    }
  };
  
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    render: jest.fn()
  };
  
  const mockNext = jest.fn();
  
  // Define el test
  describe('GET /admin/products/filter/:search', () => {
    it('should return filtered products', async () => {
      // Importa tu archivo de rutas y crea una instancia del router
      const router = require('../../routes/product');
      const express = require('express');
      const app = express();
      app.use(router);
  
      // Realiza la llamada a la ruta utilizando los mocks de req, res, next y otras dependencias
      await router.handle(res, next);
  
      // Verifica el comportamiento esperado
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]);
      expect(res.render).toHaveBeenCalledWith({ _id: { $in: [1,2] } });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
  