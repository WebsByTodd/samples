interface Vector2D {
  x: number;
  y: number;
}

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

function do2DVectorStuff(vector: Vector2D): void {}

class C {
  foo: string;
  constructor(foo: string) {
    this.foo = foo;
  }
}

function main() {
  const vector2d: Vector2D = {
    x: 1,
    y: 2,
  };

  const namedVector = {
    x: 1,
    y: 2,
    name: "awesome vector",
  };

  /**
   * `namedVector`s __structure__ is compatible with `Vector2D` so
   * it works without issues. This is where the term "structural typing"
   * comes from.
   */
  do2DVectorStuff(namedVector);

  const vector3d: Vector3D = {
    x: 1,
    y: 2,
    z: 3,
  };

  /**
   * "sealed" or "precise" types cannot be expressed in TypeScript's type
   * system. We cannot assume the arguments of a method will have only the
   * properties we've declared and no others. TypeScript types are "open".
   * Also called "duck typing". If it walks like a duck and it quacks like
   * a duck, then it must be a duck.
   */
  do2DVectorStuff(vector3d); // Could possibly be a runtime error, but no ts error

  /**
   * `d` is assignable to `C` because it has a `foo` property and a constructor
   * (from `Object.prototype`) that can be called with one argument.
   */
  const c = new C("instance of C");
  const d: C = { foo: "object literal" }; // OK!
}

/**
 * The logic in this method assumes that `Vector3D` is "sealed" and cannot
 * have additional properties. This is why `v[axis]` is of the `any` type
 * and not a `number`.
 */
function calculateLength(v: Vector3D) {
  let length = 0;

  for (const axis of Object.keys(v)) {
    // logic is forgetting that `v` can have more properties
    // than only the properties on Vector3D.
    const coord = v[axis]; // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Vector3D'.

    length += Math.abs(coord);
  }
  return length;
}

type PostgresDB = any; // assume this is a type with lots of properties attached to it

interface Author {
  first: string;
  last: string;
}

/**
 * One approach. Trouble is testing. You have to mock the PostgresDB.
 */
function getAuthors(db: PostgresDB): Author[] {
  const rows: string[] = db.runQuery("SELECT FIRST, LAST FROM AUTHORS");
  return rows.map((r) => ({ first: r[0], last: r[1] }));
}

/**
 * Better approach. You can still pass this a `PostgresDB` in production.
 * In testing you can pass it a simpler object instead of mocking out
 * the entire PostgresDB.
 */
interface DB {
  runQuery: (sql: string) => any[];
}
function getAuthors2(db: DB): Author[] {
  const rows: string[] = db.runQuery("SELECT FIRST, LAST FROM AUTHORS");
  return rows.map((r) => ({ first: r[0], last: r[1] }));
}

test("getAuthors", () => {
  const authors = getAuthors({
    runQuery(sql: string) {
      return [
        ["Toni", "Morrison"],
        ["Maya", "Angelou"],
      ];
    },
  });

  expect(authors).toEqual([
    { first: "Toni", last: "Morrison" },
    { first: "Maya", last: "Angelou" },
  ]);
});
