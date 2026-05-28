import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

import { ThemeProvider } from './components/ThemeProvider';






export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Header />
        <main className="pt-0 lg:pt-4">
          <Hero />
          <Services />
          <About />
          <Testimonials />
        </main>

        <Footer />

      </div>
    </ThemeProvider>
  );
}

