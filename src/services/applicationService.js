import config from '../config';
import authService from './authService';

/**
 * Service for managing applications
 */
class applicationService {
  /**
   * Get all applications list of an application
   * @param {number} id
   */
  static async getapplication(id) {
    const url = `${config.adminApi.baseUrl}/application?accountId=${id}&limit=100&page=0`;
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
      console.log('here : //' + url + '//' + "Bearer " +  authObject.userToken);
      const resData = await response.json();
      console.log('here : //' + JSON.stringify(resData));
      if (response.ok) {
        return resData.data;

       /* const mockedData = resData.data.map((item) => {

           this.getapplicationDetail(item.id)
        })
        console.log('mockedData:' + JSON.stringify(mockedData));
          return mockedData;   */  
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get application detail
   * @param {number} applicationId
   */

  static async getapplicationDetail(applicationId) {
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
      console.log('here : //' + url + '//' + "Bearer " +  authObject.userToken);
      const resData =  await response.json();
      console.log('here : //' + JSON.stringify(resData));
      if (response.ok) {
        return resData.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Add application 
   * @param {number} applicationId
   */

  static async createApplication(applicationId,applicationName,androidCode,iosCode) {
    const url = `${config.adminApi.baseUrl}/application/${applicationId}/externalApps`;
    const authObject = authService.getUserInfo();
    
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authObject.userToken}`,
      }),
      body: JSON.stringify({
        "externalApps": [
          {
            "name": applicationName,
            "androidCode": androidCode,
            "iosCode": iosCode
          }
        ]
      })
    };

    try {
      const response = await fetch(url, options);    
      const resData =  await response.json();
      console.log('here : //' + JSON.stringify(resData));
      if (response.ok) {
        return resData;
      }
      return null;
    } catch (error) {
      return null;
    }
  }


  /**
   * Deletes a application
   * @param {number} id
   */
  static async deleteApplication(id) {
    const url = `${config.adminApi.baseUrl}/application/${id}`;
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
  /*static async updateCampaign(id, data) {
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
  }*/
}

export default applicationService;
