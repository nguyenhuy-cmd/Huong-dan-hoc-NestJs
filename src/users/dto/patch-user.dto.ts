import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsEmail, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class patchUserDto extends PartialType(CreateUserDto) {}