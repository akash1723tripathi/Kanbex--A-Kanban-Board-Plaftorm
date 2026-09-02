import {
  Header,
  Hero,
  Features,
  ProductShowcase,
  Pricing,
  Testimonials,
  CTA,
  Footer,
} from '@/components/landing';
import { ServerWarmup } from '@/components/landing/ServerWarmup';

export default function HomePage() {
  return (
    <>
      <ServerWarmup />
      <Header />
      <main>
        <Hero />
        <Features />
        <ProductShowcase />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
