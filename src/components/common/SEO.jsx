import { Helmet } from "react-helmet-async";

// Simplified version of the Kadders SEO component.
// Pass seo={{ metaTitle, metaDescription, canonicalURL }} from each page.
const SEO = ({ seo }) => {
  const defaultTitle = "Get-Hired | Master the US Career Arena";
  const defaultDesc =
    "Don't just apply, Get-Hired through professional branding engineered for candidates who refuse to blend into the noise.";

  const title = seo?.metaTitle || defaultTitle;
  const description = seo?.metaDescription || defaultDesc;
  const url = seo?.canonicalURL || window.location.href;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
