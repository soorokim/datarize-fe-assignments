import Axios, { AxiosInstance } from 'axios';
import { RequestConfig } from './types';

export interface IApiClient {
  get<TResponse>(path: string, config?: RequestConfig): Promise<TResponse>;
}

export default class ApiClient implements IApiClient {
  private client: AxiosInstance;

  protected createAxiosClient(baseURL: string): AxiosInstance {
    return Axios.create({
      baseURL,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10 * 1000,
    });
  }

  constructor(baseURL: string) {
    this.client = this.createAxiosClient(baseURL);
  }

  async get<TResponse>(path: string, config?: RequestConfig): Promise<TResponse> {
    const response = await this.client.get<TResponse>(path, config);

    return response.data;
  }
}

export const apiClient = new ApiClient('http://localhost:4000');
