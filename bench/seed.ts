import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://bench:bench_secret@localhost:5433/kanbex_bench"
    }
  }
});

async function main() {
  console.log('Clearing database...');
  await prisma.user.deleteMany({}); // cascades to everything else
  
  console.log('Seeding 50 users...');
  const users = [];
  for (let i = 0; i < 50; i++) {
    users.push({
      email: `user${i}@example.com`,
      name: `Test User ${i}`,
      password: 'password123'
    });
  }
  await prisma.user.createMany({ data: users });
  const allUsers = await prisma.user.findMany();

  console.log('Seeding 200 projects/boards...');
  const projects = [];
  for (let i = 0; i < 200; i++) {
    const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
    projects.push({
      name: `Project ${i}`,
      ownerId: randomUser.id
    });
  }
  await prisma.project.createMany({ data: projects });
  const allProjects = await prisma.project.findMany();

  console.log('Seeding columns...');
  const columns = [];
  for (const project of allProjects) {
    columns.push(
      { name: 'To Do', order: 0, projectId: project.id },
      { name: 'In Progress', order: 1, projectId: project.id },
      { name: 'Done', order: 2, projectId: project.id }
    );
  }
  await prisma.column.createMany({ data: columns });
  const allColumns = await prisma.column.findMany();

  console.log('Seeding 5000 tasks...');
  const tasks = [];
  for (let i = 0; i < 5000; i++) {
    const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
    const randomColumn = allColumns[Math.floor(Math.random() * allColumns.length)];
    
    tasks.push({
      title: `Task ${i}`,
      order: i,
      columnId: randomColumn.id,
      createdById: randomUser.id
    });
  }
  
  // create in chunks to avoid memory issues
  const chunkSize = 1000;
  for (let i = 0; i < tasks.length; i += chunkSize) {
    const chunk = tasks.slice(i, i + chunkSize);
    await prisma.task.createMany({ data: chunk });
    console.log(`Created ${i + chunk.length} tasks...`);
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
