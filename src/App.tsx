import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { initConsoleGreeting } from '@/utils/consoleGreeting';
import ScrollToHash from '@/components/common/ScrollToHash';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import MainPage from './pages/MainPage/MainPage';
import BlogPage from './pages/BlogPage/BlogPage';
import LinksPage from './pages/LinksPage/LinksPage';
import NowPage from './pages/NowPage/NowPage';
import NotFound from './pages/NotFoundPage/NotFound';
// import PageTransition from './components/layout/PageTransition';

import SmoothScroll from './components/common/SmoothScroll';
import CustomCursor from './components/common/CustomCursor/CustomCursor';

gsap.registerPlugin(ScrollTrigger, useGSAP);


const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    initConsoleGreeting();
  }, []);

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <ScrollToHash />

        <Header />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/go" element={<LinksPage />} />
          <Route path="/now" element={<NowPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />

      </SmoothScroll>
    </>
  );
}
export default App;