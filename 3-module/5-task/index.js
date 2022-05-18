function getMinMax(str) {
  let arr = str.split(' ');

  let numbers = arr.filter((num) => {
      return typeof +num === 'number' && !isNaN(+num);
    });

  return {min: Math.min(...numbers), max: Math.max(...numbers), };
}
