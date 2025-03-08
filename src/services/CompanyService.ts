import { authorizedHttpClient } from '../api/apiClient';
import type { Company, CompanyPayload } from '../models/Company';
import { COMPANY_ENDPOINTS } from '../constant/apiConstant';

class UserService {
  public async getCompanies(): Promise<Company[]> {
    const response = await authorizedHttpClient.get<Company[]>(COMPANY_ENDPOINTS.GET_ALL);
    return response as Company[];
  }

  public async addCompany(payload: CompanyPayload): Promise<Company> {
    const response = await authorizedHttpClient.post<Company, CompanyPayload>(
      `${COMPANY_ENDPOINTS.POST}/create`,
      payload
    );
    return response.data as Company;
  }

  public async updateCompany(payload: CompanyPayload, uuid: string): Promise<Company> {
    const response = await authorizedHttpClient.put<Company, CompanyPayload>(
      COMPANY_ENDPOINTS.UPDATE(uuid),
      payload
    );

    return response.data as Company;
  }
}

export default new UserService();
