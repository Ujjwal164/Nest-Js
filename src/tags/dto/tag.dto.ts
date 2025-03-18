import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class TagDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  name: string;

  @ApiProperty({
    name: 'slug',
    description: 'Enter the slug of thpost',
    required: true,
    type: String,
    example: 'Wlcoem -to -my reel',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(512)
  slug: string;

  @ApiPropertyOptional({
    name: 'Description',
    description: 'Description of the tag',
    example: 'Infor related to the tags',
  })
  @IsOptional()
  @MaxLength(512)
  description?: string;

  @ApiPropertyOptional({
    name: 'Schmea',
    description: 'json object of the schema',
    example: '',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    name: 'Featured Image Url',
    description: 'url of the featured image',
    type: String,
    example: 'https://www.google.com',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageUrl?: string;
}
