import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserBodyDto{

@IsString()
@IsNotEmpty()
firstName:string

@IsString()
@IsNotEmpty()
lastName:string

@IsNotEmpty()
@MaxLength(8)
@IsString()
@MinLength(2)
password:string
}