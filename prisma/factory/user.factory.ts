import { PrismaClient, Role } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

const generateUsers = async (count: number) => {
    const users = []
    for (let i = 0; i < count; i++) {
        users.push({
            email: faker.internet.email(),
            username: faker.person.firstName(),
            password: 'password',
            role: Role.STUDENT
        })
    }
    console.log(users)
    return users
}

const seedUsers = async (count: number) => {
    const users: any = await generateUsers(count)
    for (let user of users){
        await prisma.user.create({data: user})
    }
}
export { seedUsers };
