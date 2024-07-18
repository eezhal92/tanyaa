export enum UserRole {
  Admin = 'admin',
  Tenant = 'tenant'
}

export interface User {
  id: number,
  name: string,
  email: string,
  role: UserRole
}

export interface Question {
  id: string,
  votes: number,
  content: string,
  user: User | null
  createdAt: string,
}
