import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { matchJobs, validateJobs } from '../lib/jobs.ts';

const jobs = validateJobs(JSON.parse(readFileSync(new URL('../data/jobs.json', import.meta.url))));
const example = jobs[0];

test('search supports case-insensitive words, cities and requisition IDs', () => {
  assert.ok(matchJobs(jobs, '  OPTUM   chennai ', '').length > 0);
  assert.deepEqual(matchJobs(jobs, example.id, ''), [example]);
  assert.deepEqual(matchJobs(jobs, 'no such job zzzzzz', ''), []);
});

test('category and search are combined', () => {
  const results = matchJobs(jobs, 'chennai', 'Product');
  assert.ok(results.length > 0);
  assert.ok(results.every((job) => job.category === 'Product' && job.location === 'Chennai, India'));
  assert.deepEqual(matchJobs(jobs, '', ''), jobs);
});

test('validates record shape, optional ID, duplicates and unexpected fields', () => {
  const { id, ...withoutId } = example;
  assert.deepEqual(validateJobs([withoutId]), [withoutId]);
  assert.throws(() => validateJobs({}));
  assert.throws(() => validateJobs([null]));
  assert.throws(() => validateJobs([{ ...example, title: '' }]));
  assert.throws(() => validateJobs([{ ...example, title: '<img>' }]));
  assert.throws(() => validateJobs([{ ...example, company: 'Other' }]));
  assert.throws(() => validateJobs([{ ...example, location: 'Chennai' }]));
  assert.throws(() => validateJobs([{ ...example, id: 1 }]));
  assert.throws(() => validateJobs([{ ...example, extra: 'unexpected' }]));
  assert.throws(() => validateJobs([example, { ...withoutId }]));
  assert.throws(() => validateJobs([example, { ...example, url: example.url.replace(/\d+$/, '1') }]));
});

test('rejects application URLs outside the exact HTTPS job-page format', () => {
  for (const url of [
    example.url.replace('https:', 'http:'),
    example.url.replace('.com/', '.com.example.org/'),
    example.url.replace('.com/', '.com:443/'),
    example.url.replace('.com/', '.com@example.org/'),
    example.url + '?next=https://example.org',
    example.url + '\n',
    'https://careers.unitedhealthgroup.com/search-jobs/chennai/India',
    'javascript:alert(1)',
  ]) {
    assert.throws(() => validateJobs([{ ...example, url }]), /invalid or duplicate official job URL/);
  }
});
