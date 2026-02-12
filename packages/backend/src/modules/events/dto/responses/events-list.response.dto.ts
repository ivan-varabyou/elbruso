import { ApiProperty } from '@nestjs/swagger';
import { EventResponseDto } from './event.response.dto';

export class EventsListResponseDto {
  @ApiProperty({
    description: 'List of events',
    type: [EventResponseDto],
  })
  events: EventResponseDto[];

  @ApiProperty({
    description: 'Total number of events',
    example: 25,
  })
  total: number;
}
