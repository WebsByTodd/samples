type Dummy = any;

interface Str {
  id: string;
}
interface Num {
  id: number;
}

function overloaded(args: Str): SomeGeneric<string, Dummy>;
function overloaded(args: Num): SomeGeneric<number, Dummy>;
function overloaded(
  args: Str | Num
): SomeGeneric<string, Dummy> | SomeGeneric<number, Dummy> {
  if (typeof args.id === "string") {
    return (someStrArg: string) => {
      return strProm(someStrArg);
    };
  }
  return (someNumArg: string) => {
    return numProm(someNumArg);
  };
}

function main(arg: string | number) {
  const responseNum = overloaded({ id: 123 });
  const responseStr = overloaded({ id: "123" });
  const resp = overloaded({ id: arg });
}

type SomeGeneric<T, U> = (someStr: string, additional?: U) => Promise<T>;

function strProm(someStr: string): Promise<string> {
  return new Promise((res) => res("123"));
}
function numProm(someStr: string): Promise<number> {
  return new Promise((res) => res(123));
}
