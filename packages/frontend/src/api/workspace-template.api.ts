import { apiClient } from "./client";
import { HttpClient, RequestParams, ContentType } from "./http-client.service";

export interface WorkspaceTemplate {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  organization_id?: number;
  sport_id?: number;
  is_template: boolean;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface CreateWorkspaceTemplateDto {
  name: string;
  description?: string;
  icon?: string;
  organization_id?: number;
  sport_id?: number;
  country_id?: number;
}

export class WorkspaceTemplates<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  constructor() {
    super();
    this.instance = apiClient;
  }

  /**
   * Get all available workspace templates
   */
  findAll = (query?: { organization_id?: number; sport_id?: number; country_id?: number }, params: RequestParams = {}) =>
    this.request<WorkspaceTemplate[], any>({
      path: `/workspace-templates`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * Get template details
   */
  findOne = (id: string, params: RequestParams = {}) =>
    this.request<WorkspaceTemplate, any>({
      path: `/workspace-templates/${id}`,
      method: "GET",
      ...params,
    });

  /**
   * Admin: List all templates
   */
  adminFindAll = (query?: { organization_id?: number; sport_id?: number; country_id?: number }, params: RequestParams = {}) =>
    this.request<WorkspaceTemplate[], any>({
      path: `/admin/workspace-templates`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });

  /**
   * Admin: Create template
   */
  adminCreate = (data: CreateWorkspaceTemplateDto, params: RequestParams = {}) =>
    this.request<WorkspaceTemplate, any>({
      path: `/admin/workspace-templates`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });

  /**
   * Admin: Update template
   */
  adminUpdate = (id: string, data: Partial<CreateWorkspaceTemplateDto>, params: RequestParams = {}) =>
    this.request<WorkspaceTemplate, any>({
      path: `/admin/workspace-templates/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });

  /**
   * Admin: Delete template
   */
  adminDelete = (id: string, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/admin/workspace-templates/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
