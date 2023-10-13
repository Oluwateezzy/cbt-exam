import { ApiProperty } from "@nestjs/swagger"

export class userdto {
    @ApiProperty()
    email: string

    @ApiProperty()
    password: string
}