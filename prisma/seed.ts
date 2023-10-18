import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./factory/user.factory";
import { generateExam } from "./factory/exam.factory";

const prisma = new PrismaClient()

const cleanup = async () => {
    const cleanupPromise = [
        prisma.user.deleteMany(),
        prisma.exam.deleteMany(),
        prisma.course.deleteMany(),
        prisma.question.deleteMany(),
        prisma.option.deleteMany()

    ]
    await Promise.all(cleanupPromise)
}

const seed = async () => {
    await cleanup()
    const seedPromises = [
        seedUsers(20),
        generateExam()
    ]
    await Promise.all(seedPromises)
    console.log('Seed date completed!')
}

seed().catch((error) => console.log(error)).finally(async () => {
    await prisma.$disconnect()
})