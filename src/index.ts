import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.userstable.create({
    data: {
      user_uid: 'user1',
      username: 'zaazuh',
      password: '12345',
      full_name: 'Zahraa Osman',
      api_key: 'placeholder54321',
      date_added: new Date(2024-10-0o6),
      date_modified: new Date(2024-10-0o6)
    }
  })

  const alluserstable = await prisma.userstable.findMany();
  console.dir(alluserstable);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })