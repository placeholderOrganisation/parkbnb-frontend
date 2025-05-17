import { Helmet } from "react-helmet-async";

interface HeadProps {
  pageTitle: string;
  pageDescription?: string;
  pageImage?: string;
  pageCanonicalUrl?: string;
  pageJsonLdData?: any;
}

const Head = (props: HeadProps) => {
  const {
    pageTitle,
    pageDescription,
    pageImage,
    pageCanonicalUrl,
    pageJsonLdData = {},
  } = props;
  return (
    <div>
      <Helmet>
        (<title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta name="twitter:title" content={pageTitle} />)
        <meta name="description" content={pageDescription} />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta name="twitter:image" content={pageImage} />
        <link rel="icon" type="image/x-icon" href="/logo-black.png" />
        <meta property="og:url" content={pageCanonicalUrl} />
        <link rel="canonical" href={pageCanonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(pageJsonLdData)}
        </script>
      </Helmet>
    </div>
  );
};

export default Head;
