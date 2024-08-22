import { API_URL } from '../utils/url';

class ApiManager {
  constructor(apiUrl = API_URL) {
    this.apiUrl = apiUrl;
  }

  async request(method, endpoint, data = null, params = {}) {
    const endpointURL = new URL(endpoint, this.apiUrl);
    Object.entries(params).forEach(([key, value]) => {
      endpointURL.searchParams.append(key, value);
    });

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic OTE2MjpmOWZhYzI5OS02YmZjLTRmM2YtYjc2Zi03ODI5ODhmNzRmYmU=', // Replace with a proper method for generating or retrieving the token
      },
      credentials: 'include',
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(endpointURL.toString(), options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return {
        data: {},
        errors: [error.message],
      };
    }
  }

  get(endpoint, params = {}) {
    return this.request('GET', endpoint, null, params);
  }

  post(endpoint, data = {}) {
    return this.request('POST', endpoint, data);
  }

  put(endpoint, data = {}) {
    return this.request('PUT', endpoint, data);
  }

  delete(endpoint) {
    return this.request('DELETE', endpoint);
  }

  patch(endpoint, data = {}) {
    return this.request('PATCH', endpoint, data);
  }
}

export const apiManager = new ApiManager();
