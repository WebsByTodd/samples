interface Condition {
  booleanCondition?: boolean;
}

function doSomething(condition: Condition, responses: string[]) {
  if (condition.booleanCondition !== undefined) {
    function doIt(booleanCondition: boolean) {
      responses.some(function (r) {
        booleanCondition;
      });
    }
    doIt(condition.booleanCondition);
  }
}

Array.prototype.some = function <T>(projectionFunction: (value: T) => boolean) {
  this.forEach(function (itemInArray: T) {
    if (projectionFunction(itemInArray)) {
      // when projectionFunction executes it has no idea that you
      // null-checked condition.booleanCondition before Array.prototype.some
      // was called
      return true;
    }
  });
  return false;
};
