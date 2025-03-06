export interface Credentials {
  email: string
  password: string
}
export interface CredentialsRegister {
  name: string
  email: string
  password: string
}
export interface CredentialsNewPassword {
  new_password: string
  confirm_password: string
  token: string
  uidb64: string
}