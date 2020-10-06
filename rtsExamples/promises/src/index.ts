import { fetchData } from "./api";

const middleFunction = () => {
  return fetchData()
    .then(firstHandler)
    .catch(firstErrorHandler)
    .finally(finallyHandler);
};

const firstHandler = () => {
  console.log("First handler");
  throw "first error";
};

const firstErrorHandler = (err: any) => {
  console.log("First error handler", err);
};

const finallyHandler = () => {
  console.log("finally");
};

const nextThen = () => {
  console.log("next handler");
  throw "here";
};

const nextError = (err: any) => {
  console.log("next error", err);
};

middleFunction()
  .then(nextThen)
  .catch(nextError);
