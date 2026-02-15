import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator";

export class CreateContactDto {


    @ApiProperty()
    @IsString()
    title:string;

    @ApiProperty()
    @IsString()
    description:string;

    @ApiProperty()
    @IsString()
    @IsPhoneNumber()
    phoneNumber:string;
}
