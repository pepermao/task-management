import { IsEnum, IsNumber, IsString } from "class-validator";
import { StatusEnum } from "../schemas/Task.schema";


export class GetTasksDTO {
    @IsString()
    order: string;

    @IsNumber()
    page: number;

    @IsNumber()
    pageSize: number;

    @IsEnum(StatusEnum)
    status: StatusEnum
}