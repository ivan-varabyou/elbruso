import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Workspaces } from "../Workspaces";
import type {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  AddMemberDto,
  UpdateMemberRoleDto,
  CreatePageDto,
  CreateGroupDto,
  ReorderGroupsDto,
  CreateTableDto,
} from "../data-contracts";

const workspacesApi = new Workspaces();

// Query Keys
export const workspacesKeys = {
  all: ["workspaces"] as const,
  lists: () => [...workspacesKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) => [...workspacesKeys.lists(), filters] as const,
  details: () => [...workspacesKeys.all, "detail"] as const,
  detail: (id: string) => [...workspacesKeys.details(), id] as const,
  members: (id: string) => [...workspacesKeys.detail(id), "members"] as const,
  pages: (id: string) => [...workspacesKeys.detail(id), "pages"] as const,
  groups: (id: string) => [...workspacesKeys.detail(id), "groups"] as const,
  tables: (id: string) => [...workspacesKeys.detail(id), "tables"] as const,
};

// Hooks

export const useWorkspaces = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: workspacesKeys.list(filters),
    queryFn: () => workspacesApi.workspacesControllerFindAll(),
  });
};

export const useWorkspace = (id: string) => {
  return useQuery({
    queryKey: workspacesKeys.detail(id),
    queryFn: () => workspacesApi.workspacesControllerFindOne(id),
    enabled: !!id,
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkspaceDto) => workspacesApi.workspacesControllerCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspacesKeys.all });
    },
  });
};

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkspaceDto }) =>
      workspacesApi.workspacesControllerUpdate(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: workspacesKeys.all });
      queryClient.invalidateQueries({ queryKey: workspacesKeys.detail(id) });
    },
  });
};

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => workspacesApi.workspacesControllerDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspacesKeys.all });
    },
  });
};

// Members
export const useWorkspaceMembers = (workspaceId: string) => {
  return useQuery({
    queryKey: workspacesKeys.members(workspaceId),
    queryFn: () => workspacesApi.workspacesControllerGetMembers(workspaceId),
    enabled: !!workspaceId,
  });
};

export const useAddWorkspaceMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AddMemberDto }) =>
      workspacesApi.workspacesControllerAddMember(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: workspacesKeys.members(id) });
    },
  });
};

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      memberId,
      data,
    }: {
      id: string;
      memberId: string;
      data: UpdateMemberRoleDto;
    }) => workspacesApi.workspacesControllerUpdateMemberRole(id, memberId, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: workspacesKeys.members(id) });
    },
  });
};

export const useRemoveWorkspaceMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, memberId }: { id: string; memberId: string }) =>
      workspacesApi.workspacesControllerRemoveMember(id, memberId),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: workspacesKeys.members(id) });
    },
  });
};

// Pages
export const useWorkspacePages = (workspaceId: string) => {
  return useQuery({
    queryKey: workspacesKeys.pages(workspaceId),
    queryFn: () => workspacesApi.pagesControllerGetTree(workspaceId),
    enabled: !!workspaceId,
  });
};

export const useCreatePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, data }: { workspaceId: string; data: CreatePageDto }) =>
      workspacesApi.pagesControllerCreate(workspaceId, data),
    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: workspacesKeys.pages(workspaceId) });
    },
  });
};

// Groups
export const useWorkspaceGroups = (workspaceId: string) => {
  return useQuery({
    queryKey: workspacesKeys.groups(workspaceId),
    queryFn: () => workspacesApi.workspaceGroupsControllerFindAll(workspaceId),
    enabled: !!workspaceId,
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, data }: { workspaceId: string; data: CreateGroupDto }) =>
      workspacesApi.workspaceGroupsControllerCreate(workspaceId, data),
    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: workspacesKeys.groups(workspaceId) });
    },
  });
};

export const useReorderGroups = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, data }: { workspaceId: string; data: ReorderGroupsDto }) =>
      workspacesApi.workspaceGroupsControllerReorder(workspaceId, data),
    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: workspacesKeys.groups(workspaceId) });
    },
  });
};

// Tables
export const useWorkspaceTables = (workspaceId: string, groupId?: string) => {
  return useQuery({
    queryKey: [...workspacesKeys.tables(workspaceId), { groupId }],
    queryFn: () => workspacesApi.dynamicTablesControllerFindAll(workspaceId, { groupId }),
    enabled: !!workspaceId,
  });
};

export const useCreateTable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, data }: { workspaceId: string; data: CreateTableDto }) =>
      workspacesApi.dynamicTablesControllerCreate(workspaceId, data),
    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: workspacesKeys.tables(workspaceId) });
    },
  });
};
