import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserBodyDto{

@IsString()
@IsNotEmpty()
@MinLength(2)
@MaxLength(50)
firstName:string

@IsString()
@IsNotEmpty()
@MinLength(2)   
@MaxLength(50)
lastName:string

@IsString()
@IsNotEmpty()
@MaxLength(50)
@MinLength(2)
email:string

@IsNotEmpty()
@MaxLength(8)
@IsString()
@MinLength(2)
password:string
}