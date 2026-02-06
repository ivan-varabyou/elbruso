export declare class CreatePageDto {
    parentPageId?: string;
    title: string;
    icon?: string;
    coverImage?: string;
}
export declare class UpdatePageDto {
    title?: string;
    icon?: string;
    coverImage?: string;
}
export declare class MovePageDto {
    parentPageId?: string;
    afterPageId?: string;
}
