import { PartialType } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";
import { CreatePostDto } from "./createPostDto";

export class PatchPostDto extends PartialType(CreatePostDto){ // partial type is used to make all the fields optional
   
   @IsOptional()
   @IsInt()
    id?:number
}