import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import ThemeProvider from 'theme/ThemeProvider';
import Layout from 'components/Layout';
import { AuthProvider } from '../src/context/AuthContext';

import 'animate.css';
import 'styles/style.css';
import 'styles/responsive.css';
import 'plyr-react/plyr.css';
import 'plugins/scrollcue/scrollCue.css';
import 'assets/scss/style.scss';

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') import('bootstrap');
  }, []);

  useEffect(() => {
    (async () => {
      const scrollCue = (await import('plugins/scrollcue')).default;
      scrollCue.init({ interval: -400, duration: 700, percentage: 0.8 });
      scrollCue.update();
    })();
  }, [pathname]);

  useEffect(() => setLoading(false), []);

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Professional Dermatology Clinic offering advanced skin care treatments, acne solutions, laser therapy, and skincare services. Book your appointment today!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Derma Clinic – Professional Dermatology Care & Skin Solutions" />
        <meta property="og:description" content="Expert dermatology services for all your skin health needs. Modern treatments and experienced doctors." />
      </Head>
      <AuthProvider>
        <Layout>
          <ThemeProvider>
            {loading ? <div className="page-loader" /> : <Component {...pageProps} />}
          </ThemeProvider>
        </Layout>
      </AuthProvider>
    </Fragment>
  );
}

export default MyApp;
