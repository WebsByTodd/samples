import { React } from "react";

type MyProps = {};
type MyState = {
  key1: string;
  key2?: number;
};

class MyComponent extends React.Component<MyProps, MyState> {
  /**
   * This approach to defining state will ignore the `MyState` type.
   * TypeScript will infer the type of state based on the initial value here
   */
  state = {
    key1: "abc",
    key2: undefined
  };

  /**
   * This is the proper approach
   */
  constructor(props: MyProps) {
    super(props);

    this.state = {
      key1: "abc",
      key2: undefined
    };
  }

  render() {
    const { key1, key2 } = this.state;

    return null;
  }
}
