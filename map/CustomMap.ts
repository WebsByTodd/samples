export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId));
  }

  addMarker(something: Mappable) {
    //do stuff
  }
}

class User implements Mappable {}

class Company implements Mappable {}

const user = new User();
const customMap = new CustomMap("map");

customMap.addMarker(user);
