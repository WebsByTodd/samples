interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}

const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "present", // Error here. Excess property checking at work
};

const obj = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "present",
};
const s: Room = obj; // OK! Structural typing at work.
