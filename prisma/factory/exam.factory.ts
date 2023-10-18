import { faker } from "@faker-js/faker";
import { PrismaClient, options } from "@prisma/client";

const prisma = new PrismaClient()

const generateExam = async () => {
    let date = faker.date.soon()
    const exam = await prisma.exam.create({
        data: {
            name: '100L',
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            maxScore: 100,
            startDate: date,
            endDate: date,
        }
    })
    console.log(exam)
    for (let i = 0; i < 9; i++) {
        let data = {
            name: faker.lorem.slug(),
            description: faker.lorem.paragraph(),
            examId: exam.name,
            startDate: date,
            endDate: date,
        }
        let course = await prisma.course.create({
            data: {...data}
        })
        console.log(course)
        for (let i = 0; i < 10; i++){
            let question = await prisma.question.create({
                data: {
                    question: faker.lorem.sentence(),
                    point: 10,
                    correctAnswer: options.A,
                    courseName: course.name
                }
            })
            console.log(question)

            for (let i = 0; i <= 3; i++) {
                const option = await prisma.option.create({
                    data: {
                        A: faker.lorem.word(),
                        B: faker.lorem.word(),
                        C: faker.lorem.word(),
                        D: faker.lorem.word(),
                        questionId: question.id
                    }
                })
                console.log(option)
            }
        }
    }
}

// const seedExam = async (count: number) => {
//     const exams = await generateExam(count);
//     for (let exam of exams) {
//         await prisma.user.create({ data: exam });
//     }
// };

export { generateExam }