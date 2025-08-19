import type { HttpStatusCodes } from "~/constants/HttpStatusCodes.ts";

export class HttpError extends Error {
  status: HttpStatusCodes;
  data?: unknown;

  constructor(message: string, status: HttpStatusCodes, data?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.data = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
