export interface AnalysisResult {
  mensaje:  string;
  busqueda: Lookup;
}

export interface Lookup {
  id:         string;
  enfermedad: Illness;
  ubicacion:  Location;
  imagen:     Image;
}

export interface Illness {
  id:           number;
  nombre:       string;
  tratamientos: Treatment[];
}

export interface Treatment {
  descripcion: string;
  fuente:      string;
}

export interface Image {
  id:  number;
  url: string;
}

export interface Location {
  id:       number;
  nombre:   string;
  latitud:  string;
  longitud: string;
}
