import { useRef, useState } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ChevronLeft, ChevronRight } from '@/components/ui/Icons';
import { REVIEWS_DATA } from '@/data/reviews';

import styles from './Reviews.module.scss';


const reviews = REVIEWS_DATA;

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLElement>(null);

  const { name, country, text } = reviews[index];
  useScrollReveal(reviewsRef);

  const animateTransition = (newIndex: number, direction: 'next' | 'prev') => {
    if (isAnimating || newIndex === index) return;
    setIsAnimating(true);

    gsap.to(quoteRef.current, {
      opacity: 0,
      y: direction === 'next' ? -20 : 20,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setIndex(newIndex);
        gsap.fromTo(quoteRef.current,
          {
            opacity: 0,
            y: direction === 'next' ? 20 : -20
          },
          {
            opacity: 1,
            y: 0, duration: 0.6,
            ease: 'back.out(2)',
            onComplete: () => setIsAnimating(false)
          }
        );
      }
    });
  };

  const handleNext = () => animateTransition((index + 1) % reviews.length, 'next');
  const handlePrev = () => animateTransition((index - 1 + reviews.length) % reviews.length, 'prev');

  const handleDotClick = (targetIndex: number) => {
    const direction = targetIndex > index ? 'next' : 'prev';
    animateTransition(targetIndex, direction);
  };

  return (
    <section
      ref={reviewsRef}
      className={styles.reviews}
      id="reviews"
    >
      <div
        className={clsx(styles.reviewsWrapper, "revealItem")}
        data-animation="fade"
        data-stagger="true"
      >
        <h2>
          what people say</h2>
        <p className={styles.subtitle}>Different field, same professionalism</p>
        <p className={styles.description}>Here’s what my AR clients share</p>
        <div className={styles.buttonContainer}>
          <button
            className={styles.navBtn}
            onClick={handlePrev}
            aria-label="Previous">
            <ChevronLeft />
          </button>
          <button
            className={styles.navBtn}
            onClick={handleNext}
            aria-label="Next">
            <ChevronRight />
          </button>
        </div>
        <div className={styles.reviewContent} ref={quoteRef}>
          <p className={styles.quoteText}>{text}</p>
          <div className={styles.authorInfo}>
            <p className={styles.authorName}>{name}</p>
            <p className={styles.authorCountry}>{country}</p>
          </div>
        </div>
        <div className={styles.pagination}>
          {reviews.map((_, i) => (
            <button
              key={i}
              className={clsx(styles.dot, i === index && styles.activeDot)}
              onClick={() => handleDotClick(i)}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;