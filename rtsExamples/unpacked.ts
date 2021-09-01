type Payment = {
  id: number;
  description: string;
  date: string;
};

type GraphQLGeneratedPayments = {
  payments: { id: string; description: string }[];
};

type Unpacked<T> = T extends (infer U)[] ? U : T;
type PartialPayment = Unpacked<GraphQLGeneratedPayments["payments"]>;

function main(pp: PartialPayment) {
  pp.id;
  pp.description;
  pp.date; //error
}
