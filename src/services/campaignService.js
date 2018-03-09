import config from '../config';
import authService from './authService';

/**
 * Service for managing campaigns
 */
class campaignService {
  /**
   * Get all campaigns of an application
   * @param {number} applicationId
   */
  static async getCampaigns(applicationId) {
    const url = `${config.adminApi.baseUrl}/campaign?applicationId=${applicationId}&limit=100&page=0`;
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
        const mockedData = resData.data.map(item => ({
          ...item,
          createdAt: '2018-02-02T13:36:41.001Z',
          sendings: Math.round(Math.random() * 100),
          filters: {
            platforms: ['android', 'ios', 'webpush'],
          },
          enabled: Math.round(Math.random()) === 1,
          scheduledAt: Math.round(Math.random()) === 1 ? '2018-02-02T13:36:41.001Z' : null,
        }));
        return mockedData;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Deletes a campaign
   * @param {number} id
   */
  static async deleteCampaign(id) {
    const url = `${config.adminApi.baseUrl}/campaign/${id}`;
    const authObject = authService.getUserInfo();

    const options = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authObject.userToken}`,
      }),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Updates a campaign
   * @param {number} id
   * @param {Object} data
   */
  static async updateCampaign(id, data) {
    const url = `${config.adminApi.baseUrl}/campaign/${id}`;
    const authObject = authService.getUserInfo();

    const options = {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authObject.userToken}`,
      }),
      body: data,
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

export default campaignService;
