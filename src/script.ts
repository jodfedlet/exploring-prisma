import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log(Math.random().toString(36))

async function main() {
    // Create a new User record
    const randomData = Math.random().toString(36);
  let user = await prisma.user.create({
    data: {
      name: `Alice ${randomData}`,
      email: `Alice ${randomData}@prisma.io`,
    },
  });
  console.log(user);

  //Retrieve all User records
  const users = await prisma.user.findMany()
  console.log(users)

  //Explore relation queries with Prisma
  user = await prisma.user.create({
    data: {
      name: `Bob ${randomData}`,
      email: `bob${randomData}@prisma.io`,
      posts: {
        create: {
          title: 'Hello World',
        },
      },
    },
  })
  console.log(user)

  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.dir(usersWithPosts, { depth: null })

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
