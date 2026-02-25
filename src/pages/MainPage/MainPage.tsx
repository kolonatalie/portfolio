import React, { Suspense, lazy } from 'react';
import Home from '@/components/sections/Home/Home';

const Projects = lazy(() => import('@/components/sections/Projects/Projects'));
const About = lazy(() => import('@/components/sections/About/About'));
const Reviews = lazy(() => import('@/components/sections/Reviews/Reviews'));
const Contact = lazy(() => import('@/components/sections/Contact/Contact'));


const MainPage: React.FC = () => {
  return (
    <main>
      <Home />
      <Suspense fallback={null}>
        <Projects />
      </Suspense>
      <Suspense fallback={null}>
        <About />
      </Suspense>
      <Suspense fallback={null}>
        <Reviews />
      </Suspense>
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </main>
  );
};

export default MainPage;