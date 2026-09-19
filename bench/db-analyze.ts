import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://bench:bench_secret@localhost:5433/kanbex_bench"
    }
  }
});

async function main() {
  console.log('Running DB Analysis...\n');
  
  const queries = [
    {
      name: 'Get User Projects',
      sql: `EXPLAIN ANALYZE SELECT * FROM projects p INNER JOIN project_members pm ON p.id = pm."projectId" WHERE pm."userId" = 'dummy_id'`
    },
    {
      name: 'Get Project Tasks',
      sql: `EXPLAIN ANALYZE SELECT * FROM tasks t INNER JOIN columns c ON t."columnId" = c.id WHERE c."projectId" = 'dummy_id' ORDER BY c."order" ASC, t."order" ASC`
    },
    {
      name: 'Global Tasks Search',
      sql: `EXPLAIN ANALYZE SELECT * FROM tasks t WHERE t.title ILIKE '%test%' AND t."deletedAt" IS NULL ORDER BY t."dueDate" ASC LIMIT 50`
    }
  ];
  
  for (const q of queries) {
    console.log(`--- ${q.name} ---`);
    try {
      const result = await prisma.$queryRawUnsafe(q.sql) as any[];
      result.forEach(row => console.log(row['QUERY PLAN']));
    } catch (e) {
      console.error(e.message);
    }
    console.log('\n');
  }

  console.log('--- Missing Indexes Check ---');
  const missingIndexesSql = `
    SELECT
      relname AS table_name,
      seq_scan AS sequential_scans,
      idx_scan AS index_scans
    FROM pg_stat_user_tables
    WHERE seq_scan > 100
    ORDER BY seq_scan DESC;
  `;
  try {
    const missing = await prisma.$queryRawUnsafe(missingIndexesSql) as any[];
    if (missing.length === 0) {
      console.log('No heavily sequential scanned tables found.');
    } else {
      console.table(missing);
    }
  } catch(e) {
    console.error(e.message);
  }
}

main().finally(() => prisma.$disconnect());
