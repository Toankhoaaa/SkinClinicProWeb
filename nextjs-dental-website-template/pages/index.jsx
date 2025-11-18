import { Fragment } from 'react';
import Head from 'next/head';
import Hero from 'components/Hero';
import Services from 'components/Services';
import Facts from 'components/Facts';
import PageProgress from 'components/PageProgress';

const Home = () => (
  <Fragment>
    <PageProgress />
    <Head>
      <title>Derma Clinic – Professional Dermatology Care & Skin Solutions</title>
      <meta
        name="description"
        content="Professional Dermatology Clinic offering advanced skin care treatments, acne solutions, laser therapy, and skincare services. Book your appointment today!"
      />
    </Head>

    <main className="content-wrapper overflow-hidden">
      <Hero />
      <section className="wrapper">
        <div className="container py-10 py-md-12">
          <Services />
        </div>
      </section>
      <section className="wrapper facts">
        <div className="container py-12 py-md-14 justify-content-center">
          <Facts />
        </div>
      </section>
    </main>
  </Fragment>
);

export default Home;
