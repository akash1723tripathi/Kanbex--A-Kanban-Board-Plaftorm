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

export default function HomePage() {
  return (
    <>
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
