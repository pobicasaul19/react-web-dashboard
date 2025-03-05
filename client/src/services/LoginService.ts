import { httpClient } from '../api/apiClient';
import type { loginData } from '../models/Authentication';
import { AUTH_ENDPOINTS } from '../constant/apiConstant';


class LoginService {
  public async validateLogin(payload: loginData): Promise<unknown> {
    const response = await httpClient.post<unknown, loginData>(AUTH_ENDPOINTS.POST_LOGIN, payload);
    return response.data;
    }
}
export default new LoginService();