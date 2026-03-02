import React, { Suspense, lazy } from 'react';
import Home from '@/components/sections/Home/Home';
import SectionSkeleton from '@/components/ui/SectionSkeleton/SectionSkeleton';

const Projects = lazy(() => import('@/components/sections/Projects/Projects'));
const About = lazy(() => import('@/components/sections/About/About'));
const Reviews = lazy(() => import('@/components/sections/Reviews/Reviews'));
const Contact = lazy(() => import('@/components/sections/Contact/Contact'));


const MainPage: React.FC = () => {
  return (
    <main>
      <Home />

      <Suspense fallback={<SectionSkeleton />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Reviews />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Contact />
      </Suspense>
    </main>
  );
};

export default MainPage;