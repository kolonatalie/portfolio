import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import MainPage from './pages/MainPage/MainPage';
import SmoothScroll from './components/common/SmoothScroll';
import CustomCursor from './components/common/CustomCursor/CustomCursor';

// import BlogPage from './pages/BlogPage/BlogPage';

const App: React.FC = () => {
  return (
    <Router>
      <CustomCursor />
      <SmoothScroll>
        <Header />

        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/blog" element={<BlogPage />} /> */}
        </Routes>

        <Footer />
      </SmoothScroll>
    </Router>
  );
}
export default App;