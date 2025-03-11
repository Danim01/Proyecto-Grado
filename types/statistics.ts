export interface StatisticsResponse {
  estadisticas: Statistics;
}

export interface Statistics {
  frecuencia_por_fecha:     FrequencyByDate;
  frecuencia_por_ubicacion: FrequencyByLocation[];
  conteo_enfermedades:      DiseaseCount;
}

export interface DiseaseCount {
  saludable: number;
  roya: number;
  mildiu_polvoriento: number;
}

export interface FrequencyByDate {
  enfermedad:   string;
  fecha_inicio: Date;
  fecha_fin:    Date;
}

export interface FrequencyByLocation {
  ubicacion:  string;
  enfermedad: string;
  cantidad:   number;
  latitud:    number,
  longitud:   number
}
