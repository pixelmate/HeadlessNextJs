import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Debugger } from './debug';
declare type AxiosDataFetcherOptions = {
  /**
   * Callback which executed before request is sent. You can modify axios config.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {AxiosRequestConfig} config axios config
   */
  onReq?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  /**
   * Callback which invoked when request error happened.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {unknown} error
   */
  onReqError?: (error: unknown) => unknown;
  /**
   * Callback which invoked when got response from server.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {AxiosResponse} serverRes server response
   */
  onRes?: (serverRes: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  /**
   * Callback which invoked when status codes fallen outside the range of 2xx.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {unknown} error
   */
  onResError?: (error: unknown) => unknown;
  /**
   * Override debugger for logging. Uses 'sitecore-jss:http' by default.
   */
  debugger?: Debugger;
};
export declare type AxiosDataFetcherConfig = AxiosRequestConfig & AxiosDataFetcherOptions;
/**
 *  AxisoDataFetcher is a wrapper for axios library.
 */
export declare class AxiosDataFetcher {
  private instance;
  /**
   * @param {AxiosDataFetcherConfig} dataFetcherConfig Axios data fetcher configuration.
   * Note `withCredentials` is set to `true` by default in order for Sitecore cookies to
   * be included in CORS requests (which is necessary for analytics and such).
   */
  constructor(dataFetcherConfig?: AxiosDataFetcherConfig);
  /**
   * Implements a data fetcher. @see HttpDataFetcher<T> type for implementation details/notes.
   * @param {string} url The URL to request; may include query string
   * @param {unknown} [data] Optional data to POST with the request.
   * @returns {Promise<AxiosResponse<T>>} response
   */
  fetch<T>(url: string, data?: unknown): Promise<AxiosResponse<T>>;
  /**
   * Perform a GET request
   * @param {string} url The URL to request; may include query string
   * @param {AxiosRequestConfig} [config] Axios config
   * @returns {Promise<AxiosResponse<T>>} response
   */
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  /**
   * Perform a HEAD request
   * @param {string} url The URL to request; may include query string
   * @param {AxiosRequestConfig} [config] Axios config
   * @returns {Promise<AxiosResponse>} response
   */
  head(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  /**
   * Perform a POST request
   * @param {string} url The URL to request; may include query string
   * @param {unknown} [data] Data to POST with the request.
   * @param {AxiosRequestConfig} [config] Axios config
   * @returns {Promise<AxiosResponse>} response
   */
  post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  /**
   * Perform a PUT request
   * @param {string} url The URL to request; may include query string
   * @param {unknown} [data] Data to PUT with the request.
   * @param {AxiosRequestConfig} [config] Axios config
   * @returns {Promise<AxiosResponse>} response
   */
  put(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  /**
   * Perform a DELETE request
   * @param {string} url The URL to request; may include query string
   * @param {AxiosRequestConfig} [config] Axios config
   * @returns {Promise<AxiosResponse>} response
   */
  delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
}
export {};
