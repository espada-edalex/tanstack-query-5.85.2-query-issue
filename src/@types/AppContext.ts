import type { QueryClient } from "@tanstack/react-query";

import type { useAuth } from "~/hooks/useAuth.ts";

export interface AppContext {
  auth: ReturnType<typeof useAuth>;
}
