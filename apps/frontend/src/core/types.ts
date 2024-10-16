export type HttpHeaders = {
  [key: string]: string;
};

export type RequestConfig = {
  headers?: HttpHeaders;
  withCredential?: boolean;
  signal?: AbortSignal;
  params?: Record<string | number | symbol, any>;
};
