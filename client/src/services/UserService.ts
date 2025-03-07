import { authorizedHttpClient } from '../api/apiClient';
import type { User, UserPayload } from '../models/User';
import { USER_ENDPOINTS } from '../constant/apiConstant';

class UserService {
  public async getUsers(): Promise<User[]> {
    const response = await authorizedHttpClient.get<User[]>(USER_ENDPOINTS.GET_ALL);
    return response.data as User[];
  }

  public async addUser(payload: UserPayload): Promise<User> {
    const response = await authorizedHttpClient.post<User, UserPayload>(
      `${USER_ENDPOINTS.POST}/create`,
      payload
    );
    return response.data as User;
  }

  public async updateUser(payload: UserPayload, uuid: string): Promise<User> {
    const response = await authorizedHttpClient.put<User, UserPayload>(
      USER_ENDPOINTS.UPDATE(uuid),
      payload
    );

    return response.data as User;
  }
}

export default new UserService();
