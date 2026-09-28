import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { useRevealOnScroll } from './components/Primitives';
import {
  CapabilityStrip, FeatureShowcase, ModuleGrid, DashboardShowcase,
  OutletSection, WhySection, IntegrationsSection,
} from './components/Sections';
import { PricingSection, FaqSection, DemoSection } from './components/Conversion';
import Footer from './components/Footer';
import { OUTLETS } from './content';
import { usePlans } from './hooks/usePlans';

export default function App() {
  const rootRef = useRef(null);
  const [plan, setPlan] = useState('');
  const plansState = usePlans(); // live plans from the backend API
  const [outlet, setOutlet] = useState(OUTLETS[0].id);
  // ?outlet=<id> (used by links from other pages) pre-selects an outlet tab after hydration
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('outlet');
    if (OUTLETS.some((o) => o.id === q)) setOutlet(q);
  }, []);
  useRevealOnScroll(rootRef);

  return (
    <div ref={rootRef} className="lp min-h-screen">
      <Header onSelectOutlet={setOutlet} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero plans={plansState.plans} />
        <CapabilityStrip />
        <FeatureShowcase />
        <ModuleGrid />
        <DashboardShowcase />
        <OutletSection selected={outlet} onSelect={setOutlet} />
        <WhySection />
        <IntegrationsSection />
        <PricingSection plansState={plansState} onChoosePlan={setPlan} />
        <FaqSection />
        <DemoSection plan={plan} onPlanChange={setPlan} plans={plansState.plans} />
      </main>
      <Footer onSelectOutlet={setOutlet} />
    </div>
  );
}
