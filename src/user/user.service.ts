import { Injectable } from "@nestjs/common";
import { UserParamDto } from "./dto/user-param.dto";

@Injectable()
export class UserService{
    getAll(param){
        return {
            firstNmae:"ujjwal"
        }

    }
    createUser(req){
       
        return req
    }
   
}