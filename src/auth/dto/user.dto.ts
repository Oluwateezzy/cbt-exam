import { ApiProperty } from "@nestjs/swagger"

export class userdto {
    @ApiProperty()
    username: string

    @ApiProperty()
    password: string
}