import { readFile } from 'node:fs/promises';
import { validateJobs } from '../lib/jobs.ts';

const jobs = validateJobs(JSON.parse(await readFile(new URL('../data/jobs.json', import.meta.url), 'utf8')));
console.log(`Validated ${jobs.length} official job records.`);
