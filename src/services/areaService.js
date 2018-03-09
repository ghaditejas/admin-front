import config from '../config';
import storageService from './storageService';

/**
 * Service for managing areas
 */
class areaService {
  /**
   * Gets an application areas
   */
  static async getAreas(applicationId) {
    const auth = JSON.parse(storageService.get('authObject'));
    // TODO: read application id from globals
    const url = `${config.adminApi.baseUrl}/application/${applicationId}/areas`;
    const options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.userToken}`,
      }),
    };

    try {
      const response = await fetch(url, options);
      const resData = await response.json();
      if (response.ok) {
        return resData.data;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

export default areaService;
