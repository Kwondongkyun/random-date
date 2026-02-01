export interface SubwayLine {
  id: string;
  name: string;
  color: string;
  colorCode: {
    primary: string;
    secondary: string;
    text: string;
  };
}

export interface Station {
  id: string;
  name: string;
  lineId: string;
  latitude: number;
  longitude: number;
}

export interface SelectedRoute {
  line: SubwayLine;
  station: Station;
}
