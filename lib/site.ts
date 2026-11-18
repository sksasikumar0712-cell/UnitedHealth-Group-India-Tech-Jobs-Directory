export const title = 'UHG Tech Careers | UnitedHealth Group and Optum India';
export const description = 'Discover opportunities across Product, AI/ML, Software Engineering, Cloud and more.';
export const linkedIn = 'https://www.linkedin.com/in/sasikumarsampath/';

export const siteUrl = process.env.SITE_URL
  ? new URL(process.env.SITE_URL)
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
    : undefined;

if (siteUrl && (siteUrl.protocol !== 'https:' || siteUrl.href !== `${siteUrl.origin}/`)) {
  throw new Error('SITE_URL must be an HTTPS origin');
}
