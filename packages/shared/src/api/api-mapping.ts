import { Method } from 'axios';
import { ApiOperationIds, ApiTypes } from './api-types';

export interface ApiMappingItem<key extends ApiOperationIds> {
  url: string;
  method: Method;
  tags: Array<ApiTypes[key]['tag']>;
}

export type ApiMapping = {
  [key in keyof ApiTypes]: ApiMappingItem<key>
};

export const apiMapping: ApiMapping = {
  AuthController_register: {
    url: '/auth/register',
    method: 'post',
    tags: [
      'Authentication'
    ]
  },
  AuthController_login: {
    url: '/auth/login',
    method: 'post',
    tags: [
      'Authentication'
    ]
  },
  AuthController_refresh: {
    url: '/auth/refresh',
    method: 'post',
    tags: [
      'Authentication'
    ]
  },
  AuthController_forgotPassword: {
    url: '/auth/forgot-password',
    method: 'post',
    tags: [
      'Authentication'
    ]
  },
  AuthController_resetPassword: {
    url: '/auth/reset-password',
    method: 'post',
    tags: [
      'Authentication'
    ]
  },
  AuthController_verifyResetToken: {
    url: '/auth/verify-reset-token/{token}',
    method: 'get',
    tags: [
      'Authentication'
    ]
  },
  AuthController_getMe: {
    url: '/auth/me',
    method: 'get',
    tags: [
      'Authentication'
    ]
  },
  AuthController_changePassword: {
    url: '/auth/change-password',
    method: 'post',
    tags: [
      'Authentication'
    ]
  },
  UsersController_getProfile: {
    url: '/users/me',
    method: 'get',
    tags: [
      'Users'
    ]
  },
  UsersController_updateProfile: {
    url: '/users/profile',
    method: 'patch',
    tags: [
      'Users'
    ]
  },
  UsersController_findAll: {
    url: '/users',
    method: 'get',
    tags: [
      'Users'
    ]
  },
  UsersController_updateUserAdmin: {
    url: '/users/{id}/admin',
    method: 'patch',
    tags: [
      'Users'
    ]
  },
  UsersController_findOne: {
    url: '/users/{id}',
    method: 'get',
    tags: [
      'Users'
    ]
  },
  UsersController_createApiKey: {
    url: '/users/api-keys',
    method: 'post',
    tags: [
      'Users'
    ]
  },
  WorkspacesController_findAll: {
    url: '/workspaces',
    method: 'get',
    tags: [
      'Workspaces'
    ]
  },
  WorkspacesController_create: {
    url: '/workspaces',
    method: 'post',
    tags: [
      'Workspaces'
    ]
  },
  WorkspacesController_findOne: {
    url: '/workspaces/{id}',
    method: 'get',
    tags: [
      'Workspaces'
    ]
  },
  WorkspacesController_delete: {
    url: '/workspaces/{id}',
    method: 'delete',
    tags: [
      'Workspaces'
    ]
  },
  WorkspacesController_update: {
    url: '/workspaces/{id}',
    method: 'patch',
    tags: [
      'Workspaces'
    ]
  },
  WorkspacesController_getMembers: {
    url: '/workspaces/{id}/members',
    method: 'get',
    tags: [
      'Workspaces'
    ]
  },
  WorkspacesController_addMember: {
    url: '/workspaces/{id}/members',
    method: 'post',
    tags: [
      'Workspaces'
    ]
  },
  WorkspacesController_removeMember: {
    url: '/workspaces/{id}/members/{memberId}',
    method: 'delete',
    tags: [
      'Workspaces'
    ]
  },
  WorkspacesController_updateMemberRole: {
    url: '/workspaces/{id}/members/{memberId}',
    method: 'patch',
    tags: [
      'Workspaces'
    ]
  },
  AdminSetupController_setup: {
    url: '/admin/setup',
    method: 'post',
    tags: [
      'Admin Setup'
    ]
  },
  AdminAuthController_login: {
    url: '/admin/auth/login',
    method: 'post',
    tags: [
      'Admin Authentication'
    ]
  },
  AdminAuthController_logout: {
    url: '/admin/auth/logout',
    method: 'post',
    tags: [
      'Admin Authentication'
    ]
  },
  AdminAuthController_refresh: {
    url: '/admin/auth/refresh',
    method: 'post',
    tags: [
      'Admin Authentication'
    ]
  },
  AdminAuthController_getMe: {
    url: '/admin/auth/me',
    method: 'get',
    tags: [
      'Admin Authentication'
    ]
  },
  AdminUsersController_findAll: {
    url: '/admin/users',
    method: 'get',
    tags: [
      'Admin Users'
    ]
  },
  AdminUsersController_create: {
    url: '/admin/users',
    method: 'post',
    tags: [
      'Admin Users'
    ]
  },
  AdminUsersController_findOne: {
    url: '/admin/users/{id}',
    method: 'get',
    tags: [
      'Admin Users'
    ]
  },
  AdminUsersController_remove: {
    url: '/admin/users/{id}',
    method: 'delete',
    tags: [
      'Admin Users'
    ]
  },
  AdminUsersController_update: {
    url: '/admin/users/{id}',
    method: 'patch',
    tags: [
      'Admin Users'
    ]
  },
  AdminRolesController_findAll: {
    url: '/admin/roles',
    method: 'get',
    tags: [
      'Admin Roles'
    ]
  },
  AdminRolesController_create: {
    url: '/admin/roles',
    method: 'post',
    tags: [
      'Admin Roles'
    ]
  },
  AdminRolesController_findOne: {
    url: '/admin/roles/{id}',
    method: 'get',
    tags: [
      'Admin Roles'
    ]
  },
  AdminRolesController_remove: {
    url: '/admin/roles/{id}',
    method: 'delete',
    tags: [
      'Admin Roles'
    ]
  },
  AdminRolesController_update: {
    url: '/admin/roles/{id}',
    method: 'patch',
    tags: [
      'Admin Roles'
    ]
  },
  PagesController_getTree: {
    url: '/workspaces/{workspaceId}/pages',
    method: 'get',
    tags: [
      'Pages'
    ]
  },
  PagesController_create: {
    url: '/workspaces/{workspaceId}/pages',
    method: 'post',
    tags: [
      'Pages'
    ]
  },
  PagesController_findOne: {
    url: '/pages/{id}',
    method: 'get',
    tags: [
      'Pages'
    ]
  },
  PagesController_delete: {
    url: '/pages/{id}',
    method: 'delete',
    tags: [
      'Pages'
    ]
  },
  PagesController_update: {
    url: '/pages/{id}',
    method: 'patch',
    tags: [
      'Pages'
    ]
  },
  PagesController_move: {
    url: '/pages/{id}/move',
    method: 'post',
    tags: [
      'Pages'
    ]
  },
  BlocksController_findByPage: {
    url: '/pages/{pageId}/blocks',
    method: 'get',
    tags: [
      'Blocks'
    ]
  },
  BlocksController_create: {
    url: '/pages/{pageId}/blocks',
    method: 'post',
    tags: [
      'Blocks'
    ]
  },
  BlocksController_delete: {
    url: '/blocks/{id}',
    method: 'delete',
    tags: [
      'Blocks'
    ]
  },
  BlocksController_update: {
    url: '/blocks/{id}',
    method: 'patch',
    tags: [
      'Blocks'
    ]
  },
  BlocksController_move: {
    url: '/blocks/{id}/move',
    method: 'post',
    tags: [
      'Blocks'
    ]
  },
  WorkspaceGroupsController_findAll: {
    url: '/workspaces/{workspaceId}/groups',
    method: 'get',
    tags: [
      'Workspace Groups'
    ]
  },
  WorkspaceGroupsController_create: {
    url: '/workspaces/{workspaceId}/groups',
    method: 'post',
    tags: [
      'Workspace Groups'
    ]
  },
  WorkspaceGroupsController_delete: {
    url: '/groups/{id}',
    method: 'delete',
    tags: [
      'Workspace Groups'
    ]
  },
  WorkspaceGroupsController_update: {
    url: '/groups/{id}',
    method: 'patch',
    tags: [
      'Workspace Groups'
    ]
  },
  WorkspaceGroupsController_reorder: {
    url: '/workspaces/{workspaceId}/groups/reorder',
    method: 'post',
    tags: [
      'Workspace Groups'
    ]
  },
  FormulaController_analyze: {
    url: '/formulas/analyze',
    method: 'post',
    tags: [
      'Formulas'
    ]
  },
  DynamicTablesController_findAll: {
    url: '/workspaces/{workspaceId}/tables',
    method: 'get',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_create: {
    url: '/workspaces/{workspaceId}/tables',
    method: 'post',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_findOne: {
    url: '/tables/{id}',
    method: 'get',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_delete: {
    url: '/tables/{id}',
    method: 'delete',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_update: {
    url: '/tables/{id}',
    method: 'patch',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_getVersionHistory: {
    url: '/tables/{id}/versions',
    method: 'get',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_createVersion: {
    url: '/tables/{id}/versions',
    method: 'post',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_activateVersion: {
    url: '/versions/{id}/activate',
    method: 'post',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_getCells: {
    url: '/versions/{id}/cells',
    method: 'get',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_updateCell: {
    url: '/versions/{id}/cells/{rowIndex}/{colIndex}',
    method: 'patch',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_batchUpdateCells: {
    url: '/versions/{id}/cells/batch',
    method: 'post',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_insertRow: {
    url: '/versions/{id}/rows/{index}',
    method: 'post',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_deleteRow: {
    url: '/versions/{id}/rows/{index}',
    method: 'delete',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_insertColumn: {
    url: '/versions/{id}/columns/{index}',
    method: 'post',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_deleteColumn: {
    url: '/versions/{id}/columns/{index}',
    method: 'delete',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_createLink: {
    url: '/tables/{id}/links',
    method: 'post',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_updateMatrixFormulas: {
    url: '/versions/{id}/matrix-formulas',
    method: 'patch',
    tags: [
      'Dynamic Tables'
    ]
  },
  DynamicTablesController_getDonorStatus: {
    url: '/tables/{id}/donor-status',
    method: 'get',
    tags: [
      'Dynamic Tables'
    ]
  },
  RegionsController_findAll: {
    url: '/reference/regions',
    method: 'get',
    tags: [
      'Regions'
    ]
  },
  RegionsController_findById: {
    url: '/reference/regions/{id}',
    method: 'get',
    tags: [
      'Regions'
    ]
  },
  RegionsController_findByDistrict: {
    url: '/reference/regions/by-district/{districtId}',
    method: 'get',
    tags: [
      'Regions'
    ]
  },
  RegionsController_findByCountry: {
    url: '/reference/regions/by-country/{countryId}',
    method: 'get',
    tags: [
      'Regions'
    ]
  },
  SportsController_findAll: {
    url: '/reference/sports',
    method: 'get',
    tags: [
      'Sports'
    ]
  },
  SportsController_findById: {
    url: '/reference/sports/{id}',
    method: 'get',
    tags: [
      'Sports'
    ]
  },
  SportsController_findDisciplines: {
    url: '/reference/sports/{id}/disciplines',
    method: 'get',
    tags: [
      'Sports'
    ]
  },
  IndicatorsController_findAll: {
    url: '/reference/indicators',
    method: 'get',
    tags: [
      'Indicators'
    ]
  },
  IndicatorsController_create: {
    url: '/reference/indicators',
    method: 'post',
    tags: [
      'Indicators'
    ]
  },
  IndicatorsController_findById: {
    url: '/reference/indicators/{id}',
    method: 'get',
    tags: [
      'Indicators'
    ]
  },
  IndicatorsController_delete: {
    url: '/reference/indicators/{id}',
    method: 'delete',
    tags: [
      'Indicators'
    ]
  },
  IndicatorsController_update: {
    url: '/reference/indicators/{id}',
    method: 'patch',
    tags: [
      'Indicators'
    ]
  },
  IndicatorsController_findBySport: {
    url: '/reference/indicators/by-sport/{sportId}',
    method: 'get',
    tags: [
      'Indicators'
    ]
  },
  IndicatorsController_getTemplates: {
    url: '/reference/indicators/generation/templates',
    method: 'get',
    tags: [
      'Indicators'
    ]
  },
  IndicatorsController_generate: {
    url: '/reference/indicators/generation/generate',
    method: 'post',
    tags: [
      'Indicators'
    ]
  },
  IndicatorsController_getGroups: {
    url: '/reference/indicators/groups',
    method: 'get',
    tags: [
      'Indicators'
    ]
  },
  IndicatorsController_createGroup: {
    url: '/reference/indicators/groups',
    method: 'post',
    tags: [
      'Indicators'
    ]
  },
  IndicatorsController_getGenders: {
    url: '/reference/indicators/genders',
    method: 'get',
    tags: [
      'Indicators'
    ]
  },
  IndicatorsController_getAgeGroups: {
    url: '/reference/indicators/age-groups',
    method: 'get',
    tags: [
      'Indicators'
    ]
  },
  IndicatorsController_deleteGroup: {
    url: '/reference/indicators/groups/{id}',
    method: 'delete',
    tags: [
      'Indicators'
    ]
  },
  IndicatorsController_updateGroup: {
    url: '/reference/indicators/groups/{id}',
    method: 'patch',
    tags: [
      'Indicators'
    ]
  },
  OrganizationsController_findAll: {
    url: '/reference/organizations',
    method: 'get',
    tags: [
      'Organizations'
    ]
  },
  OrganizationsController_findFederations: {
    url: '/reference/organizations/federations',
    method: 'get',
    tags: [
      'Organizations'
    ]
  },
  OrganizationsController_getTree: {
    url: '/reference/organizations/{id}/tree',
    method: 'get',
    tags: [
      'Organizations'
    ]
  },
  OrganizationsController_getHierarchy: {
    url: '/reference/organizations/{id}/hierarchy',
    method: 'get',
    tags: [
      'Organizations'
    ]
  },
  OrganizationsController_findById: {
    url: '/reference/organizations/{id}',
    method: 'get',
    tags: [
      'Organizations'
    ]
  },
  IndicatorGroupsController_findAll: {
    url: '/reference/indicator-groups',
    method: 'get',
    tags: [
      'Indicator Groups'
    ]
  },
  IndicatorGroupsController_findById: {
    url: '/reference/indicator-groups/{id}',
    method: 'get',
    tags: [
      'Indicator Groups'
    ]
  },
  IndicatorGroupsController_findIndicatorsByGroup: {
    url: '/reference/indicator-groups/{id}/indicators',
    method: 'get',
    tags: [
      'Indicator Groups'
    ]
  },
  SeasonsController_findAll: {
    url: '/reference/seasons',
    method: 'get',
    tags: [
      'Seasons'
    ]
  },
  SeasonsController_create: {
    url: '/reference/seasons',
    method: 'post',
    tags: [
      'Seasons'
    ]
  },
  SeasonsController_findById: {
    url: '/reference/seasons/{id}',
    method: 'get',
    tags: [
      'Seasons'
    ]
  },
  SeasonsController_delete: {
    url: '/reference/seasons/{id}',
    method: 'delete',
    tags: [
      'Seasons'
    ]
  },
  SeasonsController_update: {
    url: '/reference/seasons/{id}',
    method: 'patch',
    tags: [
      'Seasons'
    ]
  },
  SeasonsController_generate: {
    url: '/reference/seasons/generate',
    method: 'post',
    tags: [
      'Seasons'
    ]
  },
  SeasonsController_findCurrent: {
    url: '/reference/seasons/current',
    method: 'get',
    tags: [
      'Seasons'
    ]
  },
  EventsController_findAll: {
    url: '/events',
    method: 'get',
    tags: [
      'Events'
    ]
  },
  EventsController_findById: {
    url: '/events/{id}',
    method: 'get',
    tags: [
      'Events'
    ]
  },
  CountriesController_findActive: {
    url: '/countries/active',
    method: 'get',
    tags: [

    ]
  },
  CountriesController_findAll: {
    url: '/countries',
    method: 'get',
    tags: [

    ]
  }
};
