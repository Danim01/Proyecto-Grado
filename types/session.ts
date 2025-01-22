export interface Session {
  access: string
  refresh: string
}

export interface User {
  email: string
  id: string
  name: string
}

export interface CredentialsRegister {
  name: string
  email: string
  password: string
}