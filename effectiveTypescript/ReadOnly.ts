function arraySum(arr: readonly number[]): number {
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue);
}

// Friendly functions mark readonly arrays as readonly so we don't
// unexpectedly modify the caller's array.
function arrayActions(arr: readonly number[]): void {
  arr.pop();
}
