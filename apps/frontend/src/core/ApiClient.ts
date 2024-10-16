import Axios, { AxiosInstance } from 'axios';
import { RequestConfig } from './types';

export interface IApiClient {
  get<TResponse>(path: string, config?: RequestConfig): Promise<TResponse>;
}

type ApiConfiguration = {};

export default class ApiClient implements IApiClient {
  private client: AxiosInstance;

  protected createAxiosClient(baseURL: string, apiConfiguration: ApiConfiguration): AxiosInstance {
    return Axios.create({
      baseURL,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
        ...(apiConfiguration && {}),
      },
      timeout: 10 * 1000,
    });
  }

  constructor(baseURL: string, apiConfiguration: ApiConfiguration = {}) {
    this.client = this.createAxiosClient(baseURL, apiConfiguration);
  }

  async get<TResponse>(path: string, config?: RequestConfig): Promise<TResponse> {
    const response = await this.client.get<TResponse>(path, config);

    return response.data;
  }
}

export const apiClient = new ApiClient('http://localhost:4000');
