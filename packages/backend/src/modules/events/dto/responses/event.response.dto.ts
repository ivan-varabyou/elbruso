import { ApiProperty } from '@nestjs/swagger';

export class EventResponseDto {
  @ApiProperty({
    description: 'Event ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Event title',
    example: 'Team Meeting',
  })
  title: string;

  @ApiProperty({
    description: 'Event description',
    example: 'Weekly sync with the team',
  })
  description?: string;

  @ApiProperty({
    description: 'Start date and time',
    example: '2024-01-20T10:00:00.000Z',
  })
  startDate: Date;

  @ApiProperty({
    description: 'End date and time',
    example: '2024-01-20T11:00:00.000Z',
  })
  endDate: Date;

  @ApiProperty({
    description: 'Event location',
    example: 'Conference Room A',
  })
  location?: string;

  @ApiProperty({
    description: 'Whether event is all day',
    example: false,
  })
  isAllDay: boolean;

  @ApiProperty({
    description: 'Event color in hex format',
    example: '#3498db',
  })
  color?: string;

  @ApiProperty({
    description: 'Event status',
    enum: ['pending', 'confirmed', 'cancelled'],
    example: 'confirmed',
  })
  status: string;

  @ApiProperty({
    description: 'Creator user ID',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;
}
