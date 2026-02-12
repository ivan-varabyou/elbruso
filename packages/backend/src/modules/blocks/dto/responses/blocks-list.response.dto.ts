import { ApiProperty } from '@nestjs/swagger';
import { BlockResponseDto } from './block.response.dto';

export class BlocksListResponseDto {
  @ApiProperty({
    description: 'List of blocks',
    type: [BlockResponseDto],
  })
  blocks: BlockResponseDto[];

  @ApiProperty({
    description: 'Total number of blocks',
    example: 10,
  })
  total: number;
}
