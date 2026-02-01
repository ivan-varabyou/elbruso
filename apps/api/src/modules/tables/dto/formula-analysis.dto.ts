import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional } from 'class-validator';

export class AnalyzeFormulaDto {
  @ApiProperty({
    description: 'Formula to analyze',
    example: '=SUM([Revenue]!A1:A10)',
  })
  @IsString()
  formula: string;

  @ApiProperty({ description: 'Current workspace ID' })
  @IsUUID()
  workspaceId: string;
}

export class ExternalRefResponse {
  @ApiProperty()
  fullReference: string;

  @ApiPropertyOptional()
  workspaceId?: string;

  @ApiProperty()
  tableId: string;

  @ApiProperty()
  tableName: string;

  @ApiProperty()
  range: string;

  @ApiProperty()
  hasAccess: boolean;
}

export class FormulaAnalysisResponse {
  @ApiProperty()
  valid: boolean;

  @ApiPropertyOptional()
  error?: string;

  @ApiProperty({ type: [ExternalRefResponse] })
  externalDependencies: ExternalRefResponse[];
}
