import jobs from '../data/jobs.json';
import { linkedIn } from '../lib/site';
import Directory from './directory';

const external = { target: '_blank', rel: 'noopener noreferrer' };
const locations = new Set(jobs.map((job) => job.location)).size;

export default function Home() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="identity" href="/" aria-label="Product with Sasi home">
            <img className="avatar" src="/sasi.webp" alt="" width={40} height={40} />
            <span>productwithsasi<small>A little direction for your next big move.</small></span>
          </a>
          <a className="social" href={linkedIn} {...external} aria-label="LinkedIn profile for Product with Sasi"><span className="linkedin-icon" aria-hidden="true">in</span><span>Let’s connect</span></a>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="shell grow">
        <section className="hero" aria-labelledby="headline">
          <div className="hero-copy">
            <p className="eyebrow">INDIA TECH JOB DIRECTORY</p>
            <h1 id="headline">Your next chapter.<br /><span>UnitedHealth Group.</span></h1>
            <p className="hero-description">Explore technology opportunities at UnitedHealth Group and Optum in India. Find your fit, then apply directly on the official careers site.</p>
            <div className="hero-notes"><span>No sign-up needed</span><span>Direct employer links</span></div>
          </div>
          <aside className="hero-summary" aria-label="Directory at a glance">
            <div className="company-mark" aria-hidden="true">U<span>+</span></div>
            <p>HEALTHCARE MEETS TECHNOLOGY</p>
            <strong>Build what matters.</strong>
            <div className="summary-stats"><div><b>{jobs.length}</b><span>curated roles</span></div><div><b>{locations}</b><span>Indian cities</span></div></div>
          </aside>
        </section>
        <Directory jobs={jobs} />
        <section className="careers-note">
          <div><h2>Keep exploring.</h2><p>Openings can change. Check the employer’s careers site for the latest roles and eligibility.</p></div>
          <a href="https://careers.unitedhealthgroup.com/" {...external}>Visit official careers</a>
        </section>
        <section className="about-company" aria-labelledby="about-title">
          <div><p className="eyebrow">GET TO KNOW THE COMPANY</p><h2 id="about-title">Technology with a purpose.</h2></div>
          <div><p>This directory brings together UnitedHealth Group and Optum technology listings across product, AI/ML, engineering, cloud and IT. Use the role details to find opportunities that fit your skills and preferred city.</p><p className="source-note">An independent, manually curated directory by Product with Sasi. This is a saved collection, not a live vacancy feed. Confirm availability and details on the official posting before applying.</p></div>
        </section>
        <footer className="page-footer"><span>Curated by <strong>productwithsasi</strong></span><span>Good opportunities deserve to be shared.</span></footer>
      </main>
      <div className="site-footer"><div className="shell footer-inner"><span>Find your next opportunity.<small>More career discoveries with Sasi.</small></span><a href={linkedIn} {...external} className="primary"><span className="linkedin-icon" aria-hidden="true">in</span>Follow me on LinkedIn</a></div></div>
    </>
  );
}
