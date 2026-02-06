export declare class CreateUserDto {
    email: string;
    name: string;
    password: string;
    organizationId?: string;
}
export declare class CreateApiKeyDto {
    name: string;
    permissions: string[];
}
