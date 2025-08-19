    import { queryOptions } from "@tanstack/react-query";

import type { PingResponse } from "~/@types/responses/PingResponse.ts";
import type { HttpError } from "~/errors/HttpError.ts";
import { pingApi } from "~/features/auth/api/authApi.ts";

export const authOptions = {
  ping: () =>
    queryOptions<PingResponse, HttpError>({
      gcTime: Infinity,
      queryFn: ({ signal }) => pingApi(signal),
      queryKey: ["auth", "ping"],
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: Infinity,
    }),
};
