import { ApiProperty } from '@nestjs/swagger';
import { TableResponseDto } from './table.response.dto';

export class TablesListResponseDto {
  @ApiProperty({
    description: 'List of tables',
    type: [TableResponseDto],
  })
  tables: TableResponseDto[];

  @ApiProperty({
    description: 'Total number of tables',
    example: 15,
  })
  total: number;
}
