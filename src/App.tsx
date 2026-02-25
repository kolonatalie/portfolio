import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import MainPage from './pages/MainPage/MainPage';
import BlogPage from './pages/BlogPage/BlogPage';

import SmoothScroll from './components/common/SmoothScroll';
import CustomCursor from './components/common/CustomCursor/CustomCursor';

const ScrollToHash = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [hash]);
  return null;
};

const App: React.FC = () => {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <ScrollToHash />

        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
        <Footer />
        
      </SmoothScroll>
    </>
  );
}
export default App;