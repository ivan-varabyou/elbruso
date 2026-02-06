export declare class CreateBlockDto {
    type: string;
    content: Record<string, unknown>;
    afterBlockId?: string;
}
export declare class UpdateBlockDto {
    content?: Record<string, unknown>;
}
export declare class MoveBlockDto {
    afterBlockId?: string;
}
