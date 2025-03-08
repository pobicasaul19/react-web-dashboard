import { httpClient } from '../api/apiClient';
import type { loginData } from '../models/Authentication';
import { AUTH_ENDPOINTS } from '../constant/apiConstant';
import { AuthUser } from '../models/User';


class LoginService {
  public async validateLogin(payload: loginData): Promise<AuthUser> {
    const response = await httpClient.post<AuthUser, loginData>(AUTH_ENDPOINTS.POST_LOGIN, payload);
    return response.data as AuthUser;
  }
}
export default new LoginService();