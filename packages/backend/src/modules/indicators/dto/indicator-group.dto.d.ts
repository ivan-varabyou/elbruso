export declare class CreateIndicatorGroupDto {
    [key: string]: unknown;
    name_ru: string;
    code: string;
    description?: string;
    sport_id?: number;
    sort_order?: number;
    is_active?: boolean;
}
export declare class UpdateIndicatorGroupDto {
    [key: string]: unknown;
    name_ru?: string;
    code?: string;
    description?: string;
    sport_id?: number;
    sort_order?: number;
    is_active?: boolean;
}
export declare class GetIndicatorGroupsDto {
    sportId?: number;
}
