export interface AuthUser {
  user: User | null;
  token: string | null;
}
export interface UserPayload {
  firstName: string;
  lastName: string;
  type: string;
  status: string;
}
export interface User extends UserPayload {
  uuid: string;
  id: number;
  email: string;
  userName: string;
}