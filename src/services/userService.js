import config from '../config';
import authService from './authService';

/**
 * Service for managing users endpoints
 */
class userService {
  /**
   * Get a user by id
   * @param  {[type]}  userId [description]
   * @return {Promise}        [description]
   */
  static async getUser(userId) {
    const url = `${config.adminApi.baseUrl}/user/${userId}`;
    const authObjet = authService.getUserInfo();
    const options = {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `Bearer ${authObjet.userToken}`,
      }),
    };
    console.log(authObjet.userToken);

    try {
      const response = await fetch(url, options);
      const resData = await response.json();
      if (response.ok) {
        const data = {
          id: resData.data.id,
          createdAt: resData.data.createdAt,
          updatedAt: resData.data.updatedAt,
          accountId: resData.data.accountId,
          userType: resData.data.userType,
          email: resData.data.email,
          secretKey: resData.data.secretKey,
          whitelist: resData.data.whitelist,
          twoFactorAuthEnabled: resData.data.twoFactorAuthEnabled,
          twoFactorAuthCode: resData.data.twoFactorAuthCode,
          roleType: resData.data.roleType,
          name: resData.data.name,
          description: resData.data.description,
          enabled: resData.data.enabled,
          permissions: resData.data.permissions,
          accountName: 'indigitall',
          lang: 'en',
        };
        return data;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  static async updateUser(user, currentPassword, newPassword) {
    const url = `${config.adminApi.baseUrl}/user/${user.userId}`;
    const authObjet = authService.getUserInfo();
    const options = {
      method: 'PUT',
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `Bearer ${authObjet.userToken}`,
      }),
      body: JSON.stringify({
        currentPassword,
        newPassword,
        name: user.name,
        lang: user.lang,
      }),
    };

    try {
      const response = await fetch(url, options);
      const resData = await response.json();
      if (response.ok) {
        const data = {
          id: resData.data.id,
          createdAt: resData.data.createdAt,
          updatedAt: resData.data.updatedAt,
          accountId: resData.data.accountId,
          userType: resData.data.userType,
          email: resData.data.email,
          secretKey: resData.data.secretKey,
          whitelist: resData.data.whitelist,
          twoFactorAuthEnabled: resData.data.twoFactorAuthEnabled,
          twoFactorAuthCode: resData.data.twoFactorAuthCode,
          roleType: resData.data.roleType,
          name: resData.data.name,
          description: resData.data.description,
          enabled: resData.data.enabled,
          permissions: resData.data.permissions,
          accountName: 'indigitall',
          lang: 'en',
        };
        return data;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

export default userService;
