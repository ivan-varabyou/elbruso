import axios from "axios";

const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:7100";

export interface AdminTokens {
  accessToken: string;
  refreshToken: string;
}

export async function adminRefreshToken(refreshToken: string): Promise<AdminTokens> {
  const { data } = await axios.post(`${ADMIN_API_URL}/v1/admin/auth/refresh`, {
    refreshToken,
  });

  return {
    accessToken: data?.accessToken || data?.access_token,
    refreshToken: data?.refreshToken || data?.refresh_token || refreshToken,
  };
}
