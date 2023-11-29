export interface User {
  id: number,
  name: string,
  email: string,
}

export interface Question {
  id: string,
  votes: number,
  content: string,
  user: User | null
  createdAt: string,
}
