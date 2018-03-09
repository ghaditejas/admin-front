/**
 * Storage service
 */
class storageService {
  /**
   * Gets a value by its key
   * @param {string} key
   */
  static get(key) {
    return window.localStorage.getItem(key);
  }

  /**
   * Sets a key with a value
   * @param {string} key
   * @param {*} value
   */
  static set(key, value) {
    window.localStorage.setItem(key, value);
  }
}

export default storageService;
