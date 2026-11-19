'use client';

import { useRef, useState } from 'react';
import { matchJobs, type Job } from '../lib/jobs';

export default function Directory({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const categories = [...new Set(jobs.map((job) => job.category))];
  const locations = [...new Set(jobs.map((job) => job.location))].sort();
  const matches = matchJobs(jobs, query, category).filter((job) => !location || job.location === location);
  const filtered = Boolean(query || category || location);
  function clearFilters() {
    setQuery(''); setCategory(''); setLocation(''); input.current?.focus();
  }

  return (
    <section aria-labelledby="jobs-title" className="directory">
      <div className="directory-heading"><div><p className="eyebrow">FIND YOUR FIT</p><h2 id="jobs-title">Explore the opportunities<span className="total-badge">{jobs.length}</span></h2></div><span className="collection-note">Curated collection · November 2026</span></div>
      <div className="job-controls">
        <div className="search-row">
          <label htmlFor="job-search" className="sr-only">Search by title, skill, location or job ID</label>
          <div className="search"><span aria-hidden="true" className="search-icon" /><input ref={input} id="job-search" type="search" autoComplete="off" placeholder="Search role, skill or job ID" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
          <div className="location-select"><label htmlFor="job-location" className="sr-only">Filter by city</label><select id="job-location" value={location} onChange={(event) => setLocation(event.target.value)}><option value="">All cities</option>{locations.map((city) => <option key={city} value={city}>{city.replace(', India', '')}</option>)}</select></div>
        </div>
        <div role="group" aria-label="Filter by job category" className="filters">
          {['', ...categories].map((item) => <button type="button" className="chip" aria-pressed={category === item} key={item} onClick={() => setCategory(item)}>{item || 'All roles'}<span>{item ? jobs.filter((job) => job.category === item).length : jobs.length}</span></button>)}
        </div>
      </div>
      <div className="results-row"><p className="result" role="status" aria-live="polite">Showing <strong>{matches.length}</strong> {matches.length === 1 ? 'role' : 'roles'}{location ? ` in ${location.replace(', India', '')}` : ' across India'}</p>{filtered && <button className="clear" type="button" onClick={clearFilters}>Clear filters</button>}</div>
      {matches.length > 0 ? <ul className="job-list">{matches.map((job) => <li className="job" key={job.url}>
        <div className="card-top"><span className="category-label">{job.category}</span><span className="company-name">{job.company}</span></div>
        <h3>{job.title}</h3>
        <p className="job-meta"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>{job.location}</p>
        <div className="card-bottom">{job.id && <span className="job-id">Job ID: {job.id}</span>}<a className="apply" href={job.url} target="_blank" rel="noopener noreferrer" aria-label={`Apply on official site for ${job.title}`}>View &amp; apply</a></div>
      </li>)}</ul> : <div className="empty"><h3>{jobs.length ? 'No matching roles found' : 'No verified roles are listed right now'}</h3><p>Try a different keyword, category or city.</p>{jobs.length > 0 && <button type="button" className="chip" onClick={clearFilters}>Clear filters</button>}</div>}
    </section>
  );
}
