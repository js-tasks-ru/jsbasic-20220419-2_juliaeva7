function sumSalary(salaries) {
  let sum = 0;
  for (let key in salaries) {
    salary = salaries[key];
    if (!(salary === NaN || salary === Infinity || salary === -Infinity) && isFinite(salary)){
      sum = sum + +salary;
    }
  };
  return sum;
}
