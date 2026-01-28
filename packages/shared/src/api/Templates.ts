import { HttpClient, RequestParams } from "./http-client";

export class Templates<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  constructor() {
    super({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:7100",
    });
  }

  templatesControllerFindAll = (
    query?: {
      sport_id?: string;
      organization_id?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<any, any>({
      path: `/templates`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });

  templatesControllerApply = (
    templateId: string,
    query?: {
      workspace_id?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<any, any>({
      path: `/templates/${templateId}/apply`,
      method: "POST",
      query: query,
      secure: true,
      ...params,
    });
}
