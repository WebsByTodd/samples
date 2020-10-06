const colors = {
  color: "red",
  printColor() {
    console.log(this.color);
  }
};

colors.printColor(); // Works great

const printColor2 = colors.printColor;

printColor2(); // cannot read property "color" of undefined

// this is what is to the left of the current method
