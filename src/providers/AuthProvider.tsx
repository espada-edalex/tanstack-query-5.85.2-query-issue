import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useMemo } from "react";

import {
  type AuthContextType
} from "~/@types/AuthContextType.ts";
import { AuthContext } from "~/contexts/AuthContext.ts";
import { authOptions } from "~/features/auth/queries/authOptions";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pingResponse = useQuery(authOptions.ping());
  const {
    isLoading,
    isSuccess,
    data,
  } = pingResponse;

  const value = useMemo<AuthContextType>(() => {
    return {
      doesTenantExist: isLoading ? null : isSuccess,
      loading: isLoading,
      pingResponse: data ?? null,
    };
  }, [
    isLoading,
    isSuccess,
    data,
  ]);

  if (value.loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
