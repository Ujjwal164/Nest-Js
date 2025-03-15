import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserParamDto {
  @ApiProperty({
    name: 'id',
    required: true,
    type: String,
    description: 'id of the user',
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
