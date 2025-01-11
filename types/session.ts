export interface Session {
  access: string | null
  refresh: string | null
}

export interface User {
  email: string
  id: string
  name: string
}