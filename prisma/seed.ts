import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedRole = async () => {
  const roles = [
    {
      name: 'ADMIN',
      type: 0,
    },
    {
      name: 'BASE',
      type: 1,
    },
    {
      name: 'COMPANY',
      type: 2,
    },
  ];

  for (const role of roles) {
    await prisma.role.create({
      data: role,
    });
  }
};

const seedSkill = async () => {
  const skills = [
    {
      name: 'ReactJS',
    },
    {
      name: 'VueJS',
    },
    {
      name: 'NodeJS',
    },
    {
      name: 'NestJS',
    },
    {
      name: 'Golang',
    },
    {
      name: 'Rust',
    },
    {
      name: 'PHP',
    },
    {
      name: 'Laravel',
    },
    {
      name: '.Net',
    },
    {
      name: 'C#',
    },
    {
      name: 'Unity',
    },
    {
      name: 'Python',
    },
  ];

  for (const skill of skills) {
    await prisma.skill.create({
      data: skill,
    });
  }
};

(async () => {
  await Promise.all([seedSkill(), seedRole()]);
})()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
