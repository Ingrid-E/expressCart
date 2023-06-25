const { binarySearch } = require('./algoritms');

// Pruebas para búsqueda binaria
describe('Binary Search', () => {
    const array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  
    it('Look for existing element', () => {
      expect(binarySearch(array, 11)).toBe(5);
    });
  
    it('Look for inexisting element', () => {
      expect(binarySearch(array, 6)).toBe(-1);
    });
  });