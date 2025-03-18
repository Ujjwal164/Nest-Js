import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostType } from '../enums/postType.enum';
import { StatusEnum } from '../enums/status.enum';
import { CreateMetaOptionsDto } from '../../meta-option/dto/create-metaOptions.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    name: 'title',
    description: 'titoe of the post',
    required: true,
    type: String,
    example: 'Welocm to my post',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(5)
  title: string;

  @ApiProperty({
    name: 'postType',
    description: 'Enter te type of post',
    required: true,
    type: String,
    example: 'story , reel , post',
  })
  @IsNotEmpty()
  @IsEnum(PostType)
  postType: PostType;

  @ApiProperty({
    name: 'slug',
    description: 'Enter the slug of thpost',
    required: true,
    type: String,
    example: 'Wlcoem -to -my reel',
  })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({
    name: 'Status',
    description: 'status of the post',
    required: true,
    type: String,
    example: 'review , published , draft',
  })
  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: StatusEnum;

  @ApiPropertyOptional({
    name: 'Content',
    description: 'Post content',
    type: String,
    example: 'This is the content of the post',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    name: 'Schmea',
    description: 'JSON object of the schema',
    example: '{}',
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
  featuredImageUrl?: string;

  @ApiProperty({
    name: 'Published On',
    description: 'Time when the post is published',
    required: true,
    type: String,
    example: '2021-09-09T00:00:00.000Z',
  })
  @IsOptional()
  @IsISO8601()
  publishedOn?: string;

  @ApiPropertyOptional({
    name: 'tags',
    description: 'tags of the post',
    example: '[tag1,tag2,tag3]',
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true }) // each:true means each element of the array should be string
  @MinLength(1, { each: true }) // each:true means each element of the array should be validated
  tags?: string[];

  @ApiPropertyOptional({
    name: 'metaOptions',
    description: 'meta options of the post',
    example:
      '[{"key":"key1","value":"value1"},{"key":"key2","value":"value2"}]',
    type: Object,
    required: false,
    items: {
      type: 'object',
      properties: {
        metValue: {
          type: 'json',
          description: 'metValue must be a json string',
          example: '{"sidebarEnabled":true}',
        }
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true }) // each:true means each element of the array should be validated
  @Type(() => CreateMetaOptionsDto) // this create a instance of the dto for each element of the array
  metaOptions?: CreateMetaOptionsDto; // this is the nested object that contain key value pair
}
