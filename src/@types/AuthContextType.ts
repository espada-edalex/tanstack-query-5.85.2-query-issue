import { PingResponse } from "~/@types/responses/PingResponse.ts"

export interface AuthContextType {
  doesTenantExist: boolean | null;
  loading: boolean;
  pingResponse: PingResponse | null;
}
