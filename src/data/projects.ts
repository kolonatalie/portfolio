import portfolioImg from '@/assets/images/developer-portfolio-kolonatalie2.webp';
import sofaImg from '@/assets/images/3d-configurator2.webp';
import starterImg from '@/assets/images/starter-kit.webp';
import shopImg from '@/assets/images/e-commerce.webp';

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
    name: "Creative Dev Starter Kit",
    desc: "A professional boilerplate for high-end web projects",
    link: "https://github.com/kolonatalie/react-ts-gsap-starter-kit",
    tags: ["React", "TypeScript", "GSAP", "ESLint 9"],
    title: "GSAP + React Starter Kit",
    img: starterImg,
    alt: "Sass 7-1 and React Starter Kit for Creative Developers",
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