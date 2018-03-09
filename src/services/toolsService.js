import config from '../config';
import authService from './authService';

class toolsService {
  static async getExtApps(applicationId) {
    const url = `${config.adminApi.baseUrl}/application/${applicationId}/externalApps`;
    const authObject = authService.getUserInfo();

    const options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authObject.userToken}`,
      }),
    };

    try {
      const response = await fetch(url, options);
      const resData = await response.json();
      if (response.ok) {
        return resData.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
  
  static async getTopics(applicationId) {
    const url = `${config.adminApi.baseUrl}/application/${applicationId}/topics`;
    const authObject = authService.getUserInfo();

    const options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authObject.userToken}`,
      }),
    };

    try {
      const response = await fetch(url, options);
      const resData = await response.json();
      if (response.ok) {
        return resData.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

}

export default toolsService;