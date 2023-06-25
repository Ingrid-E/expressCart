// Implementación del algoritmo de ordenamiento
const order_quicksort = (array) => {

    if (array.length == 0) {
        return [];
    }
    if (array.length == 1) {
        return array;
    }

    let pos = Math.floor(array.length / 2);//get the middle position of the array
    let piv = array[pos];//choose the element in the middle of the array
    array.splice(pos, 1); // delete pivote from the list

    return [...order_quicksort(array.filter(x => x < piv)), piv, ...order_quicksort(array.filter(y => y > piv))];
}

const binarySearch = (arr, target) => {
    let low = 0;
    let high = arr.length - 1;
  
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
  
      if (arr[mid] === target) {
        return mid; // Element find, returns the index
      } else if (arr[mid] < target) {
        low = mid + 1; // The element is on the right side of the subarray
      } else {
        high = mid - 1; // The element is on the left side of the subarray
      }
    }
  
    return -1; // Element does not exist in the array
  }
  
  const array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const target = 11;
  
  const index = binarySearch(array, target);
  
  if (index !== -1) {
    console.log(`The element ${target} is in the index ${index}.`);
  } else {
    console.log(`The element ${target} does not exist in the array`);
  }
  


module.exports = {order_quicksort, binarySearch};

