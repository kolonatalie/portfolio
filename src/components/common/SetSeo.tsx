import { Helmet } from 'react-helmet-async';

interface SetSeoProps {
  title: string;
  description?: string;
  path: string;
}

const SetSeo: React.FC<SetSeoProps> = ({ title, path }) => {
  const baseUrl = 'https://kolonatalie.vercel.app';
  const fullUrl = `${baseUrl}${path}`;

  return (
    <Helmet>
      <title>{title} | koloNatalie</title>
      <link rel="canonical" href={fullUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta name="twitter:url" content={fullUrl} />
    </Helmet>
  );
};

export default SetSeo;