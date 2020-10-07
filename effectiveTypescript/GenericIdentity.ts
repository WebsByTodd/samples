interface Name {
  first: string;
  last: string;
}

type DancingDuo<T extends Name> = [T, T];

const dancingDuo = <T extends Name>(x: DancingDuo<T>) => x;

dancingDuo([{ first: "Fred " }]);
