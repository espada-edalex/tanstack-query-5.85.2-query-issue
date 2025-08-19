import type { PingResponse } from "~/@types/responses/PingResponse.ts";
import { apiV1 } from "~/lib/apiV1.ts";

export const pingApi = async (signal?: AbortSignal): Promise<PingResponse> => {
  console.log("Checking ping...");
  return await apiV1.get<PingResponse>("/fact", undefined, { signal });
};
