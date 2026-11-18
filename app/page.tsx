import jobs from '../data/jobs.json';
import { description, linkedIn } from '../lib/site';
import Directory from './directory';

const external = { rel: 'noopener noreferrer' };

export default function Home() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="identity" href="/">
            <img className="avatar" src="/sasi.webp" alt="" width={38} height={38} />
            <span>UHG Tech Careers<small>Curated by Product with Sasi</small></span>
          </a>
          <a className="social" href={linkedIn} {...external} aria-label="LinkedIn profile for Product with Sasi">LinkedIn</a>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="shell grow">
        <section className="hero" aria-labelledby="headline">
          <h1 id="headline">Explore Tech Careers at <span>UnitedHealth Group</span></h1>
          <p>{description}</p>
        </section>
        <Directory jobs={jobs} />
        <p className="source-note">Independently curated from the official UnitedHealth Group careers site. Openings can change.</p>
      </main>
      <footer className="site-footer">
        <div className="shell footer-inner">
          <strong>More tech opportunities coming</strong>
          <a href={linkedIn} {...external} className="primary">Follow me on LinkedIn</a>
        </div>
      </footer>
    </>
  );
}
