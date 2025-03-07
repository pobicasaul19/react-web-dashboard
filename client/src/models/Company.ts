export interface CompanyPayload {
  logo: string;
  name: string;
  status: string;
}
export interface Company extends CompanyPayload {
  uuid: number;
  id: number;
}
