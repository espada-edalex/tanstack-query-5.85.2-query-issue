import { createContext } from "react";

import type { AuthContextType } from "~/@types/AuthContextType.ts";

export const AuthContext = createContext<AuthContextType>({
  doesTenantExist: null,
  loading: true,
  pingResponse: null,
});
