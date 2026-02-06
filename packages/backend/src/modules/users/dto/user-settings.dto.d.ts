export declare class UpdateProfileDto {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
export declare class AdminUpdateUserDto extends UpdateProfileDto {
    role?: string;
    organization_id?: number;
    email?: string;
}
