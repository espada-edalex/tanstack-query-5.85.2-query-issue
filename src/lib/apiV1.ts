import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

import { HttpStatusCodes } from "~/constants/HttpStatusCodes.ts";
import { HttpError } from "~/errors/HttpError.ts";

const API_BASE_URL = "https://catfact.ninja";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false,

  // We need to disable the axios XSRF token handling so we can add our own
  // header in the request interceptor.
  withXSRFToken: false,
});

// Response interceptor for centralised error handling.
axiosInstance.interceptors.response.use(
  // On success, pass the full response through to preserve type information.
  (response) => response,

  // On failure, transform the error into a standard HttpError.
  (error: unknown): Promise<never> => {
    // Manually check for a Cancel object to bypass the buggy `isCancel` type guard.
    // We might be able to remove this in v1.12.0
    if (typeof error === "object" && error !== null && "__CANCEL__" in error) {
      return Promise.reject(
        new axios.CanceledError("Request was canceled by the client."),
      );
    }

    if (axios.isAxiosError(error) && error !== null) {
      if (error.response) {
        const { status, statusText } = error.response;
        // This is a workaround for the ESLint rule that prevents using `any`.
        const data: unknown = error.response.data;

        const message =
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof data.message === "string"
            ? data.message
            : statusText;

        return Promise.reject(
          new HttpError(message, status as HttpStatusCodes, data),
        );
      }

      if (error.request) {
        return Promise.reject(
          new HttpError(
            "No response received from server.",
            HttpStatusCodes.ServiceUnavailable,
          ),
        );
      }
    }

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return Promise.reject(
      new HttpError(message, HttpStatusCodes.InternalServerError),
    );
  },
);

/**
 * Unwraps the Axios response, handling 204 No Content cases.
 *
 * @param response The AxiosResponse object.
 *
 * @returns The data payload, or undefined for 204 status.
 */
function unwrapResponse<T>(response: AxiosResponse<T>): T {
  if (response.status === HttpStatusCodes.NoContent) {
    return undefined as T;
  }

  return response.data;
}

type ApiOptions = Omit<
  AxiosRequestConfig,
  "url" | "method" | "data" | "params"
>;

export const apiV1 = {
  get: async <T = unknown>(
    endpoint: string,
    params?: Record<string, unknown>,
    options?: ApiOptions,
  ): Promise<T> => {
    const response = await axiosInstance.get<T>(endpoint, {
      ...options,
      params,
    });

    return unwrapResponse(response);
  },

  post: async <TResponse = unknown, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: ApiOptions,
  ): Promise<TResponse> => {
    const response = await axiosInstance.post<TResponse>(
      endpoint,
      body,
      options,
    );

    return unwrapResponse(response);
  },

  put: async <TResponse = unknown, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: ApiOptions,
  ): Promise<TResponse> => {
    const response = await axiosInstance.put<TResponse>(
      endpoint,
      body,
      options,
    );

    return unwrapResponse(response);
  },

  delete: async <T = unknown>(
    endpoint: string,
    options?: ApiOptions,
  ): Promise<T> => {
    const response = await axiosInstance.delete<T>(endpoint, options);

    return unwrapResponse(response);
  },

  patch: async <TResponse = unknown, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: ApiOptions,
  ): Promise<TResponse> => {
    const response = await axiosInstance.patch<TResponse>(
      endpoint,
      body,
      options,
    );

    return unwrapResponse(response);
  },
};
