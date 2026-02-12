import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExternalRefResponseDto {
  @ApiProperty({
    description: 'Full reference string',
    example: '[Revenue]!A1:A10',
  })
  fullReference: string;

  @ApiPropertyOptional({
    description: 'Target workspace ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  workspaceId?: string;

  @ApiProperty({
    description: 'Target table ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  tableId: string;

  @ApiProperty({
    description: 'Target table name',
    example: 'Revenue',
  })
  tableName: string;

  @ApiProperty({
    description: 'Cell range',
    example: 'A1:A10',
  })
  range: string;

  @ApiProperty({
    description: 'Whether user has access to the referenced table',
    example: true,
  })
  hasAccess: boolean;
}

export class FormulaAnalysisResponseDto {
  @ApiProperty({
    description: 'Whether formula is syntactically valid',
    example: true,
  })
  valid: boolean;

  @ApiPropertyOptional({
    description: 'Error message if formula is invalid',
    example: 'Unexpected token',
  })
  error?: string;

  @ApiProperty({
    description: 'List of external dependencies',
    type: [ExternalRefResponseDto],
  })
  externalDependencies: ExternalRefResponseDto[];
}
