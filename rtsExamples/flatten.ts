function flatten<T>(array: any[]): T[] {
  return array.reduce((flat, toFlatten) => {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    );
  }, [] as T[]) as T[];
}
