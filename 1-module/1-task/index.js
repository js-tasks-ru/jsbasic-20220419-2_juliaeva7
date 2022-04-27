function factorial(n) {
  let numberOfCycles = n-1;
    for (let i=1; i<(numberOfCycles); i++) {
        n = n * (numberOfCycles+1-i);
    }
    return ( n === 0 ? 1 : n);
}
