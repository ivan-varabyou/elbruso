export declare class CreateAdminUserDto {
    email: string;
    password: string;
    name: string;
    role: 'ADMIN' | 'MODERATOR' | 'SUPER_ADMIN';
}
