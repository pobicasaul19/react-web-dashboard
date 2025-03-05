export interface AuthUser {
  userInfo: User | null;
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
  userName: string;
}