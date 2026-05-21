#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const lessonsJsonPath = path.resolve('src/data/lessons.json');
const outDir = path.resolve('src/data/lessons');

async function run() {
  const raw = await fs.readFile(lessonsJsonPath, 'utf8');
  const lessons = JSON.parse(raw);
  await fs.mkdir(outDir, { recursive: true });

  const chunkSize = 2; // two lessons per file
  for (let i = 0; i < lessons.length; i += chunkSize) {
    const chunk = lessons.slice(i, i + chunkSize);
    const start = String(chunk[0].id).padStart(2, '0');
    const end = String(chunk[chunk.length - 1].id).padStart(2, '0');
    const fileName = `lessons-${start}-${end}.json`;
    const outPath = path.join(outDir, fileName);
    await fs.writeFile(outPath, JSON.stringify(chunk, null, 2) + '\n', 'utf8');
    console.log('Wrote', outPath);
  }

  console.log('Split complete.');
}

run().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
