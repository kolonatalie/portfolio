import portfolioImg from '@/assets/images/developer-portfolio-kolonatalie665.webp';
import sofaImg from '@/assets/images/3d-configurator665.webp';
import liquidImg from '@/assets/images/liquid-glass-experience665.webp';
import shopImg from '@/assets/images/e-commerce665.webp';

export interface Project {
  id: number;
  name: string;
  desc: string;
  link: string;
  tags: string[];
  title: string;
  img: string;
  alt: string;
  target: "_self" | "_blank";
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    name: "3D Sofa Configurator",
    desc: "Photorealistic 3D customizer. Features real-time PBR material swapping.",
    link: "https://3d-sofa-configurator.vercel.app", 
    tags: ["Three.js", "React", "PBR Materials"],
    title: "3D Sofa Configurator",
    img: sofaImg,
    alt: "3D Product Configurator with React and Three.js by kolonatalie",
    target: "_blank"
  },
  {
    id: 2,
    name: "Developer Portfolio",
    desc: "High-performance portfolio focusing on GSAP motion and clean architecture.",
    link: import.meta.env.BASE_URL,
    tags: ["GSAP", "Motion Design", "TypeScript", "Performance Tuning"],
    title: "Personal Portfolio",
    img: portfolioImg,
    alt: "High-performance Creative Developer Portfolio by kolonatalie",
    target: "_self"
  },
  {
    id: 3,
    name: "Liquid Glass Experience",
    desc: "Interactive 3D experience with real-time liquid physics",
    link: "https://liquid-glass-experience.vercel.app",
    tags: ["Three.js", "TypeScript", "GSAP", "Rapier physics (WASM)"],
    title: "Interactive 3D Liquid Glass Experience",
    img: liquidImg,
    alt: "Interactive 3D experience with real-time liquid physics. Built with Three.js",
    target: "_blank"
  },
  {
    id: 4,
    name: "Modular E-commerce",
    desc: "Responsive storefront with dynamic rendering and shopping cart logic.",
    link: "https://kolonatalie.github.io/sass-vanilla-js-ecommerce-site/index.html",
    tags: ["Vanilla JS", "E-commerce", "SASS", "Responsive Design"],
    title: "E-commerce Project",
    img: shopImg,
    alt: "Responsive E-commerce store built with Vanilla JS and SASS",
    target: "_blank"
  }
];