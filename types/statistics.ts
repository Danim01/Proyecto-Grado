export interface StatisticsResponse {
  estadisticas: Statistics;
}

export interface Statistics {
  frecuencia_por_fecha:     FrequencyByLocation;
  frecuencia_por_ubicacion: FrequencyByDate[];
  conteo_enfermedades:      DiseaseCount;
}

export interface DiseaseCount {
  saludable: number;
  
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
}
