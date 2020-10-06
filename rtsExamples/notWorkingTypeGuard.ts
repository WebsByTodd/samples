interface UnsavedTrip {
  stops: string[]
  startTime: string | null;
}

interface Trip extends UnsavedTrip {
  id: number;
};

function isTrip(trip: Trip | UnsavedTrip): trip is Trip {
  return (trip as Trip).id !== undefined;
}

const hasStarted = (trip: Trip | UnsavedTrip): boolean => {
  return isTrip(trip) && !!trip.startTime;
}

const myPossiblySavedTripFunction = (myTrip: Trip | UnsavedTrip) => {
  hasStarted(myTrip) && myTripFunction(myTrip); // <--- fix error here
}

const myTripFunction = (trip: Trip): void => {};

