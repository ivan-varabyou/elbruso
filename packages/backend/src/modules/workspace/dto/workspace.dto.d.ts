export declare class CreateWorkspaceDto {
    name: string;
    description?: string;
    icon?: string;
}
export declare class UpdateWorkspaceDto {
    name?: string;
    description?: string;
    icon?: string;
}
export declare enum WorkspaceRole {
    OWNER = "owner",
    EDITOR = "editor",
    VIEWER = "viewer"
}
export declare class AddMemberDto {
    email: string;
    role: WorkspaceRole;
}
export declare class UpdateMemberRoleDto {
    role: WorkspaceRole;
}
