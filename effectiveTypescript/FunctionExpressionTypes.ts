/**
 * One approach.
 */
const subtract = (a: number, b: number): number => {
  return a - b;
};

const add = (a: number, b: number): number => {
  return a + b;
};

/**
 * A less verbose approach.
 */
type BinaryFn = (a: number, b: number) => number;

const subtract2: BinaryFn = (a, b) => {
  return a - b;
};

const add2: BinaryFn = (a, b) => {
  return a + b;
};

async function getQuote() {
  const response = await fetch("/quote?by=Mark+Twain");
  const quote = await response.json(); // If request for `/quote` 404s,
  // this will return a rejected Promise
  // and obscure the real error
  return quote;
}

const checkedFetch: typeof fetch = async (input, init) => {
  // types of `input` and `init` are inferred by `typeof fetch`
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error("Request failed: " + response.status);
  }
  return response; // return type also must match `typeof fetch`
};
