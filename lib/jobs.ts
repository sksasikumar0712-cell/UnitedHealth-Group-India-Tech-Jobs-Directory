export type Job = {
  title: string;
  company: string;
  location: string;
  category: string;
  id?: string;
  url: string;
};

export function isOfficialJobUrl(value: string): boolean {
  // Require the complete canonical URL, including the individual posting ID.
  return /^https:\/\/careers\.unitedhealthgroup\.com\/(?:en\/)?job\/[a-z0-9-]+\/[a-z0-9-]+\/\d+\/\d+$/.test(value)
    && value === value.trim();
}

export function validateJobs(input: unknown): Job[] {
  if (!Array.isArray(input)) throw new Error('Jobs must be a JSON array');
  const ids = new Set<string>();
  const urls = new Set<string>();

  for (const [index, job] of input.entries()) {
    const fail = (reason: string): never => {
      throw new Error(`Job at index ${index}: ${reason}`);
    };
    if (!job || typeof job !== 'object' || Array.isArray(job)) fail('expected an object');
    const { title, company, location, category, id, url } = job;
    if (Object.keys(job).some((key) => !['title', 'company', 'location', 'category', 'id', 'url'].includes(key))) {
      fail('unexpected field');
    }
    if (![title, company, location, category].every((value) =>
      typeof value === 'string' && value === value.trim() && value.length > 0 && value.length <= 240 && !/[<>\x00-\x1f]/.test(value))) {
      fail('invalid title, company, location or category');
    }
    if (!['Optum', 'UnitedHealth Group'].includes(company) || !location.endsWith(', India')) {
      fail('unexpected company or location');
    }
    if (typeof url !== 'string' || !isOfficialJobUrl(url) || urls.has(url.replace('/en/job/', '/job/'))) {
      fail('invalid or duplicate official job URL');
    }
    if (id !== undefined) {
      if (typeof id !== 'string' || !/^\d{1,20}$/.test(id) || ids.has(id)) fail('invalid or duplicate requisition ID');
      ids.add(id);
    }
    urls.add(url.replace('/en/job/', '/job/'));
  }
  return input as Job[];
}

export function matchJobs(jobs: Job[], query: string, category: string): Job[] {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return jobs.filter((job) => {
    if (category && job.category !== category) return false;
    const text = [job.title, job.company, job.location, job.category, job.id].join(' ').toLowerCase();
    return words.every((word) => text.includes(word));
  });
}
