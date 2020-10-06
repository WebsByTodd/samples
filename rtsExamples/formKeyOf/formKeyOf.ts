interface Address {
  firstName: string;
  lastName: string;
  primary: boolean;
}

function useForm<T>(initialValues: T) {
  const [form] = useState<T>(initialValues);

  function field<K extends keyof T>(key: K): T[K] { // <-- works perfectly. `field("firstName")` type inference is `string`
    // function field(key: keyof T): T[keyof T] { // <-- doesn't work. `field("firstName")` type inference is `string | boolean`
    return form[key];
  }

  return field;
}

const field = useForm<Address>(someInitialAddress);

const name = field("firstName");
const primary = field("primary");
