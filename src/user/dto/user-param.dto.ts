import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class UserParamDto{
    
    @IsNotEmpty()
    @IsString()
    id:string
}