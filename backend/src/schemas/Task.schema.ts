import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type TaskDocument = Task & mongoose.Document;

export enum StatusEnum {
    Pending = "Pending",
    "In progress" = "In progress",
    Completed = "Completed"
}

@Schema()
export class Task {
    @Prop({ required: true, type: String })
    title: string;

    @Prop({ required: true, type: String })
    description: string;

    @Prop({ required: true, type: Date, default: Date.now() })
    date: Date;

    @Prop({ required: true, type: String })
    status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);