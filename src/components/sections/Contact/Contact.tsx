import { useRef, useState } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useFormValidation } from '@/hooks/useFormValidation';
import Button from '@/components/ui/Button/Button';
import Magnetic from '@/components/common/Magnetic';

import styles from './Contact.module.scss';


const FIELD_CONFIG = [
  {
    id: 'name',
    name: 'Name',
    label: "What's your name?",
    type: 'text',
    placeholder: 'Your name'
  },
  {
    id: 'email',
    name: 'Email',
    label: "Email Address",
    type: 'email',
    placeholder: 'name@example.com',
    pattern: "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$"
  },
  {
    id: 'topic',
    name: 'Topic',
    label: "Topic",
    type: 'text',
    placeholder: 'Project type'
  },
  {
    id: 'message',
    name: 'Message',
    label: "Tell me about your project",
    type: 'textarea',
    placeholder: 'I have an idea...'
  },
];

const Contact = () => {
  const contactRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useScrollReveal(contactRef);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { errors, validate, clearError } = useFormValidation();

  const handleInputChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    if (target.validity.valid) {
      clearError(target.id);
    } else {
      validate(target);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const inputs = Array.from(form.querySelectorAll('input, textarea')) as (HTMLInputElement | HTMLTextAreaElement)[];
    const invalidInputs = inputs.filter(input => !validate(input));

    if (invalidInputs.length > 0) {
      invalidInputs.forEach(input => {
        gsap.fromTo(input.parentElement,
          { x: -15 },
          { x: 0, duration: 0.1, repeat: 4, yoyo: true, ease: "power2.inOut" }
        );
      });
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch("https://formspree.io/f/mzzaorzy", {
        method: "POST",
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        gsap.to(formRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          onComplete: () => {
            setStatus('success');
            setTimeout(() => {
              gsap.fromTo(successRef.current,
                {
                  opacity: 0,
                  scale: 0.9
                },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.6,
                  ease: "back.out(1.7)"
                }
              );
            }, 10);
          }
        });
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      setStatus('idle');
      alert("Oops! Problem with sending.");
    }
  };

  return (
    <section
      ref={contactRef}
      className={clsx(styles.contact, "revealItem")}
      id="contact"
      data-animation="fade"
    >
      <p className={styles.accent}>— contact</p>
      {status !== 'success' ? (
        <>
          <div className={styles.contactTitle}>
            <h2 className="revealItem" data-animation="fade">
              got a project?<br />
              let's talk
            </h2>
            <p className={clsx(styles.subtitle, "revealItem")} data-animation="fade">
              please fill out the form below
            </p>
            <p className={clsx(styles.accent, "revealItem")} data-animation="fade">
              Don’t like forms? Find me on{' '}
              <a
                className={styles.textLink}
                href="https://www.linkedin.com/in/kolonatalie/"
                title="Linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >LinkedIn
              </a>{' '}
              or{' '}
              <a
                className={styles.textLink}
                href="https://github.com/kolonatalie"
                title="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className={clsx(styles.form, "revealItem")}
            data-animation="fade"
            data-stagger="true"
          >
            {FIELD_CONFIG.map((field) => (
              <div key={field.id} className={styles.formGroup}>
                <label htmlFor={field.id}>{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    name={field.name}
                    required
                    rows={5}
                    placeholder={field.placeholder}
                    onInput={handleInputChange}
                    className={clsx(errors[field.id] && styles.invalidInput)}
                  />
                ) : (
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    required
                    pattern={field.pattern}
                    placeholder={field.placeholder}
                    onInput={handleInputChange}
                    className={clsx(errors[field.id] && styles.invalidInput)}
                  />
                )}
                <span className={clsx(styles.errorMessage, errors[field.id] && styles.show)}>
                  {errors[field.id]}
                </span>
              </div>
            ))}
            <Magnetic className={styles.submitBtn} data-magnetic>
              <Button
                variant="primary"
                type='submit'
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </Button>
            </Magnetic>
          </form>
        </>
      ) : (
        <div
          ref={successRef}
          className={styles.successMessage}
          aria-live="polite"
        >
          <h2>thanks! <br />i'll get back to you soon</h2>
          <p>Just let me finish my morning coffee</p>
          <Button variant="secondary" onClick={() => setStatus('idle')} >
            Send another message
          </Button>
        </div>
      )}
    </section>
  );
};

export default Contact;