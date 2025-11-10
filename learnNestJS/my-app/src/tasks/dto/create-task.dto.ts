import { IsEmail, IsEnum, IsNotEmpty, IsString} from "class-validator";


export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: "Invalid email format" })
    publisherEmail: string;

    @IsNotEmpty()
    Report: string;

    @IsEnum(["SoftwareEngineer", "SchoolOfLaw", "HumanResources", 
        "SchoolOfScience"], {message: "Invalid role"})
    role: "SofetwareEngineer" | "SchoolOfLaw" | "HumanResources" | "SchoolOfScience";
}