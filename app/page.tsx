import SmoothScroll from '@/components/providers/SmoothScroll';
import Hero from '@/components/hero/Hero';
import CompanySection from '@/components/company/CompanySection';
import Tribute from '@/components/tribute/Tribute';
import EmpireStats from '@/components/stats/EmpireStats';
import HorizontalTimeline from '@/components/timeline/HorizontalTimeline';
import SubscribeForm from '@/components/subscribe/SubscribeForm';
import TimelineIndicator from '@/components/ui/TimelineIndicator';
import Footer from '@/components/ui/Footer';
import { COMPANIES } from '@/data/companies';

export default function Home() {
  return (
    <SmoothScroll>
      <TimelineIndicator />
      <main>
        <Hero />
        {COMPANIES.map((company, index) => (
          <CompanySection
            key={company.id}
            company={company}
            index={index}
            nextAccent={COMPANIES[index + 1]?.accent ?? '#fbbf24'}
          />
        ))}
        <EmpireStats />
        <Tribute />
        <HorizontalTimeline />
        <SubscribeForm />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
