// API Endpoints Constants
export const API_ENDPOINTS = {
  // Workspaces
  WORKSPACE_TABLES: (workspaceId: string) => `/workspaces/${workspaceId}/tables`,
  
  // Tables
  TABLE: (id: string) => `/tables/${id}`,
  TABLE_VERSIONS: (tableId: string) => `/tables/${tableId}/versions`,
  TABLE_LINKS: (tableId: string) => `/tables/${tableId}/links`,
  
  // Versions
  VERSION_ACTIVATE: (versionId: string) => `/versions/${versionId}/activate`,
  VERSION_CELLS: (versionId: string) => `/versions/${versionId}/cells`,
  VERSION_CELLS_BATCH: (versionId: string) => `/versions/${versionId}/cells/batch`,
  VERSION_FORMULAS: (versionId: string) => `/versions/${versionId}/formulas`,
  VERSION_ROW: (versionId: string, index: number) => `/versions/${versionId}/rows/${index}`,
  VERSION_COLUMN: (versionId: string, index: number) => `/versions/${versionId}/columns/${index}`,
  
  // Merged Cells
  VERSION_MERGE_CELLS: (versionId: string) => `/versions/${versionId}/merge`,
  VERSION_UNMERGE_CELLS: (versionId: string, mergedCellId: string) => `/versions/${versionId}/merge/${mergedCellId}`,
  VERSION_MERGED_CELLS: (versionId: string) => `/versions/${versionId}/merged-cells`,
  
  // Links
  LINK_SYNC: (linkId: string) => `/links/${linkId}/sync`,
  
  // Reference
  REFERENCE_REGIONS: '/reference/regions',
  REFERENCE_SPORTS: '/reference/sports',
  REFERENCE_INDICATORS: '/reference/indicators',
  REFERENCE_INDICATOR_GROUPS: '/reference/indicator-groups',
  REFERENCE_SEASONS: '/reference/seasons',
  REFERENCE_ORGANIZATIONS: '/reference/organizations',
  REFERENCE_CUSTOM: '/reference/custom',

  REFERENCE_BY_ID: (id: string) => `/reference/${id}`,
  
  // Templates
  TEMPLATES: '/templates',
  TEMPLATE: (id: string) => `/templates/${id}`,
  TEMPLATE_APPLY: (templateId: string) => `/templates/${templateId}/apply`,
} as const;
