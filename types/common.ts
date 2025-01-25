export interface JWTPayload {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: string;
}

export interface PaginationResponse<T> {
  count:    number;
  next:     string | null;
  previous: string | null;
  results:  T[];
}

