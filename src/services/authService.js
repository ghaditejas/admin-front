import { jws } from 'jsrsasign';
import config from '../config';
import storageService from './storageService';

/**
 * Service for managing Auth Flow for users
 */
class authService {
  /**
   * Authenticates a user
   * @param {string} mail
   * @param {string} password
   */
  static async authUser(mail, password) {
    const url = `${config.adminApi.baseUrl}/auth`;
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        mail,
        password,
      }),
    };

    try {
      const response = await fetch(url, options);
      const resData = await response.json();
      if (response.ok) {
        const data = {
          isUserLoggedIn: true,
          userToken: resData.data.accessToken,
          userTokenInfo: jws.JWS.parse(resData.data.accessToken).payloadObj,
        };
        storageService.set('authObject', JSON.stringify(data));
        return data;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets Auth info
   */
  static getUserInfo() {
    const data = storageService.get('authObject');
    if (data !== null && data !== undefined) {
      return JSON.parse(data);
    }
    return null;
  }
}

export default authService;
