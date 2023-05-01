export interface GoogleProfile {
  email: string
  username: string
  displayName: string
  photo: string
}

export interface CreateUserInput {
  createUserInput: GoogleProfile
}

export interface User {
  id: string
  email: string
  username: string
  displayName: string
  createdAt: Date
  photo: string

  /* @TODO: fix any */
  messages: any[]
}

export interface Tokens {
  access: string
  refresh: string
}

export interface LoginResponse {
  login: {
    user: User
    access: string
    refresh: string
  }
}
