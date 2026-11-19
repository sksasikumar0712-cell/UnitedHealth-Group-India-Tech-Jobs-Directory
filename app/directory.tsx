'use client';

import { useRef, useState } from 'react';
import { matchJobs, type Job } from '../lib/jobs';

export default function Directory({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const categories = [...new Set(jobs.map((job) => job.category))];
  const matches = matchJobs(jobs, query, category);

  return (
    <section aria-labelledby="jobs-title" className="directory">
      <h2 id="jobs-title" className="sr-only">Browse jobs</h2>
      <div className="job-controls">
        <label htmlFor="job-search" className="sr-only">Search by title, skill, location or job ID</label>
        <div className="search">
          <span aria-hidden="true" className="search-icon" />
          <input
            ref={input}
            id="job-search"
            type="search"
            autoComplete="off"
            placeholder="Search title, skill, city or job ID"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div role="group" aria-label="Filter by job category" className="filters flex gap-2">
          {['', ...categories].map((item) => (
            <button
              type="button"
              className="chip"
              aria-pressed={category === item}
              key={item}
              onClick={() => setCategory(item)}
            >
              {item || 'All roles'}
            </button>
          ))}
        </div>
      </div>
      <p className="result" role="status">{matches.length} {matches.length === 1 ? 'role' : 'roles'}</p>
      {matches.length > 0 ? (
        <ul className="job-list">
          {matches.map((job) => (
            <li className="job" key={job.url}>
              <h3>{job.title}</h3>
              <p className="job-meta"><span className="job-location">{job.location}</span><span>{job.company}</span></p>
              <p className="job-meta"><span>{job.category}</span>{job.id && <span className="job-id">Job ID {job.id}</span>}</p>
              <a className="apply" href={job.url} target="_blank" rel="noopener noreferrer"
                aria-label={`Apply on official site for ${job.title}`}>
                Apply on official site
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <h3>{jobs.length ? 'No matching roles found' : 'No verified roles are listed right now'}</h3>
          {jobs.length > 0 && <button type="button" className="chip" onClick={() => {
            setQuery('');
            setCategory('');
            input.current?.focus();
          }}>Clear filters</button>}
        </div>
      )}
    </section>
  );
}
