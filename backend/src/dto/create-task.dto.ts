import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { StatusEnum } from "src/schemas/Task.schema";


export class CreateTaskDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsEnum(StatusEnum)
    @IsNotEmpty()
    status: StatusEnum;

}